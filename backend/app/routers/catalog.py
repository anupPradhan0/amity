from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.deps import get_current_admin_user, get_db
from app.models import Product, Review, User
from app.schemas import ProductCreate, ProductPublic, ProductUpdate, ReviewCreate, ReviewPublic

public_router = APIRouter(prefix="/products", tags=["products"])
admin_router = APIRouter(prefix="/admin/products", tags=["admin-products"])


def recompute_product_rating(db: Session, product_id: int) -> None:
    """Keep a product's rating/review-count in sync with its actual reviews."""
    avg, total = db.execute(
        select(func.avg(Review.rating), func.count(Review.id)).where(Review.product_id == product_id)
    ).one()
    product = db.get(Product, product_id)
    if product is None:
        return
    product.rating = round(float(avg), 1) if avg is not None else 0.0
    product.reviews = int(total or 0)
    db.commit()


@public_router.get("", response_model=list[ProductPublic])
def list_products(db: Session = Depends(get_db)) -> list[ProductPublic]:
    rows = db.execute(select(Product).where(Product.active.is_(True)).order_by(Product.id)).scalars().all()
    return [ProductPublic.model_validate(r) for r in rows]


@public_router.get("/{slug}", response_model=ProductPublic)
def get_product(slug: str, db: Session = Depends(get_db)) -> ProductPublic:
    p = db.execute(select(Product).where(Product.slug == slug, Product.active.is_(True))).scalar_one_or_none()
    if p is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
    return ProductPublic.model_validate(p)


@public_router.get("/{slug}/reviews", response_model=list[ReviewPublic])
def list_reviews(slug: str, db: Session = Depends(get_db)) -> list[ReviewPublic]:
    p = db.execute(select(Product).where(Product.slug == slug, Product.active.is_(True))).scalar_one_or_none()
    if p is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
    rows = (
        db.execute(select(Review).where(Review.product_id == p.id).order_by(Review.created_at.desc()))
        .scalars()
        .all()
    )
    return [ReviewPublic.model_validate(r) for r in rows]


@public_router.post("/{slug}/reviews", response_model=ReviewPublic, status_code=status.HTTP_201_CREATED)
def create_review(slug: str, body: ReviewCreate, db: Session = Depends(get_db)) -> ReviewPublic:
    p = db.execute(select(Product).where(Product.slug == slug, Product.active.is_(True))).scalar_one_or_none()
    if p is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
    review = Review(
        product_id=p.id,
        author_name=body.author_name,
        rating=body.rating,
        title=body.title,
        body=body.body,
    )
    db.add(review)
    db.commit()
    db.refresh(review)
    recompute_product_rating(db, p.id)
    return ReviewPublic.model_validate(review)


@admin_router.get("", response_model=list[ProductPublic])
def admin_list_products(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin_user),
) -> list[ProductPublic]:
    rows = db.execute(select(Product).order_by(Product.id)).scalars().all()
    return [ProductPublic.model_validate(r) for r in rows]


@admin_router.get("/{slug}", response_model=ProductPublic)
def admin_get_product(
    slug: str,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin_user),
) -> ProductPublic:
    p = db.execute(select(Product).where(Product.slug == slug)).scalar_one_or_none()
    if p is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
    return ProductPublic.model_validate(p)


@admin_router.post("", response_model=ProductPublic, status_code=status.HTTP_201_CREATED)
def admin_create_product(
    body: ProductCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin_user),
) -> ProductPublic:
    exists = db.execute(select(Product).where(Product.slug == body.slug)).scalar_one_or_none()
    if exists is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A product with this slug already exists.")
    data = body.model_dump()
    p = Product(**data)
    db.add(p)
    db.commit()
    db.refresh(p)
    return ProductPublic.model_validate(p)


@admin_router.patch("/{slug}", response_model=ProductPublic)
def admin_update_product(
    slug: str,
    body: ProductUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin_user),
) -> ProductPublic:
    p = db.execute(select(Product).where(Product.slug == slug)).scalar_one_or_none()
    if p is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
    patch = body.model_dump(exclude_unset=True)
    for key, val in patch.items():
        setattr(p, key, val)
    p.updated_at = datetime.now(UTC)
    db.commit()
    db.refresh(p)
    return ProductPublic.model_validate(p)
