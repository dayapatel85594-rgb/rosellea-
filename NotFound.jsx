import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function NotFound() {
  return (
    <>
      <Navigation />
      
      <div className="not-found-page">
        <div className="container py-5 mt-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <div className="not-found-content">
                <div className="not-found-icon mb-4">
                  <i className="fas fa-search fa-5x text-muted"></i>
                </div>
                
                <h1 className="display-1 fw-bold text-muted mb-4">404</h1>
                
                <h2 className="h3 mb-4">Page Not Found</h2>
                
                <p className="lead mb-5 text-muted">
                  The page you're looking for seems to have wandered off. 
                  Let's get you back to discovering timeless elegance.
                </p>
                
                <div className="not-found-actions">
                  <Link to="/" className="btn btn-luxury btn-lg me-3 mb-3">
                    Return Home
                  </Link>
                  <Link to="/collections" className="btn btn-outline-primary btn-lg mb-3">
                    Browse Collections
                  </Link>
                </div>
                
                <div className="mt-5">
                  <h5 className="mb-3">Popular Collections</h5>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <Link to="/collections/tops" className="text-decoration-none">
                        <div className="quick-link-card p-3 rounded-3 bg-white shadow-sm">
                          <i className="fas fa-tshirt fa-2x text-primary mb-2"></i>
                          <h6 className="mb-0">Elegant Tops</h6>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <Link to="/collections/dresses" className="text-decoration-none">
                        <div className="quick-link-card p-3 rounded-3 bg-white shadow-sm">
                          <i className="fas fa-dress fa-2x text-primary mb-2"></i>
                          <h6 className="mb-0">Timeless Dresses</h6>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <Link to="/collections/pants" className="text-decoration-none">
                        <div className="quick-link-card p-3 rounded-3 bg-white shadow-sm">
                          <i className="fas fa-female fa-2x text-primary mb-2"></i>
                          <h6 className="mb-0">Refined Bottoms</h6>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .not-found-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(245, 240, 235, 0.8) 100%);
          display: flex;
          align-items: center;
        }
        
        .not-found-icon {
          opacity: 0.3;
        }
        
        .quick-link-card {
          border: 1px solid rgba(216, 163, 157, 0.2);
          transition: all var(--transition-smooth);
          text-align: center;
        }
        
        .quick-link-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-medium) !important;
          border-color: var(--accent-rose);
        }
        
        .quick-link-card h6 {
          color: var(--text-primary);
        }
        
        .btn-outline-primary {
          border-color: var(--accent-rose);
          color: var(--accent-rose);
        }
        
        .btn-outline-primary:hover {
          background-color: var(--accent-rose);
          border-color: var(--accent-rose);
          color: white;
        }
      `}</style>
    </>
  );
}

export default NotFound;