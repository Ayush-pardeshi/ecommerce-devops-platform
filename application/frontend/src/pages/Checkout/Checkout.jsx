import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useCart from "../../hooks/useCart";
import { formatCurrency } from "../../utils/currency";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("cod");
  const [error, setError] = useState("");

  const delivery = subtotal >= 999 ? 0 : 79;
  const total = subtotal + delivery;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];

    const missingField = requiredFields.some(
      (field) => !form[field].trim()
    );

    if (missingField) {
      setError("Please complete all delivery details.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (form.pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    const order = {
      id: `NOVA-${Date.now()}`,
      customer: form,
      payment,
      items: cartItems,
      subtotal,
      delivery,
      total,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
    };

    localStorage.setItem(
      "novaora_last_order",
      JSON.stringify(order)
    );

    clearCart();

    navigate("/order-success");
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="page-container checkout-empty">
          <span className="section-eyebrow">
            CHECKOUT
          </span>

          <h1>Your cart is empty.</h1>

          <p>
            Add some products before continuing to checkout.
          </p>

          <Link
            to="/products"
            className="checkout-primary-button"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="page-container">
        <header className="checkout-header">
          <span className="section-eyebrow">
            SECURE CHECKOUT
          </span>

          <h1>Complete your order.</h1>

          <p>
            Review your details and choose your preferred
            payment method.
          </p>
        </header>

        {error && (
          <div className="checkout-error">
            {error}
          </div>
        )}

        <div className="checkout-layout">
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <section className="checkout-section">
              <div className="checkout-section-heading">
                <span>01</span>

                <div>
                  <h2>Delivery details</h2>
                  <p>
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="checkout-fields">
                <label>
                  Full name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                  />
                </label>

                <label className="checkout-full">
                  Address
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House / flat / street"
                    rows="3"
                  />
                </label>

                <label>
                  City
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </label>

                <label>
                  State
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </label>

                <label>
                  Pincode
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                  />
                </label>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-heading">
                <span>02</span>

                <div>
                  <h2>Payment method</h2>
                  <p>
                    Choose how you want to pay.
                  </p>
                </div>
              </div>

              <div className="payment-options">
                <label
                  className={
                    payment === "cod"
                      ? "payment-option active"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={(event) =>
                      setPayment(event.target.value)
                    }
                  />

                  <div>
                    <strong>
                      Cash on delivery
                    </strong>

                    <span>
                      Pay when your order arrives.
                    </span>
                  </div>
                </label>

                <label
                  className={
                    payment === "card"
                      ? "payment-option active"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === "card"}
                    onChange={(event) =>
                      setPayment(event.target.value)
                    }
                  />

                  <div>
                    <strong>
                      Credit / Debit Card
                    </strong>

                    <span>
                      Secure card payment UI.
                    </span>
                  </div>
                </label>

                <label
                  className={
                    payment === "upi"
                      ? "payment-option active"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={payment === "upi"}
                    onChange={(event) =>
                      setPayment(event.target.value)
                    }
                  />

                  <div>
                    <strong>
                      UPI
                    </strong>

                    <span>
                      Pay using your preferred UPI app.
                    </span>
                  </div>
                </label>
              </div>
            </section>

            <button
              type="submit"
              className="place-order-button"
            >
              Place order · {formatCurrency(total)}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Order summary</h2>

            <div className="checkout-items">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="checkout-item"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                  />

                  <div>
                    <strong>{item.name}</strong>

                    <span>
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <strong>
                    {formatCurrency(
                      item.price * item.quantity
                    )}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-total-row">
              <span>Subtotal</span>
              <strong>
                {formatCurrency(subtotal)}
              </strong>
            </div>

            <div className="checkout-total-row">
              <span>Delivery</span>

              <strong>
                {delivery === 0
                  ? "FREE"
                  : formatCurrency(delivery)}
              </strong>
            </div>

            <div className="checkout-grand-total">
              <span>Total</span>

              <strong>
                {formatCurrency(total)}
              </strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
