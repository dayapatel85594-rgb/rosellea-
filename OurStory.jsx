import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AOS from 'aos';

function OurStory() {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
  }, []);

  return (
    <>
      <Navigation />
      
      <section className="story-hero" style={{ paddingTop: '120px', paddingBottom: '80px', background: 'linear-gradient(135deg, #F5F0EB 0%, rgba(232, 180, 184, 0.3) 100%)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h1 className="display-3 mb-4" style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif' }}>
                The Story of <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Rosellea</span>
              </h1>
              <p className="lead" style={{ color: '#4A4A4A', lineHeight: '1.8' }}>
                Born from a dream of timeless French elegance, Rosellea represents the perfect fusion of 
                classic sophistication and modern femininity.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop&crop=faces" 
                alt="Rosellea Story" 
                className="img-fluid rounded-3 shadow-lg"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="story-content" data-aos="fade-up">
                <h2 className="h3 mb-4" style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif' }}>
                  A Vision Born in Paris
                </h2>
                <p style={{ color: '#4A4A4A', lineHeight: '1.8', marginBottom: '2rem' }}>
                  In the heart of Paris, where cobblestone streets whisper tales of romance and elegance, 
                  Rosellea was conceived. Our founder, inspired by the timeless grace of French women and 
                  the delicate beauty of roses in Parisian gardens, envisioned a brand that would celebrate 
                  the authentic femininity in every woman.
                </p>
                
                <div className="row my-5">
                  <div className="col-md-6" data-aos="fade-right">
                    <img 
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop" 
                      alt="Parisian Inspiration" 
                      className="img-fluid rounded-3 mb-3"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-6" data-aos="fade-left">
                    <h3 className="h4 mb-3" style={{ color: '#8B4B6B', fontFamily: 'Playfair Display, serif' }}>
                      The Rose Philosophy
                    </h3>
                    <p style={{ color: '#4A4A4A', lineHeight: '1.7' }}>
                      Like a rose that blooms with grace and resilience, every Rosellea piece is designed 
                      to enhance your natural beauty while empowering your confidence. We believe that 
                      true elegance comes from within, and our designs simply help it shine.
                    </p>
                  </div>
                </div>

                <h2 className="h3 mb-4" style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif' }}>
                  Craftsmanship Meets Innovation
                </h2>
                <p style={{ color: '#4A4A4A', lineHeight: '1.8', marginBottom: '2rem' }}>
                  Each Rosellea garment is a testament to exceptional craftsmanship. We work with skilled 
                  artisans who share our passion for quality and attention to detail. From the selection 
                  of premium fabrics to the final stitch, every step is carefully considered to create 
                  pieces that will remain beautiful for years to come.
                </p>

                <div className="row my-5">
                  <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="text-center p-4">
                      <div className="mb-3" style={{ fontSize: '3rem', color: '#D4AF37' }}>✨</div>
                      <h4 style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif' }}>Premium Quality</h4>
                      <p style={{ color: '#4A4A4A' }}>Only the finest materials and fabrics make it into our collections</p>
                    </div>
                  </div>
                  <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="text-center p-4">
                      <div className="mb-3" style={{ fontSize: '3rem', color: '#E8B4B8' }}>🌹</div>
                      <h4 style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif' }}>Timeless Design</h4>
                      <p style={{ color: '#4A4A4A' }}>Classic silhouettes that transcend seasonal trends</p>
                    </div>
                  </div>
                  <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
                    <div className="text-center p-4">
                      <div className="mb-3" style={{ fontSize: '3rem', color: '#8B4B6B' }}>💎</div>
                      <h4 style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif' }}>Ethical Fashion</h4>
                      <p style={{ color: '#4A4A4A' }}>Sustainable practices and fair trade partnerships</p>
                    </div>
                  </div>
                </div>

                <div className="text-center my-5" data-aos="fade-up">
                  <img 
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=400&fit=crop" 
                    alt="Rosellea Atelier" 
                    className="img-fluid rounded-3 shadow-lg"
                    style={{ objectFit: 'cover' }}
                  />
                  <p className="mt-3 text-muted fst-italic">Our atelier where dreams become reality</p>
                </div>

                <h2 className="h3 mb-4" style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif' }}>
                  For Every Woman, Every Moment
                </h2>
                <p style={{ color: '#4A4A4A', lineHeight: '1.8', marginBottom: '2rem' }}>
                  Whether you're attending a boardroom meeting, enjoying a romantic dinner, or celebrating 
                  life's special moments, Rosellea has the perfect piece to make you feel confident and 
                  beautiful. Our collections are designed for the modern woman who appreciates quality, 
                  values authenticity, and isn't afraid to express her unique style.
                </p>

                <div className="text-center mt-5" data-aos="fade-up">
                  <blockquote className="blockquote" style={{ color: '#8B4B6B', fontStyle: 'italic', fontSize: '1.5rem' }}>
                    "Elegance is not about being noticed, it's about being remembered."
                  </blockquote>
                  <footer className="blockquote-footer mt-3" style={{ color: '#4A4A4A' }}>
                    Rosellea Philosophy
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default OurStory;