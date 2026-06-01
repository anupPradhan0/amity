"""Insert or upsert demo products from catalog_data."""

import logging
from datetime import UTC, datetime, timedelta

from sqlalchemy import func, inspect, select, text
from sqlalchemy.orm import Session

from app.catalog_data import CATALOG_ROWS
from app.config import settings
from app.database import engine
from app.models import Product, Review

logger = logging.getLogger(__name__)

# Demo reviewer pool + templates so seeded ratings/counts come from real review rows
# (instead of hardcoded numbers). New customer reviews append to these.
_REVIEW_AUTHORS = [
    "Aarav Sharma", "Priya Kapoor", "Rohan Mehta", "Ananya Singh", "Karan Verma",
    "Ishita Nair", "Vivaan Gupta", "Sara Khan", "Aditya Rao", "Meera Joshi",
    "Dev Patel", "Riya Bansal",
]
_REVIEW_TEMPLATES = [
    (5, "Absolutely love it", "Quality is genuinely premium and the fit is perfect. Wore it to campus and got so many compliments."),
    (5, "Worth every rupee", "Fabric feels great and the print hasn't faded after multiple washes. Highly recommend."),
    (4, "Really good", "Looks exactly like the photos. Took one star off only because delivery took a little longer."),
    (5, "Official merch done right", "Feels authentic and well made. Proud to represent Amity with this."),
    (4, "Great for daily use", "Comfortable and sturdy — good value for the price."),
    (5, "Fast delivery, great product", "Reached Noida in two days, packaging was neat, and the product is top notch."),
    (3, "Decent", "It's fine for the price, but I expected slightly thicker material. Still happy overall."),
    (5, "My new favourite", "Can't stop using it. Clean design and solid build quality."),
    (4, "Nice quality", "Good stitching and finish. Sizing runs a little large, so size down if unsure."),
    (5, "Highly recommend", "Exceeded my expectations — will definitely order more from Campus Merch."),
]


def drop_products_table_if_incompatible() -> None:
    """Dev safety: an older `products` table shape breaks ORM queries; drop and let create_all rebuild."""
    try:
        insp = inspect(engine)
    except Exception:
        return
    if "products" not in insp.get_table_names():
        return
    cols = {c["name"] for c in insp.get_columns("products")}
    if "category" in cols and "image_path" in cols:
        return
    with engine.begin() as conn:
        conn.execute(text("DROP TABLE IF EXISTS products CASCADE"))
    logger.warning("Dropped legacy `products` table (schema mismatch); it will be recreated on startup.")


def _apply_row(p: Product, row: dict) -> None:
    p.name = row["name"]
    p.brand = row["brand"]
    p.category = row["category"]
    p.sub_category = row["sub_category"]
    p.price = row["price"]
    p.mrp = row["mrp"]
    p.rating = row["rating"]
    p.reviews = row["reviews"]
    p.image_path = row["image_path"]
    p.images = row.get("images")
    p.colors = row["colors"]
    p.sizes = row.get("sizes")
    p.tags = row["tags"]
    p.best_seller = row["best_seller"]
    p.new_arrival = row["new_arrival"]
    p.active = row.get("active", True)
    p.updated_at = datetime.now(UTC)


def seed_products(session: Session) -> None:
    if settings.product_seed_force:
        for row in CATALOG_ROWS:
            slug = row["slug"]
            existing = session.execute(select(Product).where(Product.slug == slug)).scalar_one_or_none()
            if existing is None:
                session.add(
                    Product(
                        slug=slug,
                        name=row["name"],
                        brand=row["brand"],
                        category=row["category"],
                        sub_category=row["sub_category"],
                        price=row["price"],
                        mrp=row["mrp"],
                        rating=row["rating"],
                        reviews=row["reviews"],
                        image_path=row["image_path"],
                        images=row.get("images"),
                        colors=row["colors"],
                        sizes=row.get("sizes"),
                        tags=row["tags"],
                        best_seller=row["best_seller"],
                        new_arrival=row["new_arrival"],
                        active=row.get("active", True),
                    )
                )
            else:
                _apply_row(existing, row)
        session.commit()
        logger.info("Catalog seed force: upserted %s demo products.", len(CATALOG_ROWS))
        return

    count = session.scalar(select(func.count()).select_from(Product)) or 0
    if count > 0 or not settings.product_seed_on_empty:
        return

    for row in CATALOG_ROWS:
        session.add(
            Product(
                slug=row["slug"],
                name=row["name"],
                brand=row["brand"],
                category=row["category"],
                sub_category=row["sub_category"],
                price=row["price"],
                mrp=row["mrp"],
                rating=row["rating"],
                reviews=row["reviews"],
                image_path=row["image_path"],
                images=row.get("images"),
                colors=row["colors"],
                sizes=row.get("sizes"),
                tags=row["tags"],
                best_seller=row["best_seller"],
                new_arrival=row["new_arrival"],
                active=row.get("active", True),
            )
        )
    session.commit()
    logger.info("Catalog seeded: inserted %s demo products.", len(CATALOG_ROWS))


def seed_reviews(session: Session) -> None:
    """Seed real review rows so product rating/count are derived, not hardcoded.

    Demo reviews are inserted once (when the reviews table is empty). Every product's
    rating and review count are then **always** recomputed from its actual reviews —
    so even after a force product-reseed (which resets the legacy hardcoded numbers),
    the stored values stay in sync with the real review rows.
    """
    products = session.execute(select(Product).order_by(Product.id)).scalars().all()
    if not products:
        return

    existing = session.scalar(select(func.count()).select_from(Review)) or 0
    if existing == 0:
        now = datetime.now(UTC)
        total = 0
        for pi, product in enumerate(products):
            count = 3 + (pi % 4)  # 3–6 reviews per product
            for j in range(count):
                rating, title, body = _REVIEW_TEMPLATES[(pi + j) % len(_REVIEW_TEMPLATES)]
                author = _REVIEW_AUTHORS[(pi * 3 + j) % len(_REVIEW_AUTHORS)]
                session.add(
                    Review(
                        product_id=product.id,
                        author_name=author,
                        rating=rating,
                        title=title,
                        body=body,
                        created_at=now - timedelta(days=j * 3 + pi),
                    )
                )
                total += 1
        session.commit()
        logger.info("Seeded %s reviews across %s products.", total, len(products))

    # Always reconcile stored rating/count with the actual review rows.
    for product in products:
        avg, total_count = session.execute(
            select(func.avg(Review.rating), func.count(Review.id)).where(Review.product_id == product.id)
        ).one()
        product.rating = round(float(avg), 1) if avg is not None else 0.0
        product.reviews = int(total_count or 0)
    session.commit()
