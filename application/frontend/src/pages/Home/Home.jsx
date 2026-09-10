import Hero from "../../components/home/Hero";
import TrustHighlights from "../../components/home/TrustHighlights";
import CategorySection from "../../components/home/CategorySection";
import PromoBanner from "../../components/home/PromoBanner";
import ReviewSection from "../../components/home/ReviewSection";
import Newsletter from "../../components/home/Newsletter";
import ProductGrid from "../../components/products/ProductGrid";
import categories from "../../data/categories";
import products from "../../data/products";

function ProductSection({ eyebrow, title, description, items }) {
  return (
    <section className="home-section">
      <div className="page-container">
        <div className="section-heading-new">
          <div>
            <span className="section-eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>

          <span className="section-description">{description}</span>
        </div>

        <ProductGrid products={items} />
      </div>
    </section>
  );
}

function Home() {
  const trendingProducts = products.slice(0, 8);

  const bestSellers = products
    .filter((product) =>
      ["Best Seller", "Bestseller", "Top Rated"].includes(product.badge)
    )
    .slice(0, 8);

  const newArrivals = products
    .filter((product) => product.badge === "New")
    .slice(0, 8);

  return (
    <main>
      <Hero />

      <TrustHighlights />

      <CategorySection categories={categories} />

      <ProductSection
        eyebrow="TRENDING NOW"
        title="What shoppers are loving."
        description="Popular picks across the NOVAORA store."
        items={trendingProducts}
      />

      <PromoBanner />

      <ProductSection
        eyebrow="BEST SELLERS"
        title="Customer favourites."
        description="Highly rated products worth discovering."
        items={bestSellers}
      />

      {newArrivals.length > 0 && (
        <ProductSection
          eyebrow="NEW ARRIVALS"
          title="Fresh additions to NOVAORA."
          description="Recently added products to explore."
          items={newArrivals}
        />
      )}

      <ReviewSection />

      <Newsletter />
    </main>
  );
}

export default Home;
