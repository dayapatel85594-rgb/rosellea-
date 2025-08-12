import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import apiService from '../utils/apiService';

function Checkout() {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        shippingAddress,
        paymentMethod
      };

      const response = await apiService.createOrder(orderData);
      
      if (response.success) {
        await clearCart();
        navigate('/profile', { 
          state: { message: 'Order placed successfully!' }
        });
      }
    } catch (error) {
      alert('Failed to place order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navigation />
        <div className="container" style={{ paddingTop: '120px', minHeight: '60vh' }}>
          <div className="text-center">
            <h3>Your cart is empty</h3>
            <p>Add items to your cart before checkout</p>
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
        <h2 className="text-center mb-5" style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif' }}>
          Checkout
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4" style={{ borderRadius: '15px' }}>
                <div className="card-body">
                  <h5 className="card-title">Shipping Address</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={shippingAddress.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={shippingAddress.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={shippingAddress.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="street"
                      value={shippingAddress.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body">
                  <h5 className="card-title">Payment Method</h5>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="card"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="card">
                      Credit/Debit Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paypal"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <hr />
                  {items.map((item) => (
                    <div key={item._id} className="d-flex justify-content-between mb-2">
                      <span>{item.product?.title} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-luxury w-100"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;