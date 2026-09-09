import { Link } from "react-router-dom";

import useCart from "../../hooks/useCart";
import useWishlist from "../../context/WishlistContext";

import { formatCurrency } from "../../utils/currency";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    discount,
    rating,
    reviewCount,
    images,
    badge,
    stock,
  } = product;

  const isOutOfStock = stock <= 0;
  const wishlisted = isInWishlist(id);

  function handleAddToCart() {
    if (isOutOfStock) {
      return;
    }

    addToCart(product);
  }

  function handleWishlist() {
    toggleWishlist(product);
  }

  return (
    <article className="product-card-new">
      <div className="product-image-wrapper">
        <Link
          to={`/products/${id}`}
          className="product-image-link"
        >
          <img
            src={images[0]}
            alt={name}
            className="product-image-new"
            loading="lazy"
          />
        </Link>

        {badge && (
          <span className="product-badge">
            {badge}
          </span>
        )}

        <button
          type="button"
          className={
            wishlisted
              ? "wishlist-button active"
              : "wishlist-button"
          }
          onClick={handleWishlist}
          aria-label={
            wishlisted
              ? `Remove ${name} from wishlist`
              : `Add ${name} to wishlist`
          }
          aria-pressed={wishlisted}
        >
          {wishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-card-content">
        <span className="product-brand">
          {brand}
        </span>

        <Link
          to={`/products/${id}`}
          className="product-name"
        >
          {name}
        </Link>

        <div className="product-rating">
          <span className="rating-value">
            {rating}
          </span>

          <span className="rating-star">
            ★
          </span>

          <span className="review-count">
            ({reviewCount})
          </span>
        </div>

        <div className="product-price-row">
          <strong>
            {formatCurrency(price)}
          </strong>

          <span className="product-original-price">
            {formatCurrency(originalPrice)}
          </span>

          <span className="product-discount">
            {discount}% off
          </span>
        </div>

        <button
          type="button"
          className="add-cart-button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock
            ? "Out of stock"
            : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
