import { Link } from "react-router-dom";

import useCart from "../../hooks/useCart";
import useWishlist from "../../context/WishlistContext";
import { formatCurrency } from "../../utils/currency";

function Wishlist() {
  const {
    wishlistItems,
    wishlistCount,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  function handleMoveToCart(product) {
    if (product.stock <= 0) {
      return;
    }

    addToCart(product);
    removeFromWishlist(product.id);
  }

  return (
    <main className="wishlist-page">
      <div className="page-container">
        <div className="wishlist-header">
          <div>
            <span className="section-eyebrow">
              SAVED FOR LATER
            </span>

            <h1>My Wishlist</h1>

            <p>
              {wishlistCount === 0
                ? "Your wishlist is empty."
                : `${wishlistCount} ${
                    wishlistCount === 1
                      ? "product"
                      : "products"
                  } saved`}
            </p>
          </div>

          <Link
            to="/products"
            className="wishlist-shop-button"
          >
            Continue shopping
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <section className="wishlist-empty">
            <div className="wishlist-empty-icon">
              ♡
            </div>

            <h2>Your wishlist is waiting.</h2>

            <p>
              Save products you love and come back to
              them anytime.
            </p>

            <Link
              to="/products"
              className="wishlist-primary-button"
            >
              Explore products
            </Link>
          </section>
        ) : (
          <section className="wishlist-grid">
            {wishlistItems.map((product) => (
              <article
                className="wishlist-item"
                key={product.id}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="wishlist-image"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                  />
                </Link>

                <div className="wishlist-item-content">
                  <span className="product-brand">
                    {product.brand}
                  </span>

                  <Link
                    to={`/products/${product.id}`}
                    className="wishlist-product-name"
                  >
                    {product.name}
                  </Link>

                  <div className="product-rating">
                    <span className="rating-value">
                      {product.rating}
                    </span>

                    <span className="rating-star">
                      ★
                    </span>

                    <span className="review-count">
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className="wishlist-price">
                    <strong>
                      {formatCurrency(product.price)}
                    </strong>

                    <span>
                      {formatCurrency(
                        product.originalPrice
                      )}
                    </span>
                  </div>

                  <div className="wishlist-actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleMoveToCart(product)
                      }
                      disabled={product.stock <= 0}
                    >
                      {product.stock <= 0
                        ? "Out of stock"
                        : "Move to cart"}
                    </button>

                    <button
                      type="button"
                      className="wishlist-remove"
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Wishlist;
