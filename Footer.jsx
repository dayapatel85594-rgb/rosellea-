import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';

function Footer() {
  const { t } = useI18n();
  
  return (
    <footer 
      className="footer-luxury"
      style={{
        background: '#1A1A1A',
        color: '#F5F0EB',
        marginTop: '4rem'
      }}
    >
      <div className="container">
        <div className="row py-5">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-brand mb-4">
              <h3 className="h4 mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0EB' }}>
                Rosellea
              </h3>
              <p style={{ color: 'rgba(245, 240, 235, 0.8)', lineHeight: '1.6' }}>
                {t('footer.description', 'Boutique elegance redefined. Discover exquisite pieces that embody grace and sophistication, crafted for the discerning woman.')}
              </p>
            </div>
            
            <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
              <a 
                href="#" 
                aria-label="Instagram"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(245, 240, 235, 0.1)',
                  color: '#F5F0EB',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#E4405F';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(245, 240, 235, 0.1)';
                  e.target.style.color = '#F5F0EB';
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                aria-label="Pinterest"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(245, 240, 235, 0.1)',
                  color: '#F5F0EB',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#BD081C';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(245, 240, 235, 0.1)';
                  e.target.style.color = '#F5F0EB';
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className="fab fa-pinterest"></i>
              </a>
              <a 
                href="#" 
                aria-label="Facebook"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(245, 240, 235, 0.1)',
                  color: '#F5F0EB',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#1877F2';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(245, 240, 235, 0.1)';
                  e.target.style.color = '#F5F0EB';
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(245, 240, 235, 0.1)',
                  color: '#F5F0EB',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#1DA1F2';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(245, 240, 235, 0.1)';
                  e.target.style.color = '#F5F0EB';
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 style={{ fontFamily: 'Playfair Display, serif', fontWeight: '600', color: '#F5F0EB', marginBottom: '1.5rem' }}>
              Shop
            </h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/collections" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  New Arrivals
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/collections" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Collections
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/collections" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Sale
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/collections" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 style={{ fontFamily: 'Playfair Display, serif', fontWeight: '600', color: '#F5F0EB', marginBottom: '1.5rem' }}>
              About
            </h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Our Story
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Sustainability
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Careers
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Press
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 style={{ fontFamily: 'Playfair Display, serif', fontWeight: '600', color: '#F5F0EB', marginBottom: '1.5rem' }}>
              Support
            </h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Contact Us
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Size Guide
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Shipping
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 style={{ fontFamily: 'Playfair Display, serif', fontWeight: '600', color: '#F5F0EB', marginBottom: '1.5rem' }}>
              Legal
            </h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Privacy Policy
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Terms of Service
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'rgba(245, 240, 235, 0.7)', textDecoration: 'none', transition: 'all 0.4s ease' }}>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom py-4" style={{ borderTop: '1px solid rgba(245, 240, 235, 0.2)' }}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0" style={{ color: 'rgba(245, 240, 235, 0.8)' }}>
                © 2024 Rosellea. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0" style={{ color: 'rgba(245, 240, 235, 0.8)' }}>
                {t('footer.copyright', 'Made with 💜 and ✨ for timeless elegance everywhere')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;