import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  
  const { login, loading, error, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    clearError();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    try {
      const result = await login(formData);
      
      if (result && result.success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Navigation />
      
      <div className="auth-container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #F5F0EB 0%, rgba(232, 180, 184, 0.3) 100%)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="auth-card" style={{ background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 16px 48px rgba(212, 175, 55, 0.25)' }}>
                <div className="auth-header">
                  <button 
                    onClick={() => navigate(-1)}
                    className="back-arrow"
                    aria-label="Go back"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>
                  <div className="text-center mb-4">
                    <h2 style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                      Welcome Back to Rosellea
                    </h2>
                    <p style={{ color: '#4A4A4A', fontSize: '1.1rem' }}>
                      Sign in to continue your elegant journey
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="alert alert-danger" style={{ borderRadius: '12px', border: 'none', background: '#fee', color: '#c33' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ color: '#2C1810', fontWeight: '600' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        padding: '1rem',
                        border: '2px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label" style={{ color: '#2C1810', fontWeight: '600' }}>
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{
                        padding: '1rem',
                        border: '2px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 mb-3"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #FFA500 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      borderRadius: '12px',
                      transition: 'all 0.4s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <p style={{ color: '#4A4A4A', marginBottom: '1rem' }}>
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: '600' }}
                      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                      Create Account
                    </Link>
                  </p>
                  
                  <Link 
                    to="/" 
                    style={{ color: '#8B4B6B', textDecoration: 'none', fontSize: '0.9rem' }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                  >
                    ← Back to Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;