const reviews = [
  {
    id: 1,
    name: "Riya S.",
    location: "Mumbai",
    rating: 5,
    text: "The shopping experience feels simple and thoughtfully designed. Finding what I needed was surprisingly easy.",
  },
  {
    id: 2,
    name: "Arjun K.",
    location: "Bengaluru",
    rating: 5,
    text: "Clean product presentation, useful information and a very straightforward checkout experience.",
  },
  {
    id: 3,
    name: "Neha P.",
    location: "Pune",
    rating: 4,
    text: "I liked how easy it was to compare products. The overall experience feels much less cluttered.",
  },
];

function ReviewSection() {
  return (
    <section className="home-section reviews-section">
      <div className="page-container">
        <div className="section-heading-new">
          <div>
            <span className="section-eyebrow">CUSTOMER VOICES</span>
            <h2>Loved by everyday shoppers.</h2>
          </div>

          <span className="section-description">
            A few words from people exploring NOVAORA.
          </span>
        </div>

        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-stars" aria-label={`${review.rating} out of 5`}>
                {"★".repeat(review.rating)}
              </div>

              <p>“{review.text}”</p>

              <div className="review-author">
                <div className="review-avatar">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <strong>{review.name}</strong>
                  <span>{review.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
