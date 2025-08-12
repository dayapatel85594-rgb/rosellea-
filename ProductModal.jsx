import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import NotificationSystem from './NotificationSystem';

function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [isLoading, setIsLoading] = useState(false);

  if (!product) return null;

  const handleAddToCart = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (!isAuthenticated) {
      setNotification({
        show: true,
        message: 'Please log in to add items to your cart.',
        type: 'warning'
      });
      setIsLoading(false);
      return;
    }
    const result = await addToCart(product, quantity, selectedSize, selectedColor);
    if (result.success) {
      setNotification({
        show: true,
        message: `${product.title || 'Item'} added to your cart!`,
        type: 'success'
      });
      setTimeout(() => {
        setNotification({ show: false, message: '', type: 'info' });
        onClose();
      }, 1200);
    } else {
      setNotification({
        show: true,
        message: result.error || 'Failed to add item to cart',
        type: 'error'
      });
    }
    setIsLoading(false);
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          background: 'white',
          borderRadius: '20px',
          maxWidth: '800px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            cursor: 'pointer',
            zIndex: 10
          }}
          aria-label="Close product modal"
        >
          ×
        </button>

        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={product.images?.[0] || product.image}
              alt={product.title}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '20px 0 0 20px'
              }}
            />
          </div>
          <div className="col-md-6" style={{ padding: '2rem' }}>
            <h2 style={{ color: '#2C1810', marginBottom: '1rem' }}>{product.title}</h2>
            <p style={{ color: '#4A4A4A', marginBottom: '1.5rem' }}>{product.description}</p>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1.5rem' }}>
              ${product.price?.toFixed(2)}
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Size:</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '2px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '8px'
                  }}
                >
                  <option value="">Select Size</option>
                  {product.sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Color:</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '2px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '8px'
                  }}
                >
                  <option value="">Select Color</option>
                  {product.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock || 10}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={{
                  width: '100px',
                  padding: '0.5rem',
                  border: '2px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px'
                }}
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="btn btn-luxury w-100"
              style={{
                marginTop: '2rem',
                fontSize: '1.1rem',
                background: isLoading ? 'var(--accent-mauve)' : 'var(--gradient-luxury-gold)',
                color: isLoading ? '#bbb' : 'var(--white)',
                fontWeight: 700,
                letterSpacing: '1px',
                boxShadow: isLoading ? 'none' : 'var(--shadow-luxury-soft)',
                transition: 'background 0.3s, color 0.3s'
              }}
              disabled={isLoading}
              onMouseDown={e => e.currentTarget.style.filter = 'brightness(0.92)'}
              onMouseUp={e => e.currentTarget.style.filter = ''}
              onMouseLeave={e => e.currentTarget.style.filter = ''}
              aria-label={`Add ${product.title} to cart`}
            >
              {isLoading ? 'Adding...' : 'Add to Cart'}
            </button>
            <NotificationSystem
              message={notification.message}
              type={notification.type}
              isVisible={notification.show}
              onClose={() => setNotification({ ...notification, show: false })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;