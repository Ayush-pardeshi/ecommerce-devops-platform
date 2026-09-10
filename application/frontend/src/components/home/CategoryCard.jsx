import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="category-card"
    >
      <img
        src={category.image}
        alt={category.name}
        className="category-card-image"
        loading="lazy"
      />

      <div className="category-card-overlay">
        <span>Explore</span>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
    </Link>
  );
}

export default CategoryCard;
