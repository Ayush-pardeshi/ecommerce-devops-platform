import { Link } from "react-router-dom";

import products from "../../data/products";

function Categories() {
  const categoryData = [
    {
      name: "Electronics",
      description:
        "Smart devices, accessories and everyday technology.",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Fashion",
      description:
        "Everyday clothing and modern essentials.",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Home",
      description:
        "Useful pieces designed for comfortable spaces.",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Beauty",
      description:
        "Personal care and everyday beauty essentials.",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Accessories",
      description:
        "Small essentials that complete your everyday setup.",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Sports",
      description:
        "Gear and essentials for an active lifestyle.",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const categories = categoryData.map((category) => {
    const productCount = products.filter(
      (product) =>
        product.category.toLowerCase() ===
        category.name.toLowerCase()
    ).length;

    return {
      ...category,
      productCount,
    };
  });

  return (
    <main className="categories-page">
      <div className="page-container">
        <header className="categories-header">
          <span className="section-eyebrow">
            SHOP BY CATEGORY
          </span>

          <h1>Explore what fits your everyday.</h1>

          <p>
            Browse curated collections across technology,
            fashion, home and more.
          </p>
        </header>

        <section className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="category-tile"
            >
              <div className="category-image">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />
              </div>

              <div className="category-content">
                <div>
                  <span>
                    {category.productCount}{" "}
                    {category.productCount === 1
                      ? "product"
                      : "products"}
                  </span>

                  <h2>{category.name}</h2>

                  <p>{category.description}</p>
                </div>

                <span className="category-arrow">
                  →
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Categories;
