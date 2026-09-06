import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ user_id: null, items: [] });
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("testuser@example.com");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [addingProductId, setAddingProductId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchProducts();

    if (token) {
      fetchUser(token);
      fetchCart(token);
      fetchOrders(token);
    }
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(`${API_URL}/products`);

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchUser(accessToken) {
    try {
      const response = await fetch(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Session expired");
      }

      const data = await response.json();
      setUser(data);
    } catch {
      localStorage.removeItem("access_token");
      setUser(null);
    }
  }

  async function fetchCart(accessToken) {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load cart");
      }

      const data = await response.json();

      setCart({
        user_id: data.user_id ?? null,
        items: Array.isArray(data.items) ? data.items : [],
      });
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchOrders(accessToken) {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load orders");
      }

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      localStorage.setItem("access_token", data.access_token);

      setMessage("Login successful");
      setPassword("");

      await fetchUser(data.access_token);
      await fetchCart(data.access_token);
      await fetchOrders(data.access_token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    setUser(null);
    setCart({ user_id: null, items: [] });
    setOrders([]);
    setMessage("Logged out successfully");
  }

  async function addToCart(productId) {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setError("Please login before adding products to cart.");
      return;
    }

    if (addingProductId !== null) {
      return;
    }

    setAddingProductId(productId);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to add product");
      }

      await fetchCart(accessToken);
      setMessage("Product added to cart.");
    } catch (err) {
      setError(err.message);
    } finally {
      setAddingProductId(null);
    }
  }

  async function placeOrder() {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setError("Please login first.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Order creation failed");
      }

      await fetchCart(accessToken);
      await fetchOrders(accessToken);

      setMessage(`Order #${data.id} placed successfully.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const cartItems = Array.isArray(cart.items) ? cart.items : [];

  const cartItemCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.subtotal || 0),
    0
  );

  function formatPrice(value) {
    return Number(value).toLocaleString("en-IN");
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">🛒</div>

          <div>
            <h1>ShopSphere</h1>
            <span>DevOps E-Commerce</span>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#cart">Cart ({cartItemCount})</a>
          <a href="#orders">Orders</a>
        </nav>

        <div className="nav-status">
          <span className="status-dot"></span>
          Live
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <span className="hero-badge">⚡ DevOps Powered Store</span>

            <h2>
              Everything you need.
              <br />
              <span>Built for modern developers.</span>
            </h2>

            <p>
              Explore our collection of developer-focused products,
              powered by a production-style cloud and DevOps architecture.
            </p>

            <div className="hero-actions">
              <a href="#products" className="primary-button">
                Shop Products →
              </a>

              <a href="#cart" className="secondary-button">
                View Cart
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-icon">🚀</div>
            <strong>DevOps Infrastructure</strong>
            <span>Docker • AWS • CI/CD • Kubernetes</span>
          </div>
        </section>

        <section className="stats">
          <div>
            <strong>99.9%</strong>
            <span>Target Availability</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Cloud Ready</span>
          </div>

          <div>
            <strong>Secure</strong>
            <span>DevSecOps Pipeline</span>
          </div>

          <div>
            <strong>Fast</strong>
            <span>Containerized Apps</span>
          </div>
        </section>

        {user && (
          <section className="welcome-bar">
            <div>
              <span className="welcome-label">Welcome back</span>
              <strong>{user.username}</strong>
            </div>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </section>
        )}

        {!user && (
          <section className="login-card">
            <div className="login-heading">
              <span className="section-icon">🔐</span>

              <div>
                <h2>Sign in</h2>
                <p>Login to manage your cart and orders.</p>
              </div>
            </div>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </section>
        )}

        {message && <div className="message success">{message}</div>}
        {error && <div className="message error">{error}</div>}

        <section id="products" className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR COLLECTION</span>
              <h2>Featured Products</h2>
              <p>Premium equipment for developers and DevOps engineers.</p>
            </div>

            <span className="product-count">
              {products.length} Products
            </span>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  {product.name.toLowerCase().includes("laptop")
                    ? "💻"
                    : product.name.toLowerCase().includes("keyboard")
                    ? "⌨️"
                    : "🖥️"}
                </div>

                <div className="product-content">
                  <span className="product-category">DEVELOPER GEAR</span>

                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <div className="product-bottom">
                    <div>
                      <span className="price-label">Price</span>
                      <strong>₹{formatPrice(product.price)}</strong>
                    </div>

                    <span className="stock">
                      {product.stock_quantity > 0
                        ? `${product.stock_quantity} in stock`
                        : "Out of stock"}
                    </span>
                  </div>

                  <button
                    className="add-button"
                    onClick={() => addToCart(product.id)}
                    disabled={
                      product.stock_quantity <= 0 ||
                      addingProductId === product.id
                    }
                  >
                    {addingProductId === product.id
                      ? "Adding..."
                      : product.stock_quantity <= 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="cart" className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SHOPPING CART</span>
              <h2>Your Cart</h2>
              <p>Review your selected products before checkout.</p>
            </div>
          </div>

          <div className="cart-card">
            {cartItems.length === 0 ? (
              <div className="empty-state">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add a product from the collection above.</p>
                <a href="#products" className="primary-button">
                  Browse Products
                </a>
              </div>
            ) : (
              <>
                <div className="cart-list">
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-product-icon">📦</div>

                      <div className="cart-product-info">
                        <h3>{item.product_name}</h3>
                        <span>
                          ₹{formatPrice(item.price)} × {item.quantity}
                        </span>
                      </div>

                      <strong>
                        ₹{formatPrice(item.subtotal)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Items</span>
                    <strong>{cartItemCount}</strong>
                  </div>

                  <div>
                    <span>Total</span>
                    <strong>₹{formatPrice(cartTotal)}</strong>
                  </div>

                  <button
                    className="checkout-button"
                    onClick={placeOrder}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Place Order →"}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        <section id="orders" className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ORDER HISTORY</span>
              <h2>Your Orders</h2>
              <p>Track your previous purchases.</p>
            </div>
          </div>

          <div className="orders-grid">
            {orders.length === 0 ? (
              <div className="empty-state">
                <div>📦</div>
                <h3>No orders yet</h3>
                <p>Your completed orders will appear here.</p>
              </div>
            ) : (
              orders.map((order) => (
                <article className="order-card" key={order.id}>
                  <div className="order-top">
                    <div>
                      <span>ORDER</span>
                      <h3>#{order.id}</h3>
                    </div>

                    <span className="order-status">
                      {order.status}
                    </span>
                  </div>

                  <div className="order-total">
                    <span>Total</span>
                    <strong>
                      ₹{formatPrice(order.total_amount)}
                    </strong>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="order-items">
                      {order.items.map((item) => (
                        <div key={item.id}>
                          <span>
                            Product {item.product_id} × {item.quantity}
                          </span>
                          <strong>
                            ₹{formatPrice(item.price)}
                          </strong>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      <footer>
        <strong>ShopSphere</strong>
        <span>DevOps E-Commerce Portfolio Project</span>
        <span>AWS • Docker • CI/CD • Kubernetes</span>
      </footer>
    </div>
  );
}

export default App;

