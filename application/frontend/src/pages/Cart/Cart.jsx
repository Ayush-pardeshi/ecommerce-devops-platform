import { Link } from "react-router-dom";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import useCart from "../../hooks/useCart";

function Cart() {
  const { cartItems, subtotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="page-container">
          <div className="empty-cart">
            <span className="empty-cart-icon">🛍</span>

            <span className="section-eyebrow">YOUR CART</span>

            <h1>Your cart is empty.</h1>

            <p>
              Looks like you haven't added anything yet.
              Discover something you'll love.
            </p>

            <Link to="/products" className="primary-action-button">
              Start shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="page-container">
        <div className="cart-page-header">
          <div>
            <span className="section-eyebrow">YOUR CART</span>
            <h1>Shopping Cart</h1>
          </div>

          <span>
            {cartItems.length}{" "}
            {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="cart-layout">
          <section className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <Link to="/products" className="continue-shopping">
              ← Continue shopping
            </Link>
          </section>

          <CartSummary subtotal={subtotal} />
        </div>
      </div>
    </main>
  );
}

export default Cart;
