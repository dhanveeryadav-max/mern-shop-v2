import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../utils/api';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ address: '', city: '', state: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  const shipping = totalPrice > 999 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.18);
  const total = totalPrice + shipping + tax;

  const S = {
    wrap: { maxWidth: '700px', margin: '0 auto' },
    card: { background: '#16213e', borderRadius: '12px', padding: '28px', marginBottom: '20px' },
    title: { color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px' },
    input: { width: '100%', background: '#0f3460', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box' },
    btn: { background: '#e94560', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' },
    row: { display: 'flex', justifyContent: 'space-between', color: '#aaa', marginBottom: '10px' },
    label: { display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', cursor: 'pointer', marginBottom: '12px' }
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const orderItems = cartItems.map(i => ({ name: i.name, qty: i.qty, image: i.image, price: i.price, product: i._id }));
      const { data } = await API.post('/orders', {
        orderItems, shippingAddress: address, paymentMethod,
        itemsPrice: totalPrice, shippingPrice: shipping, taxPrice: tax, totalPrice: total
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/orders/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.wrap}>
      <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>Checkout</h1>

      {/* Steps indicator */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        {['Shipping', 'Payment', 'Review'].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontWeight: '700', fontSize: '13px',
              background: step > i ? '#e94560' : step === i+1 ? '#e94560' : '#333',
              color: '#fff'
            }}>{i+1}</div>
            <span style={{ color: step >= i+1 ? '#fff' : '#666', fontSize: '14px' }}>{s}</span>
            {i < 2 && <span style={{ color: '#444' }}>→</span>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={S.card}>
          <div style={S.title}>📍 Shipping Address</div>
          <input style={S.input} placeholder="Full Address" value={address.address} onChange={e => setAddress({...address, address: e.target.value})} />
          <input style={S.input} placeholder="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
          <input style={S.input} placeholder="State" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
          <input style={S.input} placeholder="Pincode" value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} />
          <button style={S.btn} onClick={() => { if (Object.values(address).every(v => v)) setStep(2); else toast.error('Fill all fields'); }}>
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={S.card}>
          <div style={S.title}>💳 Payment Method</div>
          {['COD', 'UPI', 'Card', 'Net Banking'].map(m => (
            <label key={m} style={S.label}>
              <input type="radio" name="payment" value={m} checked={paymentMethod === m} onChange={e => setPaymentMethod(e.target.value)} />
              {m === 'COD' ? '💵 Cash on Delivery' : m === 'UPI' ? '📱 UPI Payment' : m === 'Card' ? '💳 Credit/Debit Card' : '🏦 Net Banking'}
            </label>
          ))}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ ...S.btn, background: '#444' }} onClick={() => setStep(1)}>← Back</button>
            <button style={S.btn} onClick={() => setStep(3)}>Continue →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={S.card}>
            <div style={S.title}>📋 Order Review</div>
            {cartItems.map(item => (
              <div key={item._id} style={{ ...S.row, alignItems: 'center' }}>
                <span>{item.name} × {item.qty}</span>
                <span style={{ color: '#fff' }}>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #333', paddingTop: '12px', marginTop: '8px' }}>
              <div style={S.row}><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
              <div style={S.row}><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
              <div style={S.row}><span>Tax (18%)</span><span>₹{tax}</span></div>
              <div style={{ ...S.row, color: '#fff', fontWeight: '700', fontSize: '18px' }}>
                <span>Total</span><span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ ...S.btn, background: '#444' }} onClick={() => setStep(2)}>← Back</button>
            <button style={{ ...S.btn, flex: 1, opacity: loading ? 0.7 : 1 }} onClick={placeOrder} disabled={loading}>
              {loading ? 'Placing Order...' : '✅ Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
