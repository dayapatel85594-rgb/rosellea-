import { useState, useEffect } from 'react';
import { useI18n } from '../contexts/I18nContext';

const testimonials = [
  {
    id: 1,
    text: "Rosellea has transformed my wardrobe. Every piece feels like it was made just for me - elegant, sophisticated, and absolutely beautiful.",
    author: "Sarah Chen",
    role: "Fashion Editor"
  },
  {
    id: 2,
    text: "The quality is exceptional and the designs are truly timeless. I feel confident and elegant in every piece I've purchased.",
    author: "Emma Rodriguez",
    role: "Creative Director"
  },
  {
    id: 3,
    text: "Finally, a brand that understands the modern woman. Sophisticated pieces that transition seamlessly from day to night.",
    author: "Isabella Thompson",
    role: "Entrepreneur"
  }
];

function TestimonialSlider() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="testimonial-slider"
      style={{
        background: 'linear-gradient(135deg, #B4C2B2 0%, rgba(180, 194, 178, 0.8) 100%)',
        padding: '4rem 0'
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-4 mb-4">{t('testimonials.title', 'What Our Muses Say')}</h2>
          <p className="lead">{t('testimonials.subtitle', 'Stories from women who embrace boutique elegance')}</p>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="testimonial-item" style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="mb-4">
                <i className="fas fa-quote-left fa-2x text-muted mb-3"></i>
              </div>
              
              <blockquote 
                className="testimonial-text"
                style={{
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  marginBottom: '2rem',
                  lineHeight: '1.8'
                }}
              >
                "{testimonials[currentIndex].text}"
              </blockquote>
              
              <div className="testimonial-author">
                <strong style={{ fontWeight: '600', color: '#D8A39D' }}>
                  {testimonials[currentIndex].author}
                </strong>
                <div className="text-muted">{testimonials[currentIndex].role}</div>
              </div>
              
              <div 
                className="testimonial-dots mt-4"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      background: index === currentIndex ? '#D8A39D' : 'rgba(216, 163, 157, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                    }}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSlider;