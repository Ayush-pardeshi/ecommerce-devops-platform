import { Link } from "react-router-dom";

function OrderSuccess() {
  const savedOrder = localStorage.getItem(
    "novaora_last_order"
  );

  const order = savedOrder
    ? JSON.parse(savedOrder)
    : null;

  return (
    <main className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon">
          ✓
        </div>

        <span className="section-eyebrow">
          ORDER CONFIRMED
        </span>

        <h1>Thank you for your order.</h1>

        <p>
          Your order has been placed successfully. We'll
          keep you updated about its progress.
        </p>

        {order && (
          <div className="success-order-info">
            <div>
              <span>Order number</span>
              <strong>{order.id}</strong>
            </div>

            <div>
              <span>Total paid</span>
              <strong>
                ₹{order.total.toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>Payment</span>
              <strong>
                {order.payment === "cod"
                  ? "Cash on delivery"
                  : order.payment === "upi"
                  ? "UPI"
                  : "Card"}
              </strong>
            </div>
          </div>
        )}

        <div className="success-actions">
          <Link
            to="/products"
            className="checkout-primary-button"
          >
            Continue shopping
          </Link>

          <Link
            to="/orders"
            className="checkout-secondary-button"
          >
            View orders
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;
