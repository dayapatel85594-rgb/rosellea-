import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useProductData } from '../hooks/useProductData';
import AOS from 'aos';

function ProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProductData();
  const product = products.find(p => p._id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="container py-5 mt-5">
          <div className="row">
            <div className="col-lg-6">
              <div className="loading-skeleton" style={{height: '600px', borderRadius: '20px'}}></div>
            </div>
            <div className="col-lg-6">
              <div className="loading-skeleton" style={{height: '40px', marginBottom: '20px', borderRadius: '8px'}}></div>
              <div className="loading-skeleton" style={{height: '60px', marginBottom: '20px', borderRadius: '8px'}}></div>
              <div className="loading-skeleton" style={{height: '100px', marginBottom: '20px', borderRadius: '8px'}}></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navigation />
        <div className="container py-5 mt-5 text-center">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    console.log('Added to cart:', { product, selectedSize, selectedColor, quantity });
  };

  return (
    <>
      <Navigation />
      
      <div className="container py-5 mt-5">
        <div className="row g-5">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="product-gallery">
              <div className="main-image mb-3">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="img-fluid rounded-3"
                  style={{width: '100%', height: '600px', objectFit: 'cover'}}
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="thumbnail-images d-flex gap-2">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(index)}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: index === activeImageIndex ? '2px solid var(--accent-rose)' : '2px solid transparent'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="col-lg-6" data-aos="fade-left">
            <div className="product-info">
              <h1 className="product-title mb-3">{product.title}</h1>
              
              <div className="product-price mb-4">
                <span className="h2 text-primary fw-bold">${product.price?.toFixed(2)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-muted text-decoration-line-through ms-3">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="product-description mb-4 lead">
                {product.description}
              </p>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="size-selection mb-4">
                  <h5 className="mb-3">Size</h5>
                  <div className="size-options d-flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`btn size-btn ${selectedSize === size ? 'selected' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {product.colors && product.colors.length > 0 && (
                <div className="color-selection mb-4">
                  <h5 className="mb-3">Color</h5>
                  <div className="color-options d-flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`btn color-btn ${selectedColor === color ? 'selected' : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="quantity-selection mb-4">
                <h5 className="mb-3">Quantity</h5>
                <div className="quantity-controls d-flex align-items-center">
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="mx-3 fw-bold">{quantity}</span>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="product-actions mb-4">
                <button 
                  className="btn btn-luxury btn-lg w-100 mb-3"
                  onClick={handleAddToCart}
                >
                  Add to Collection
                </button>
                
                <div className="product-features">
                  <div className="feature-item d-flex align-items-center mb-2">
                    <i className="fas fa-shipping-fast text-success me-2"></i>
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="feature-item d-flex align-items-center mb-2">
                    <i className="fas fa-undo text-info me-2"></i>
                    <span>30-day return policy</span>
                  </div>
                  <div className="feature-item d-flex align-items-center">
                    <i className="fas fa-shield-alt text-warning me-2"></i>
                    <span>Authentic guarantee</span>
                  </div>
                </div>
              </div>
              
              <div className="product-details">
                <div className="accordion" id="productAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#details">
                        Product Details
                      </button>
                    </h2>
                    <div id="details" className="accordion-collapse collapse show" data-bs-parent="#productAccordion">
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          <li><strong>Material:</strong> {product.material || 'Premium quality fabric'}</li>
                          <li><strong>Care:</strong> {product.care || 'Machine wash cold, hang dry'}</li>
                          <li><strong>Origin:</strong> Ethically sourced</li>
                          <li><strong>Fit:</strong> True to size</li>
                        </ul>
                      </div>
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
        .size-btn, .color-btn {
          border: 2px solid var(--accent-rose);
          background: transparent;
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-smooth);
        }
        
        .size-btn:hover, .color-btn:hover,
        .size-btn.selected, .color-btn.selected {
          background: var(--accent-rose);
          color: white;
        }
        
        .quantity-controls button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        
        .feature-item {
          font-size: 0.9rem;
          color: var(--text-primary);
          opacity: 0.8;
        }
        
        .accordion-button {
          background: var(--bg-primary);
          color: var(--text-primary);
          border: none;
          font-weight: 600;
        }
        
        .accordion-button:not(.collapsed) {
          background: var(--accent-rose);
          color: white;
        }
      `}</style>
    </>
  );
}

export default ProductDetail;