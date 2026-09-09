import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../../components/products/ProductGrid";
import products from "../../data/products";
import { formatCurrency } from "../../utils/currency";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "all";
  const initialSort = searchParams.get("sort") || "featured";

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [minDiscount, setMinDiscount] = useState("");
  const [sort, setSort] = useState(initialSort);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const brands = [
    "all",
    ...new Set(products.map((product) => product.brand)),
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((product) =>
        [
          product.name,
          product.brand,
          product.category,
          product.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (brand !== "all") {
      result = result.filter(
        (product) => product.brand === brand
      );
    }

    if (maxPrice) {
      result = result.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    if (minRating) {
      result = result.filter(
        (product) => product.rating >= Number(minRating)
      );
    }

    if (minDiscount) {
      result = result.filter(
        (product) => product.discount >= Number(minDiscount)
      );
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "discount":
        result.sort((a, b) => b.discount - a.discount);
        break;

      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;

      default:
        break;
    }

    return result;
  }, [
    search,
    category,
    brand,
    maxPrice,
    minRating,
    minDiscount,
    sort,
  ]);

  function updateQueryParams(nextCategory, nextSort) {
    const params = {};

    if (nextCategory && nextCategory !== "all") {
      params.category = nextCategory;
    }

    if (nextSort && nextSort !== "featured") {
      params.sort = nextSort;
    }

    if (search.trim()) {
      params.search = search.trim();
    }

    setSearchParams(params);
  }

  function handleCategoryChange(value) {
    setCategory(value);
    updateQueryParams(value, sort);
  }

  function handleSortChange(value) {
    setSort(value);
    updateQueryParams(category, value);
  }

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setBrand("all");
    setMaxPrice("");
    setMinRating("");
    setMinDiscount("");
    setSort("featured");
    setSearchParams({});
  }

  return (
    <main className="products-page">
      <div className="page-container">
        <header className="products-header">
          <div>
            <span className="section-eyebrow">SHOP NOVAORA</span>

            <h1>Find something you'll love.</h1>

            <p>
              Explore thoughtfully selected products across
              everyday categories.
            </p>
          </div>

          <strong className="products-count">
            {filteredProducts.length} products
          </strong>
        </header>

        <div className="products-toolbar">
          <div className="products-search">
            <input
              type="search"
              placeholder="Search products, brands or categories..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  updateQueryParams(category, sort);
                }
              }}
            />
          </div>

          <select
            value={sort}
            onChange={(event) =>
              handleSortChange(event.target.value)
            }
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>

        <div className="products-content">
          <aside className="products-filters">
            <div className="filter-heading">
              <h2>Filters</h2>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear all
              </button>
            </div>

            <div className="filter-group">
              <h3>Category</h3>

              {categories.map((item) => (
                <label key={item} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={category === item}
                    onChange={() => handleCategoryChange(item)}
                  />

                  <span>
                    {item === "all" ? "All categories" : item}
                  </span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h3>Brand</h3>

              <select
                value={brand}
                onChange={(event) =>
                  setBrand(event.target.value)
                }
              >
                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All brands" : item}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <h3>Maximum price</h3>

              <select
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(event.target.value)
                }
              >
                <option value="">Any price</option>
                <option value="1000">
                  Under {formatCurrency(1000)}
                </option>
                <option value="5000">
                  Under {formatCurrency(5000)}
                </option>
                <option value="10000">
                  Under {formatCurrency(10000)}
                </option>
                <option value="25000">
                  Under {formatCurrency(25000)}
                </option>
                <option value="50000">
                  Under {formatCurrency(50000)}
                </option>
              </select>
            </div>

            <div className="filter-group">
              <h3>Rating</h3>

              {[4.5, 4, 3.5].map((rating) => (
                <label
                  key={rating}
                  className="filter-option"
                >
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={minRating === String(rating)}
                    onChange={(event) =>
                      setMinRating(event.target.value)
                    }
                  />

                  <span>{rating}★ & above</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h3>Discount</h3>

              {[10, 20, 30].map((discount) => (
                <label
                  key={discount}
                  className="filter-option"
                >
                  <input
                    type="radio"
                    name="discount"
                    value={discount}
                    checked={
                      minDiscount === String(discount)
                    }
                    onChange={(event) =>
                      setMinDiscount(event.target.value)
                    }
                  />

                  <span>{discount}% & above</span>
                </label>
              ))}
            </div>
          </aside>

          <section className="products-results">
            <div className="products-results-top">
              <span>
                Showing {filteredProducts.length} of{" "}
                {products.length} products
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="products-empty">
                <h2>No products found</h2>

                <p>
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Products;
