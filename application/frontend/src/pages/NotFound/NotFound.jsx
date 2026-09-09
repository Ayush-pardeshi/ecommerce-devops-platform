import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span className="section-eyebrow">404</span>

        <h1>Page not found.</h1>

        <p>
          The page you're looking for doesn't exist or may
          have been moved.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="account-primary-button">
            Back to home
          </Link>

          <Link
            to="/products"
            className="account-secondary-button"
          >
            Browse products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
