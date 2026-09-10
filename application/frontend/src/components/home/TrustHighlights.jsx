function TrustHighlights() {
  const highlights = [
    {
      icon: "01",
      title: "Quality selected",
      text: "Products chosen with everyday use in mind.",
    },
    {
      icon: "02",
      title: "Secure checkout",
      text: "A simple and protected shopping experience.",
    },
    {
      icon: "03",
      title: "Easy returns",
      text: "Straightforward returns when plans change.",
    },
    {
      icon: "04",
      title: "Fast delivery",
      text: "Reliable delivery across supported locations.",
    },
  ];

  return (
    <section className="trust-section">
      <div className="page-container trust-grid">
        {highlights.map((item) => (
          <div className="trust-item" key={item.title}>
            <span className="trust-number">{item.icon}</span>

            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustHighlights;
