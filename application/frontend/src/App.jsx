import { useEffect, useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
	  const [products, setProducts] = useState([])
	  const [cart, setCart] = useState([])
	  const [cartCount, setCartCount] = useState(0)

	  const [loading, setLoading] = useState(true)
	  const [cartLoading, setCartLoading] = useState(false)

	  const [error, setError] = useState('')
	  const [cartError, setCartError] = useState('')

	  const [showLogin, setShowLogin] = useState(false)
	  const [showCart, setShowCart] = useState(false)

	  const [email, setEmail] = useState('')
	  const [password, setPassword] = useState('')
	  const [loginError, setLoginError] = useState('')

	  const [loggedIn, setLoggedIn] = useState(
		      Boolean(localStorage.getItem('access_token'))
		    )

	  const [user, setUser] = useState(null)

	  useEffect(() => {
		      fetch(`${API_URL}/products`)
		        .then((response) => {
				        if (!response.ok) {
						          throw new Error('Failed to fetch products')
						        }

				        return response.json()
				      })
		        .then((data) => {
				        setProducts(data)
				        setLoading(false)
				      })
		        .catch((err) => {
				        setError(err.message)
				        setLoading(false)
				      })
		    }, [])

	  useEffect(() => {
		      const token = localStorage.getItem('access_token')

		      if (!token) {
			            return
			          }

		      fetch(`${API_URL}/me`, {
			            headers: {
					            Authorization: `Bearer ${token}`,
					          },
			          })
		        .then((response) => {
				        if (!response.ok) {
						          throw new Error('Session expired')
						        }

				        return response.json()
				      })
		        .then((data) => {
				        setUser(data)
				        setLoggedIn(true)
				      })
		        .catch(() => {
				        localStorage.removeItem('access_token')
				        setLoggedIn(false)
				        setUser(null)
				      })
		    }, [])

	  const handleLogin = async (event) => {
		      event.preventDefault()
		      setLoginError('')

		      try {
			            const response = await fetch(`${API_URL}/login`, {
					            method: 'POST',
					            headers: {
							              'Content-Type': 'application/json',
							            },
					            body: JSON.stringify({
							              email,
							              password,
							            }),
					          })

			            const data = await response.json()

			            if (!response.ok) {
					            throw new Error(data.detail || 'Login failed')
					          }

			            localStorage.setItem('access_token', data.access_token)

			            setLoggedIn(true)
			            setShowLogin(false)
			            setPassword('')

			            const userResponse = await fetch(`${API_URL}/me`, {
					            headers: {
							              Authorization: `Bearer ${data.access_token}`,
							            },
					          })

			            if (userResponse.ok) {
					            const userData = await userResponse.json()
					            setUser(userData)
					          }
			          } catch (err) {
					        setLoginError(err.message)
					      }
		    }

	  const handleLogout = () => {
		      localStorage.removeItem('access_token')
		      setLoggedIn(false)
		      setUser(null)
		      setCart([])
		      setCartCount(0)
		      setShowCart(false)
		    }

	  const loadCart = async () => {
		      const token = localStorage.getItem('access_token')

		      setCartError('')
		      setCartLoading(true)

		      if (!token) {
			            setCart([])
			            setCartCount(0)
			            setCartLoading(false)
			            setCartError('Please login to view your cart')
			            setShowLogin(true)
			            return
			          }

		      try {
			            const response = await fetch(`${API_URL}/cart`, {
					            headers: {
							              Authorization: `Bearer ${token}`,
							            },
					          })

			            const data = await response.json()

			            if (!response.ok) {
					            throw new Error(data.detail || 'Failed to load cart')
					          }

			            setCart(data.items)

			            const totalItems = data.items.reduce(
					            (total, item) => total + item.quantity,
					            0
					          )

			            setCartCount(totalItems)
			          } catch (err) {
					        setCartError(err.message)
					      } finally {
						            setCartLoading(false)
						          }
		    }

	  const handleCartClick = async () => {
		      if (!loggedIn) {
			            setCartError('Please login to view your cart')
			            setShowLogin(true)
			            return
			          }

		      setShowCart((show) => !show)

		      if (!showCart) {
			            await loadCart()
			          }
		    }

	  const addToCart = async (productId) => {
		      const token = localStorage.getItem('access_token')

		      setCartError('')

		      if (!token) {
			            setCartError('Please login before adding products to cart')
			            setShowLogin(true)
			            return
			          }

		      try {
			            const response = await fetch(`${API_URL}/cart`, {
					            method: 'POST',
					            headers: {
							              'Content-Type': 'application/json',
							              Authorization: `Bearer ${token}`,
							            },
					            body: JSON.stringify({
							              product_id: productId,
							              quantity: 1,
							            }),
					          })

			            const data = await response.json()

			            if (!response.ok) {
					            throw new Error(data.detail || 'Failed to add product to cart')
					          }

			            const totalItems = data.items.reduce(
					            (total, item) => total + item.quantity,
					            0
					          )

			            setCartCount(totalItems)

			            if (showCart) {
					            await loadCart()
					          }
			          } catch (err) {
					        setCartError(err.message)
					      }
		    }

	  const cartTotal = cart.reduce(
		      (total, item) => total + item.subtotal,
		      0
		    )

	  return (
		      <div className="app">
		        <header className="header">
		          <h1>E-Commerce Platform</h1>

		          <nav>
		            <a href="#products">Products</a>

		            <button
		              type="button"
		              onClick={handleCartClick}
		            >
		              Cart ({cartCount})
		            </button>

		            {loggedIn ? (
				                <button
				                  type="button"
				                  onClick={handleLogout}
				                >
				                  Logout
				                </button>
				              ) : (
						                  <button
						                    type="button"
						                    onClick={() => {
									                    setShowLogin((show) => !show)
									                    setLoginError('')
									                  }}
						                  >
						                    Login
						                  </button>
						                )}
		          </nav>
		        </header>

		        {showLogin && !loggedIn && (
				        <section className="login-section">
				          <h2>Login</h2>

				          <form onSubmit={handleLogin}>
				            <input
				              type="email"
				              placeholder="Email"
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

				            <button type="submit">
				              Login
				            </button>
				          </form>

				          {loginError && (
						              <p className="login-error">
						                {loginError}
						              </p>
						            )}
				        </section>
				      )}

		        {loggedIn && user && (
				        <section className="user-info">
				          <p>Welcome, {user.username}</p>
				        </section>
				      )}

		        {cartError && (
				        <p className="login-error">
				          {cartError}
				        </p>
				      )}

		        {showCart && loggedIn && (
				        <section className="cart-section">
				          <h2>Your Cart</h2>

				          {cartLoading && <p>Loading cart...</p>}

				          {!cartLoading && cart.length === 0 && (
						              <p>Your cart is empty.</p>
						            )}

				          {!cartLoading && cart.length > 0 && (
						              <>
						                <div className="cart-items">
						                  {cart.map((item) => (
									                    <article
									                      className="cart-item"
									                      key={item.id}
									                    >
									                      <div>
									                        <h3>{item.product_name}</h3>
									                        <p>
									                          Quantity: {item.quantity}
									                        </p>
									                        <p>
									                          Price: ₹{item.price.toLocaleString('en-IN')}
									                        </p>
									                      </div>

									                      <strong>
									                        ₹{item.subtotal.toLocaleString('en-IN')}
									                      </strong>
									                    </article>
									                  ))}
						                </div>

						                <div className="cart-total">
						                  <strong>
						                    Total: ₹{cartTotal.toLocaleString('en-IN')}
						                  </strong>
						                </div>
						              </>
						            )}
				        </section>
				      )}

		        <main>
		          <section className="hero">
		            <h2>Welcome to our store</h2>
		            <p>DevOps-powered E-Commerce Platform</p>
		          </section>

		          <section id="products" className="products">
		            <h2>Products</h2>

		            {loading && <p>Loading products...</p>}

		            {error && (
				                <p>
				                  Unable to load products: {error}
				                </p>
				              )}

		            {!loading && !error && (
				                <div className="product-grid">
				                  {products.map((product) => (
							                  <article
							                    className="product-card"
							                    key={product.id}
							                  >
							                    <div className="product-image">
							                      🛒
							                    </div>

							                    <h3>{product.name}</h3>

							                    <p>{product.description}</p>

							                    <p className="price">
							                      ₹{product.price.toLocaleString('en-IN')}
							                    </p>

							                    <p>
							                      Stock: {product.stock_quantity}
							                    </p>

							                    <button
							                      type="button"
							                      onClick={() => addToCart(product.id)}
							                    >
							                      Add to Cart
							                    </button>
							                  </article>
							                ))}
				                </div>
				              )}
		          </section>
		        </main>

		        <footer>
		          <p>
		            E-Commerce Platform — DevOps Portfolio Project
		          </p>
		        </footer>
		      </div>
		    )
}

export default App
