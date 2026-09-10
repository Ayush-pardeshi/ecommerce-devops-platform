import { Link, NavLink } from "react-router-dom";

import useCart from "../../hooks/useCart";
import useTheme from "../../context/ThemeContext";
import useWishlist from "../../context/WishlistContext";

function Navbar() {
  const { itemCount } = useCart();

  const {
    wishlistCount,
  } = useWishlist();

  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <header className="novaora-navbar">
      <div className="navbar-inner">
        <Link
          to="/"
          className="navbar-brand"
        >
          NOVAORA
        </Link>

        <nav
          className="navbar-links"
          aria-label="Main navigation"
        >
          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/products">
            Shop
          </NavLink>

          <NavLink to="/categories">
            Categories
          </NavLink>
        </nav>

        <div className="navbar-actions">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="navbar-action wishlist-action"
            aria-label={`Wishlist${
              wishlistCount > 0
                ? `, ${wishlistCount} items`
                : ""
            }`}
          >
            <span aria-hidden="true">
              {wishlistCount > 0 ? "♥" : "♡"}
            </span>

            {wishlistCount > 0 && (
              <span className="wishlist-count">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="navbar-action cart-action"
            aria-label={`Shopping cart${
              itemCount > 0
                ? `, ${itemCount} items`
                : ""
            }`}
          >
            <span aria-hidden="true">
              🛒
            </span>

            {itemCount > 0 && (
              <span className="cart-count">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            to="/login"
            className="navbar-account"
          >
            Account
          </Link>

          {/* Theme */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light"
                ? "dark"
                : "light"
            } mode`}
          >
            {theme === "light"
              ? "☾"
              : "☀"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
