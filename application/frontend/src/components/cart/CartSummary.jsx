import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/currency";

function CartSummary({ subtotal }) {
  const delivery = subtotal >= 999 ? 0 : 99;
  const discount = subtotal >= 5000 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + delivery - discount;

  return (
    <aside className="cart-summary-new">
      <div className="cart-summary-header">
        <span>ORDER SUMMARY</span>
        <h2>Summary</h2>
      </div>

      <div className="cart-summary-row">
        <span>Subtotal</span>
        <strong>{formatCurrency(subtotal)}</strong>
      </div>

      <div className="cart-summary-row">
        <span>Delivery</span>
        <strong>
          {delivery === 0 ? "FREE" : formatCurrency(delivery)}
        </strong>
      </div>

      {discount > 0 && (
        <div className="cart-summary-row cart-discount">
          <span>Discount</span>
          <strong>-{formatCurrency(discount)}</strong>
        </div>
      )}

      <div className="cart-total-row">
        <span>Total</span>
        <strong>{formatCurrency(total)}</strong>
      </div>

      <Link to="/checkout" className="checkout-button-new">
        Proceed to checkout
        <span>→</span>
      </Link>

      <p className="cart-summary-note">
        Free delivery on orders above ₹999.
      </p>
    </aside>
  );
}

export default CartSummary;
