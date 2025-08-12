import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import apiService from '../utils/apiService';

function Profile() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || ''
        }
      });
      if (user.profilePicture) {
        setProfilePicturePreview(user.profilePicture);
      }
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await apiService.getOrders();
      if (response.success) {
        setOrders(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Profile picture must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicturePreview(e.target.result);
        setProfilePicture(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updateData = { ...formData };
    if (profilePicture) {
      updateData.profilePicture = profilePicturePreview;
    }

    const result = await updateProfile(updateData);

    if (result.success) {
      setMessage('Profile updated successfully!');
    } else {
      setMessage(result.error || 'Failed to update profile');
    }

    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const cancelOrder = async (orderId) => {
    try {
      await apiService.updateOrderStatus(orderId, 'cancelled');
      setMessage('Order cancelled successfully');
      fetchOrders();
    } catch (error) {
      setMessage('Failed to cancel order');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'processing': return '#2196F3';
      case 'shipped': return '#9C27B0';
      case 'delivered': return '#4CAF50';
      case 'cancelled': return '#F44336';
      default: return '#757575';
    }
  };

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'fa-clock';
      case 'processing': return 'fa-cog fa-spin';
      case 'shipped': return 'fa-truck';
      case 'delivered': return 'fa-check-circle';
      case 'cancelled': return 'fa-times-circle';
      default: return 'fa-question-circle';
    }
  };

  return (
    <>
      <Navigation />

      <div className="profile-container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #F5F0EB 0%, rgba(232, 180, 184, 0.3) 100%)' }}>
        <div className="container">
          <div className="row">
            {/* Profile Sidebar */}
            <div className="col-lg-3 mb-4">
              <div className="profile-sidebar" style={{ background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 16px 48px rgba(212, 175, 55, 0.25)' }}>
                <div className="profile-avatar text-center mb-4">
                  <div className="avatar-container" style={{ position: 'relative', display: 'inline-block' }}>
                    {profilePicturePreview ? (
                      <img
                        src={profilePicturePreview}
                        alt="Profile"
                        style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '4px solid #D4AF37',
                          boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)'
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #E8B4B8 0%, #C8A2C8 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '4px solid #D4AF37',
                          boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                          color: '#fff',
                          fontSize: '2.5rem',
                          fontWeight: 700,
                          fontFamily: 'Playfair Display, serif',
                          position: 'relative',
                          overflow: 'hidden',
                          backgroundClip: 'padding-box',
                        }}
                        className="profile-placeholder-avatar"
                      >
                        {user?.firstName || user?.lastName ? (
                          <span>
                            {(user?.firstName?.[0] || '') + (user?.lastName?.[0] || '')}
                          </span>
                        ) : (
                          <i className="fas fa-user" style={{ fontSize: '2.5rem', opacity: 0.7 }}></i>
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4B8 100%)',
                        border: '2px solid white',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      <i className="fas fa-camera"></i>
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleProfilePictureChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <h4 style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif', marginTop: '1rem' }}>
                    {user?.firstName} {user?.lastName}
                  </h4>
                  <p style={{ color: '#8B4B6B', fontSize: '0.9rem' }}>{user?.email}</p>
                </div>

                <nav className="profile-nav">
                  <button
                    className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: 'none',
                      background: activeTab === 'profile' ? 'linear-gradient(135deg, #D4AF37 0%, #E8B4B8 100%)' : 'transparent',
                      color: activeTab === 'profile' ? 'white' : '#2C1810',
                      borderRadius: '12px',
                      marginBottom: '0.5rem',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <i className="fas fa-user"></i>
                    Profile Information
                  </button>
                  <button
                    className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: 'none',
                      background: activeTab === 'orders' ? 'linear-gradient(135deg, #D4AF37 0%, #E8B4B8 100%)' : 'transparent',
                      color: activeTab === 'orders' ? 'white' : '#2C1810',
                      borderRadius: '12px',
                      marginBottom: '0.5rem',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <i className="fas fa-shopping-bag"></i>
                    Order History
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              <div className="profile-content" style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 16px 48px rgba(212, 175, 55, 0.25)' }}>
                {message && (
                  <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`} style={{ borderRadius: '12px', marginBottom: '2rem' }}>
                    {message}
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div className="profile-form">
                    <h2 style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif', marginBottom: '2rem' }}>
                      Profile Information
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label" style={{ color: '#2C1810', fontWeight: '600' }}>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
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
                        <div className="col-md-6 mb-3">
                          <label className="form-label" style={{ color: '#2C1810', fontWeight: '600' }}>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
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
                      </div>

                      <div className="mb-3">
                        <label className="form-label" style={{ color: '#2C1810', fontWeight: '600' }}>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={user?.email || ''}
                          disabled
                          style={{
                            padding: '1rem',
                            border: '2px solid rgba(212, 175, 55, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            backgroundColor: '#f8f9fa',
                            color: '#6c757d'
                          }}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label" style={{ color: '#2C1810', fontWeight: '600' }}>Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
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

                      <h5 style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>Address Information</h5>

                      <div className="mb-3">
                        <label className="form-label" style={{ color: '#2C1810', fontWeight: '600' }}>Street Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleChange}
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

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label" style={{ color: '#2C1810', fontWeight: '600' }}>City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleChange}
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
                        <div className="col-md-3 mb-3">
                          <label className="form-label" style={{ color: '#2C1810', fontWeight: '600' }}>State</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleChange}
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
                        <div className="col-md-3 mb-3">
                          <label className="form-label" style={{ color: '#2C1810', fontWeight: '600' }}>ZIP Code</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address.zipCode"
                            value={formData.address.zipCode}
                            onChange={handleChange}
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
                      </div>

                      <button
                        type="submit"
                        className="btn"
                        disabled={loading}
                        style={{
                          background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #FFA500 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '1rem 2rem',
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
                            Updating...
                          </>
                        ) : (
                          'Update Profile'
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="orders-section">
                    <h2 style={{ color: '#2C1810', fontFamily: 'Playfair Display, serif', marginBottom: '2rem' }}>
                      Order History
                    </h2>

                    {loadingOrders ? (
                      <div className="text-center py-5">
                        <div className="spinner-border" style={{ color: '#D4AF37' }} role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3" style={{ color: '#4A4A4A' }}>Loading your orders...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="fas fa-shopping-bag" style={{ fontSize: '4rem', color: '#D4AF37', marginBottom: '1rem' }}></i>
                        <h4 style={{ color: '#2C1810', marginBottom: '1rem' }}>No Orders Yet</h4>
                        <p style={{ color: '#4A4A4A' }}>Start shopping to see your orders here!</p>
                      </div>
                    ) : (
                      <div className="orders-list">
                        {orders.map((order) => (
                          <div key={order._id} className="order-card" style={{
                            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 245, 240, 0.8) 100%)',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            borderRadius: '15px',
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                            boxShadow: '0 8px 25px rgba(212, 175, 55, 0.15)'
                          }}>
                            <div className="order-header d-flex justify-content-between align-items-start mb-3">
                              <div>
                                <h5 style={{ color: '#2C1810', fontWeight: '600', marginBottom: '0.5rem' }}>
                                  Order #{order._id?.slice(-8)}
                                </h5>
                                <p style={{ color: '#4A4A4A', fontSize: '0.9rem', margin: 0 }}>
                                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="order-status d-flex align-items-center" style={{ gap: '0.5rem' }}>
                                <i className={`fas ${getOrderStatusIcon(order.status)}`} style={{ color: getOrderStatusColor(order.status) }}></i>
                                <span style={{
                                  color: getOrderStatusColor(order.status),
                                  fontWeight: '600',
                                  textTransform: 'capitalize'
                                }}>
                                  {order.status}
                                </span>
                              </div>
                            </div>

                            <div className="order-items mb-3">
                              {order.items?.map((item, index) => (
                                <div key={index} className="order-item d-flex align-items-center" style={{ marginBottom: '1rem' }}>
                                  <img
                                    src={item.product?.images?.[0] || 'https://via.placeholder.com/60'}
                                    alt={item.product?.title}
                                    style={{
                                      width: '60px',
                                      height: '60px',
                                      objectFit: 'cover',
                                      borderRadius: '8px',
                                      marginRight: '1rem'
                                    }}
                                  />
                                  <div className="flex-grow-1">
                                    <h6 style={{ color: '#2C1810', margin: 0, fontSize: '1rem' }}>
                                      {item.product?.title}
                                    </h6>
                                    <p style={{ color: '#4A4A4A', fontSize: '0.9rem', margin: 0 }}>
                                      Quantity: {item.quantity} • ${item.price}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="order-footer d-flex justify-content-between align-items-center">
                              <div>
                                <strong style={{ color: '#D4AF37', fontSize: '1.2rem' }}>
                                  Total: ${order.total?.toFixed(2)}
                                </strong>
                              </div>
                              <div className="order-actions" style={{ gap: '0.5rem', display: 'flex' }}>
                                {order.status === 'pending' && (
                                  <button
                                    onClick={() => cancelOrder(order._id)}
                                    style={{
                                      background: 'transparent',
                                      color: '#F44336',
                                      border: '2px solid #F44336',
                                      padding: '0.5rem 1rem',
                                      borderRadius: '8px',
                                      fontSize: '0.9rem',
                                      fontWeight: '600',
                                      cursor: 'pointer',
                                      transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background = '#F44336';
                                      e.target.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = 'transparent';
                                      e.target.style.color = '#F44336';
                                    }}
                                  >
                                    Cancel Order
                                  </button>
                                )}
                                <button
                                  style={{
                                    background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4B8 100%)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                >
                                  Track Order
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;