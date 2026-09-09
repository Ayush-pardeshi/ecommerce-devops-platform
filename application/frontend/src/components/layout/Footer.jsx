import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="brand-mark">N</span>
            <span>NOVAORA</span>
          </Link>

          <p>
            A modern everyday marketplace built around quality, simplicity and
            a better shopping experience.
          </p>

          <span className="footer-copy">
            © {new Date().getFullYear()} NOVAORA. All rights reserved.
          </span>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>
          <Link to="/products">All Products</Link>
          <Link to="/products?sort=newest">New Arrivals</Link>
          <Link to="/products?sort=discount">Deals</Link>
          <Link to="/categories">Categories</Link>
        </div>

        <div className="footer-column">
          <h3>Customer Care</h3>
          <Link to="/orders">Track Orders</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/profile">My Account</Link>
        </div>

        <div className="footer-column">
          <h3>About</h3>
          <Link to="/">Our Story</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Shipping</Link>
          <Link to="/">Returns</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
