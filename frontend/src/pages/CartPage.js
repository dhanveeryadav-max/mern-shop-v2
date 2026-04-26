import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const S = {
    wrap: { maxWidth: '1100px', margin: '0 auto' },
    grid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' },
    row: { display: 'flex', alignItems: 'center', gap: '16px', background: '#16213e', borderRadius: '10px', padding: '16px', marginBottom: '12px' },
    img: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' },
    name: { color: '#fff', fontWeight: '600', flex: 1 },
    price: { color: '#e94560', fontWeight: '700', fontSize: '18px' },
    select: { background: '#0f3460', color: '#fff', border: '1px solid #333', padding: '6px', borderRadius: '6px' },
    delBtn: { background: 'none', border: 'none', color: '#e94560', cursor: 'pointer', fontSize: '20px' },
    summary: { background: '#16213e', borderRadius: '12px', padding: '24px' },
    sumTitle: { color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px' },
    sumRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#aaa' },
    total: { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #333', paddingTop: '16px', marginTop: '8px', color: '#fff', fontWeight: '700', fontSize: '20px' },
    btn: { width: '100%', background: '#e94560', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '16px', marginTop: '16px' }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <p style={{ color: '#fff', fontSize: '24px', marginBottom: '20px' }}>🛒 Your cart is empty</p>
        <Link to="/products" style={{ color: '#e94560', textDecoration: 'none', fontWeight: '600' }}>Continue Shopping →</Link>
      </div>
    );
  }

  const shipping = totalPrice > 999 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.18);

  return (
    <div style={S.wrap}>
      <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>Shopping Cart</h1>
      <div style={S.grid}>
        <div>
          {cartItems.map(item => (
            <div key={item._id} style={S.row}>
              <img src={item.image} alt={item.name} style={S.img} onError={e=>e.target.src='https://via.placeholder.com/80'} />
              <Link to={`/products/${item._id}`} style={{ ...S.name, textDecoration: 'none' }}>{item.name}</Link>
              <span style={S.price}>₹{item.price.toLocaleString()}</span>
              <select style={S.select} value={item.qty} onChange={e => updateQty(item._id, Number(e.target.value))}>
                {[...Array(10).keys()].map(x => <option key={x+1} value={x+1}>{x+1}</option>)}
              </select>
              <span style={{ color: '#888', minWidth: '80px' }}>= ₹{(item.price * item.qty).toLocaleString()}</span>
              <button style={S.delBtn} onClick={() => removeFromCart(item._id)}>🗑</button>
            </div>
          ))}
        </div>

        <div style={S.summary}>
          <div style={S.sumTitle}>Order Summary</div>
          <div style={S.sumRow}><span>Items ({cartItems.length})</span><span>₹{totalPrice.toLocaleString()}</span></div>
          <div style={S.sumRow}><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
          <div style={S.sumRow}><span>Tax (18%)</span><span>₹{tax}</span></div>
          <div style={S.total}><span>Total</span><span>₹{(totalPrice + shipping + tax).toLocaleString()}</span></div>
          <button style={S.btn} onClick={() => user ? navigate('/checkout') : navigate('/login')}>
            {user ? 'Proceed to Checkout' : 'Login to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}
