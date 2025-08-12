import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useI18n } from '../contexts/I18nContext';
import ThemeToggle from './ThemeToggle';

function Navigation() {
  const { t } = useI18n();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [showCartNotification, setShowCartNotification] = useState(false);

  const cartItemCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleCartClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowCartNotification(true);
      setTimeout(() => setShowCartNotification(false), 4000);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-elegant">
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="/">
            <span className="brand-text">Rosellea</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home nav-icon"></i>
                  <span className="nav-text">{t('nav.home', 'Home')}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/collections">
                  <i className="fas fa-th-large nav-icon"></i>
                  <span className="nav-text">{t('nav.collections', 'Collections')}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/our-story">
                  <i className="fas fa-heart nav-icon"></i>
                  <span className="nav-text">{t('nav.about', 'Our Story')}</span>
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                <ThemeToggle />
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link position-relative" 
                  to="/cart"
                  onClick={handleCartClick}
                >
                  <i className="fas fa-shopping-bag nav-icon"></i>
                  <span className="nav-text">{t('nav.cart', 'Cart')}</span>
                  {cartItemCount > 0 && (
                    <span className="cart-badge">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </li>
              {isAuthenticated ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i className="fas fa-user nav-icon"></i>
                    <span className="nav-text">{user?.firstName || 'Account'}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-elegant">
                    <li><Link className="dropdown-item" to="/profile">
                      <i className="fas fa-user-circle me-2"></i>{t('nav.profile', 'Profile')}
                    </Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logout}>
                      <i className="fas fa-sign-out-alt me-2"></i>{t('nav.logout', 'Logout')}
                    </button></li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <i className="fas fa-sign-in-alt nav-icon"></i>
                      <span className="nav-text">{t('nav.login', 'Login')}</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <i className="fas fa-user-plus nav-icon"></i>
                      <span className="nav-text">{t('nav.register', 'Register')}</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      
      {showCartNotification && (
        <div className="cart-notification">
          <div className="notification-content">
            <i className="fas fa-lock notification-icon"></i>
            <div className="notification-text">
              <h6>Authentication Required</h6>
              <p>Please sign in to access your shopping cart and enjoy our exclusive collections.</p>
            </div>
            <button 
              className="btn btn-sm btn-luxury"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;