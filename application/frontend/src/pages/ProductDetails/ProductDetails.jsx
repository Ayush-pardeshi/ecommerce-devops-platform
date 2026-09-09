import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import products from "../../data/products";
import ProductGrid from "../../components/products/ProductGrid";
import useCart from "../../hooks/useCart";
import { formatCurrency } from "../../utils/currency";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || ""
  );

  if (!product) {
    return (
      <main className="product-details-page">
        <div className="page-container product-not-found">
          <span className="section-eyebrow">NOVAORA</span>
          <h1>Product not found</h1>
          <p>
            The product you're looking for may no longer be
            available.
          </p>

          <Link to="/products" className="details-back-button">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const {
    name,
    brand,
    price,
    originalPrice,
    discount,
    rating,
    reviewCount,
    images,
    description,
    specifications,
    stock,
    badge,
  } = product;

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const isOutOfStock = stock <= 0;

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(current + 1, stock)
    );
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(current - 1, 1)
    );
  }

  function handleAddToCart() {
    if (isOutOfStock) {
      return;
    }

    addToCart(product, quantity);
  }

  function handleBuyNow() {
    if (isOutOfStock) {
      return;
    }

    addToCart(product, quantity);
    navigate("/cart");
  }

  return (
    <main className="product-details-page">
      <div className="page-container">
        <div className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Shop</Link>
          <span>/</span>
          <span>{name}</span>
        </div>

        <section className="product-details-main">
          <div className="product-gallery">
            <div className="product-thumbnails">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={
                    selectedImage === index
                      ? "thumbnail active"
                      : "thumbnail"
                  }
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${name} view ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="product-main-image">
              {badge && (
                <span className="product-details-badge">
                  {badge}
                </span>
              )}

              <img
                src={images[selectedImage]}
                alt={name}
              />
            </div>
          </div>

          <div className="product-details-info">
            <span className="product-details-brand">
              {brand}
            </span>

            <h1>{name}</h1>

            <div className="details-rating">
              <strong>{rating}</strong>
              <span>★</span>
              <span>
                {reviewCount.toLocaleString("en-IN")} reviews
              </span>
            </div>

            <div className="details-price">
              <strong>{formatCurrency(price)}</strong>

              <span>
                {formatCurrency(originalPrice)}
              </span>

              <b>{discount}% off</b>
            </div>

            <p className="details-description">
              {description}
            </p>

            <div className="details-highlights">
              <div>
                <strong>✓ Quality checked</strong>
                <span>Selected for everyday use.</span>
              </div>

              <div>
                <strong>✓ Easy returns</strong>
                <span>Simple return experience.</span>
              </div>

              <div>
                <strong>✓ Secure delivery</strong>
                <span>Reliable delivery across supported locations.</span>
              </div>
            </div>

            {product.variants?.length > 0 && (
              <div className="details-variants">
                <h3>Choose variant</h3>

                <div>
                  {product.variants.map((variant) => (
                    <button
                      type="button"
                      key={variant}
                      className={
                        selectedVariant === variant
                          ? "variant-button active"
                          : "variant-button"
                      }
                      onClick={() =>
                        setSelectedVariant(variant)
                      }
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="details-stock">
              {isOutOfStock
                ? "Out of stock"
                : `${stock} units available`}
            </div>

            {!isOutOfStock && (
              <div className="details-actions">
                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="details-add-button"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>

                <button
                  type="button"
                  className="details-buy-button"
                  onClick={handleBuyNow}
                >
                  Buy now
                </button>
              </div>
            )}

            <div className="details-delivery">
              <div>
                <strong>Delivery</strong>
                <span>
                  Enter your address at checkout to see
                  availability.
                </span>
              </div>

              <div>
                <strong>Returns</strong>
                <span>
                  Return eligibility will be shown during
                  checkout.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="details-information">
          <div>
            <span className="section-eyebrow">PRODUCT INFO</span>
            <h2>Specifications</h2>

            <div className="specifications-table">
              {Object.entries(specifications || {}).map(
                ([key, value]) => (
                  <div key={key}>
                    <span>{key}</span>
                    <strong>{value}</strong>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <div className="section-heading">
              <div>
                <span className="section-eyebrow">
                  YOU MAY ALSO LIKE
                </span>
                <h2>Related products.</h2>
              </div>
            </div>

            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </main>
  );
}

export default ProductDetails;
