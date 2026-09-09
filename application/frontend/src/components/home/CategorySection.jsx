import CategoryCard from "./CategoryCard";

function CategorySection({ categories }) {
  return (
    <section className="home-section categories-section">
      <div className="page-container">
        <div className="section-heading-new">
          <div>
            <span className="section-eyebrow">SHOP BY CATEGORY</span>
            <h2>Find your everyday essentials.</h2>
          </div>

          <span className="section-description">
            Explore our most popular collections.
          </span>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
