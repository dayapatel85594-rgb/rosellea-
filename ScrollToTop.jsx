import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="scroll-to-top"
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '50px',
        height: '50px',
        background: 'linear-gradient(135deg, #E8B4B8 0%, #C8A2C8 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(212, 175, 55, 0.15)',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;