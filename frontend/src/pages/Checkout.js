import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.scss';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to process the payment
      // and create the order
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      clearCart();
      navigate('/checkout/success');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-progress">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Shipping</span>
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Payment</span>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-form">
          {step === 1 ? (
            <form onSubmit={handleShippingSubmit}>
              <h2>Shipping Information</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo(prev => ({
                      ...prev,
                      firstName: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo(prev => ({
                      ...prev,
                      lastName: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo(prev => ({
                      ...prev,
                      address: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo(prev => ({
                      ...prev,
                      city: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo(prev => ({
                      ...prev,
                      state: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo(prev => ({
                      ...prev,
                      zipCode: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo(prev => ({
                      ...prev,
                      country: e.target.value
                    }))}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="continue-button">
                Continue to Payment
              </button>
            </form>
          ) : (
            <form onSubmit={handlePaymentSubmit}>
              <h2>Payment Information</h2>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo(prev => ({
                    ...prev,
                    cardNumber: e.target.value
                  }))}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="form-group">
                <label>Name on Card</label>
                <input
                  type="text"
                  value={paymentInfo.cardName}
                  onChange={(e) => setPaymentInfo(prev => ({
                    ...prev,
                    cardName: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo(prev => ({
                      ...prev,
                      expiryDate: e.target.value
                    }))}
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo(prev => ({
                      ...prev,
                      cvv: e.target.value
                    }))}
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="pay-button">
                Pay ${getTotal().toFixed(2)}
              </button>
            </form>
          )}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="summary-item">
                <div className="item-info">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 