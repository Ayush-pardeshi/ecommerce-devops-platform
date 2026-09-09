import { Link } from "react-router-dom";

function Profile() {
  return (
    <main className="account-page">
      <div className="page-container">
        <header className="account-header">
          <span className="section-eyebrow">MY ACCOUNT</span>
          <h1>Profile</h1>
          <p>Manage your NOVAORA account information.</p>
        </header>

        <section className="profile-card">
          <div className="profile-avatar">
            N
          </div>

          <div className="profile-details">
            <span>ACCOUNT HOLDER</span>
            <h2>NOVAORA Customer</h2>
            <p>
              Your profile is ready for future account
              integration.
            </p>
          </div>
        </section>

        <div className="profile-links">
          <Link to="/orders">
            <span>
              <strong>Orders</strong>
              <small>View your recent purchases</small>
            </span>
            <b>→</b>
          </Link>

          <Link to="/wishlist">
            <span>
              <strong>Wishlist</strong>
              <small>View your saved products</small>
            </span>
            <b>→</b>
          </Link>

          <Link to="/products">
            <span>
              <strong>Continue shopping</strong>
              <small>Explore the NOVAORA collection</small>
            </span>
            <b>→</b>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Profile;
