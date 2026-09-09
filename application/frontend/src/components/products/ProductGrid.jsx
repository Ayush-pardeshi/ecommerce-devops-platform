import ProductCard from "./ProductCard";

function ProductGrid({ products = [] }) {
  if (!products.length) {
    return (
      <div className="product-empty">
        <h3>No products found</h3>
        <p>Try changing your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="product-grid-new">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
