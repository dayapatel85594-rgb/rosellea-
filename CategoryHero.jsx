import '../styles/main.scss';

function CategoryHero({ category, title, description, heroImage, featureImage }) {
  return (
    <section className="category-hero">
      <img src={heroImage} alt={`Premium ${title} Background`} className="hero-bg-img" />
      <div className="hero-glow"></div>
      <div className="heavenly-particles">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div className="categories-hero-content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="hero-visual-container">
        <img src={featureImage} alt={`Featured ${title}`} className="hero-interactive-img" />
      </div>
    </section>
  );
}

export default CategoryHero;