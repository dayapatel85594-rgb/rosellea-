import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useI18n } from '../contexts/I18nContext';
import { useProductData } from '../hooks/useProductData';
import Navigation from '../components/Navigation';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import NewsletterPopup from '../components/NewsletterPopup';
import TestimonialSlider from '../components/TestimonialSlider';
import LuxuryParticles from '../components/LuxuryParticles';
import '../styles/main.scss';

function Home() {
  const { t } = useI18n();
  const { products, loading, error } = useProductData({ newArrivals: true });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
  }, []);

  return (
    <>
      <LuxuryParticles />
      <Navigation />

      <section className="hero-luxury">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content" data-aos="fade-right">
                <h1 className="hero-title">
                  {t('home.hero.title', 'Welcome to')} <span className="highlight">Rosellea</span><br />
                  <span className="subtitle-text">{t('home.hero.subtitle', 'Boutique Elegance Redefined')}</span>
                </h1>
                <p className="hero-subtitle">
                  {t('home.hero.description', 'Discover exquisite pieces that embody grace and sophistication, crafted for the woman who appreciates timeless French elegance')}
                </p>
                <a href="#collections" className="btn btn-luxury">
                  {t('home.hero.cta', 'Explore Collection')}
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image" data-aos="fade-left" data-aos-delay="300"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="floating-gallery" id="collections">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-4 mb-4">{t('home.collections.title', 'Curated Collections')}</h2>
            <p className="lead">{t('home.collections.subtitle', 'Each piece tells a story of timeless elegance and modern sophistication')}</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <Link to="/collections?category=tops" className="gallery-item">
                <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop" alt="Elegant Tops" />
                <div className="overlay">
                  <div className="overlay-text">
                    <h4>Elegant Tops</h4>
                    <p>Sophisticated silhouettes</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <Link to="/collections?category=dresses" className="gallery-item">
                <img src="https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=400&h=500&fit=crop" alt="Timeless Dresses" />
                <div className="overlay">
                  <div className="overlay-text">
                    <h4>Timeless Dresses</h4>
                    <p>Effortless elegance</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <Link to="/collections?category=pants" className="gallery-item">
                <img src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop" alt="Refined Bottoms" />
                <div className="overlay">
                  <div className="overlay-text">
                    <h4>Refined Bottoms</h4>
                    <p>Modern comfort</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" id="products" style={{background: 'rgba(245, 240, 235, 0.3)'}}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-4 mb-4">{t('home.arrivals.title', 'New Arrivals')}</h2>
            <p className="lead">
              {t('home.arrivals.subtitle', 'Fresh from our atelier, each piece embodies the essence of timeless beauty')}
            </p>
          </div>
          
          {error && (
            <div className="alert alert-danger text-center">
              <h4>{t('home.error.title', 'Error Loading Products')}</h4>
              <p>{error}</p>
              <p>{t('home.error.retry', 'Please check your internet connection and try again.')}</p>
            </div>
          )}
          
          {loading ? (
            <div className="row g-4 justify-content-center">
              {[...Array(8)].map((_, index) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                  <div className="product-card">
                    <div className="loading-skeleton" style={{height: '320px', borderRadius: '20px 20px 0 0'}}></div>
                    <div className="product-details">
                      <div className="loading-skeleton" style={{height: '24px', marginBottom: '12px', borderRadius: '4px'}}></div>
                      <div className="loading-skeleton" style={{height: '16px', marginBottom: '16px', borderRadius: '4px', width: '80%'}}></div>
                      <div className="loading-skeleton" style={{height: '28px', marginBottom: '16px', borderRadius: '4px', width: '60%'}}></div>
                      <div className="loading-skeleton" style={{height: '48px', borderRadius: '12px'}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="row g-4 justify-content-center">
              {products.map((product, index) => (
                <div 
                  className="col-lg-3 col-md-4 col-sm-6" 
                  key={product._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <ProductCard 
                    product={product} 
                    onClick={() => setSelectedProduct(product)} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h3 className="mb-3">{t('home.coming.title', 'New Collections Coming Soon')}</h3>
              <p>{t('home.coming.subtitle', 'We\'re preparing something special for you. Check back soon!')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Preview Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <TestimonialSlider />
      
      <Footer />
      <ScrollToTop />
      <NewsletterPopup />
    </>
  );
}

export default Home;