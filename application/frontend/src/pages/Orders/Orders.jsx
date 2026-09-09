import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/currency";

function Orders() {
  const savedOrder = localStorage.getItem("novaora_last_order");

  const orders = savedOrder
    ? [JSON.parse(savedOrder)]
    : [];

  return (
    <main className="account-page">
      <div className="page-container">
        <header className="account-header">
          <span className="section-eyebrow">MY ACCOUNT</span>
          <h1>My Orders</h1>
          <p>Track your recent NOVAORA purchases.</p>
        </header>

        {orders.length === 0 ? (
          <section className="account-empty">
            <h2>No orders yet.</h2>
            <p>Your completed orders will appear here.</p>

            <Link to="/products" className="account-primary-button">
              Start shopping
            </Link>
          </section>
        ) : (
          <section className="orders-list">
            {orders.map((order) => (
              <article className="account-order-card" key={order.id}>
                <div className="account-order-top">
                  <div>
                    <span>ORDER</span>
                    <h2>{order.id}</h2>
                  </div>

                  <strong className="order-confirmed">
                    {order.status}
                  </strong>
                </div>

                <div className="account-order-meta">
                  <div>
                    <span>Total</span>
                    <strong>{formatCurrency(order.total)}</strong>
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

                  <div>
                    <span>Items</span>
                    <strong>{order.items.length}</strong>
                  </div>
                </div>

                <div className="account-order-items">
                  {order.items.map((item) => (
                    <div key={item.id}>
                      <img src={item.images[0]} alt={item.name} />

                      <div>
                        <strong>{item.name}</strong>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Orders;
