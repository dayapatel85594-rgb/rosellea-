import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import NotificationSystem from './NotificationSystem';

function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [isLoading, setIsLoading] = useState(false);

  // Validate product data
  if (!product) {
    return (
      <div className="product-card-luxury error-state">
        <div className="product-details">
          <p>Product information unavailable</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = async (e) => {
    e.stopPropagation();
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
    try {
      const result = await addToCart(product);
      if (result.success) {
        setNotification({
          show: true,
          message: `${product.title || 'Item'} added to your cart!`,
          type: 'success'
        });
      } else {
        setNotification({
          show: true,
          message: result.error || 'Failed to add item to cart',
          type: 'error'
        });
      }
    } catch (error) {
      setNotification({
        show: true,
        message: 'An error occurred while adding to cart',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    if (onClick && !isLoading) {
      onClick();
    }
  };

  const closeNotification = () => {
    setNotification({ ...notification, show: false });
  };

  const productTitle = product.title || 'Untitled Product';
  const productPrice = product.price || 0;
  const productImage = (product.images && product.images[0]) || product.image || '/placeholder-image.jpg';
  const productDescription = product.description || 'Elegant piece crafted with attention to detail';
  const productMaterial = product.material || 'Material: Not specified';
  const productCare = product.care || 'Care: Not specified';
  const productRating = product.rating ? `⭐ ${product.rating}` : '';
  const productStock = typeof product.stock === 'number' ? `Stock: ${product.stock}` : '';
  const productPriceINR = productPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <>
      <div className="product-card-luxury" onClick={handleCardClick}>
        <img
          src={productImage}
          alt={productTitle}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        <div className="product-details">
          <h3 className="product-title">{productTitle}</h3>
          <p className="product-description">{productDescription}</p>
          <div className="product-meta">
            <span className="product-material">{productMaterial}</span><br />
            <span className="product-care">{productCare}</span><br />
            <span className="product-rating">{productRating}</span><br />
            <span className="product-stock">{productStock}</span>
          </div>
          <div className="product-price" style={{ fontWeight: 'bold', color: '#CBB279', fontSize: '1.2rem' }}>{productPriceINR}</div>
          <button
            className={`btn btn-luxury w-100 ${isLoading ? 'loading' : ''}`}
            onClick={handleAddToCart}
            disabled={isLoading}
            aria-label={`Add ${productTitle} to cart`}
            style={{
              marginTop: '0.5rem',
              transition: 'background 0.3s, color 0.3s',
              background: isLoading
                ? 'var(--accent-mauve)' // subtle loading color
                : 'var(--gradient-luxury-gold)',
              color: isLoading ? '#bbb' : 'var(--white)',
              fontWeight: 700,
              letterSpacing: '1px',
              boxShadow: isLoading ? 'none' : 'var(--shadow-luxury-soft)'
            }}
            onMouseDown={e => e.currentTarget.style.filter = 'brightness(0.92)'}
            onMouseUp={e => e.currentTarget.style.filter = ''}
            onMouseLeave={e => e.currentTarget.style.filter = ''}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <NotificationSystem
        message={notification.message}
        type={notification.type}
        isVisible={notification.show}
        onClose={closeNotification}
      />
    </>
  );
}

export default ProductCard;