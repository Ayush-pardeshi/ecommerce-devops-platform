import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="home-hero">
      <div className="page-container home-hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow">THE NOVAORA EDIT</span>

          <h1>
            Better things
            <br />
            for everyday life.
          </h1>

          <p>
            Discover thoughtfully selected electronics, fashion, home
            essentials and more — all in one modern marketplace.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="hero-primary-button">
              Shop now
              <span>→</span>
            </Link>

            <Link to="/categories" className="hero-secondary-button">
              Explore categories
            </Link>
          </div>

          <div className="hero-note">
            <span className="hero-note-dot" />
            New collections added every week
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-card hero-card-main">
            <span className="hero-product-label">CURATED FOR YOU</span>

            <div className="hero-product-shape">
              <div className="hero-product-device" />
            </div>

            <div className="hero-product-info">
              <span>Everyday essentials</span>
              <strong>Designed to fit your life.</strong>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-top">
            <strong>4.8/5</strong>
            <span>Customer rating</span>
          </div>

          <div className="hero-floating-card hero-floating-bottom">
            <strong>30+</strong>
            <span>Products to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
