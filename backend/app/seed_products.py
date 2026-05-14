"""Insert or upsert demo products from catalog_data."""

import logging
from datetime import UTC, datetime

from sqlalchemy import func, inspect, select, text
from sqlalchemy.orm import Session

from app.catalog_data import CATALOG_ROWS
from app.config import settings
from app.database import engine
from app.models import Product

logger = logging.getLogger(__name__)


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
