import { useState, useEffect } from 'react';
import { useI18n } from '../contexts/I18nContext';
import '../styles/newsletter.css';

function NewsletterPopup() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('newsletter-popup-seen');
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      sessionStorage.setItem('newsletter-popup-seen', 'true');
      setMessage(t('newsletter.success', 'Thank you for subscribing!'));

      setTimeout(() => {
        setIsVisible(false);
        setEmail('');
        setMessage('');
      }, 2000);
    } catch (error) {
      setMessage(t('newsletter.error', 'Something went wrong. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    sessionStorage.setItem('newsletter-popup-seen', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="newsletter-popup"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'all 0.4s ease'
      }}
    >
      <div
        className="popup-content"
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '20px',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 24px 60px rgba(26, 26, 26, 0.2)',
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          position: 'relative'
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            opacity: 0.7
          }}
        >
          ×
        </button>

        <div style={{ marginBottom: '1rem' }}>
          <i className="fas fa-envelope-open-text" style={{ fontSize: '3rem', color: '#6c757d', marginBottom: '1rem' }}></i>
        </div>

        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1A1A1A' }}>
          {t('footer.newsletter.title', 'Join Our Rosellea Circle')}
        </h3>
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
          {t('footer.newsletter.subtitle', 'Be the first to discover new collections, exclusive offers, and boutique elegance inspiration')}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder={t('footer.newsletter.placeholder', 'Enter your email address')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: '1rem',
              border: '2px solid rgba(216, 163, 157, 0.3)',
              borderRadius: '12px',
              fontSize: '1rem',
              transition: 'all 0.4s ease',
              opacity: isSubmitting ? 0.7 : 1
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? 'loading' : ''}
            style={{
              background: 'linear-gradient(135deg, #CBB279 0%, #D4BA87 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s ease',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? t('common.loading', 'Loading...') : t('footer.newsletter.subscribe', 'Subscribe')}
          </button>
        </form>

        {message && (
          <div style={{
            marginBottom: '1rem',
            padding: '0.5rem',
            borderRadius: '8px',
            background: message.includes('error') ? '#fee' : '#efe',
            color: message.includes('error') ? '#c33' : '#363'
          }}>
            {message}
          </div>
        )}

        <small style={{ color: '#6c757d' }}>
          {t('newsletter.privacy', 'We respect your privacy. Unsubscribe at any time.')}
        </small>
      </div>
    </div>
  );
}

export default NewsletterPopup;