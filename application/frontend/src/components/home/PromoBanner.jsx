import { Link } from "react-router-dom";

function PromoBanner() {
  return (
    <section className="promo-section">
      <div className="page-container">
        <div className="promo-banner">
          <div className="promo-content">
            <span className="promo-eyebrow">NOVAORA PICKS</span>

            <h2>
              Everyday upgrades,
              <br />
              without the everyday price.
            </h2>

            <p>
              Discover selected products with limited-time offers across
              electronics, fashion, home and more.
            </p>

            <Link to="/products?sort=discount" className="promo-button">
              Explore deals
              <span>→</span>
            </Link>
          </div>

          <div className="promo-stat">
            <strong>UP TO</strong>
            <span>40%</span>
            <small>OFF SELECTED PICKS</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
