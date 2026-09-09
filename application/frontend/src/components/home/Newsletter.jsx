import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="newsletter-section">
      <div className="page-container">
        <div className="newsletter">
          <div>
            <span className="newsletter-eyebrow">STAY IN THE LOOP</span>

            <h2>Get the good stuff first.</h2>

            <p>
              New arrivals, selected offers and useful shopping inspiration.
              No unnecessary noise.
            </p>
          </div>

          {submitted ? (
            <div className="newsletter-success">
              <strong>You're on the list.</strong>
              <span>We'll keep you posted.</span>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                required
              />

              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
