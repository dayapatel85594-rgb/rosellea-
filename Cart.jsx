
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useState } from 'react';

function Cart() {
  const { items, loading, updateCartItem, removeFromCart, getCartTotal } = useCart();
  const { user } = useAuth();


  // Prevent refresh: use local state for instant UI, then update backend
  const [localQuantities, setLocalQuantities] = useState({});
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setLocalQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
    updateCartItem(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="container" style={{ paddingTop: '120px', minHeight: '60vh' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <h2 className="text-center mb-5" style={{ color: 'var(--accent-gold)', fontFamily: 'Playfair Display, serif', letterSpacing: '2px', textShadow: '0 2px 8px rgba(212,175,55,0.08)' }}>
          Shopping Cart
        </h2>
        {items.length === 0 ? (
          <div className="text-center py-5">
            <h4 style={{ color: 'var(--text-primary)' }}>Your cart is empty</h4>
            <p className="text-muted">Add some beautiful pieces to your collection</p>
            <Link to="/" className="btn btn-luxury">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {items.map((item) => (
                <div key={item._id} className="card mb-3 cart-card-premium" style={{ borderRadius: '20px', boxShadow: 'var(--shadow-luxury)' }}>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <img
                          src={item.product?.images?.[0] || item.product?.image}
                          alt={item.product?.title}
                          className="img-fluid rounded"
                          style={{ height: '120px', objectFit: 'cover', borderRadius: '16px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{item.product?.title}</h5>
                        <p className="mb-1" style={{ color: 'var(--accent-mauve)', fontWeight: 500 }}>
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && ' | '}
                          {item.color && `Color: ${item.color}`}
                        </p>
                        <p className="fw-bold" style={{ color: 'var(--accent-gold)', fontSize: '1.2rem' }}>
                          ₹{item.price?.toLocaleString('en-IN', { style: 'decimal', maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex align-items-center mb-2 cart-qty-group">
                          <button
                            className="btn btn-sm btn-outline-secondary cart-qty-btn"
                            style={{ borderRadius: '50%', width: '36px', height: '36px', fontSize: '1.2rem', fontWeight: 700, marginRight: '8px', transition: 'background 0.2s, color 0.2s' }}
                            onClick={() => handleQuantityChange(item._id, (localQuantities[item._id] ?? item.quantity) - 1)}
                            tabIndex={0}
                          >
                            -
                          </button>
                          <span className="mx-2" style={{ minWidth: '32px', display: 'inline-block', textAlign: 'center', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem' }}>{localQuantities[item._id] ?? item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary cart-qty-btn"
                            style={{ borderRadius: '50%', width: '36px', height: '36px', fontSize: '1.2rem', fontWeight: 700, marginLeft: '8px', transition: 'background 0.2s, color 0.2s' }}
                            onClick={() => handleQuantityChange(item._id, (localQuantities[item._id] ?? item.quantity) + 1)}
                            tabIndex={0}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger w-100 cart-remove-btn"
                          style={{ borderRadius: '12px', fontWeight: 600, letterSpacing: '1px', transition: 'background 0.2s, color 0.2s' }}
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="card cart-summary-premium" style={{ borderRadius: '20px', boxShadow: 'var(--shadow-luxury)' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>Order Summary</h5>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>₹{getCartTotal().toLocaleString('en-IN', { style: 'decimal', maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>{getCartTotal() > 10000 ? 'Free' : '₹500.00'}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax:</span>
                    <span>₹{(getCartTotal() * 0.08).toLocaleString('en-IN', { style: 'decimal', maximumFractionDigits: 2 })}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>₹{(getCartTotal() + (getCartTotal() > 10000 ? 0 : 500) + (getCartTotal() * 0.08)).toLocaleString('en-IN', { style: 'decimal', maximumFractionDigits: 2 })}</span>
                  </div>
                  <Link to="/checkout" className="btn btn-luxury w-100 mt-3" style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '1px' }}>
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <style>{`
        .cart-card-premium {
          background: linear-gradient(135deg, var(--white) 80%, var(--accent-sage) 100%);
          border: 1.5px solid var(--accent-gold);
        }
        .cart-summary-premium {
          background: linear-gradient(135deg, var(--accent-gold) 5%, var(--white) 95%);
          border: 1.5px solid var(--accent-gold);
        }
        .cart-qty-btn:hover, .cart-qty-btn:focus {
          background: var(--accent-gold);
          color: var(--white);
          outline: none;
        }
        .cart-qty-btn:active {
          background: var(--accent-rose);
          color: var(--white);
        }
        .cart-remove-btn:hover, .cart-remove-btn:focus {
          background: var(--accent-rose);
          color: var(--white);
          outline: none;
        }
        .cart-remove-btn:active {
          background: var(--accent-mauve);
          color: var(--white);
        }
        [data-theme="dark"] .cart-card-premium {
          background: linear-gradient(135deg, #23201c 80%, var(--accent-sage) 100%);
          border: 1.5px solid var(--accent-gold);
        }
        [data-theme="dark"] .cart-summary-premium {
          background: linear-gradient(135deg, var(--accent-gold) 5%, #23201c 95%);
          border: 1.5px solid var(--accent-gold);
        }
        [data-theme="dark"] .cart-qty-btn:hover, [data-theme="dark"] .cart-qty-btn:focus {
          background: var(--accent-gold);
          color: var(--text-primary);
        }
        [data-theme="dark"] .cart-qty-btn:active {
          background: var(--accent-rose);
          color: var(--white);
        }
        [data-theme="dark"] .cart-remove-btn:hover, [data-theme="dark"] .cart-remove-btn:focus {
          background: var(--accent-rose);
          color: var(--white);
        }
        [data-theme="dark"] .cart-remove-btn:active {
          background: var(--accent-mauve);
          color: var(--white);
        }
      `}</style>

    </>
  );
}

export default Cart;