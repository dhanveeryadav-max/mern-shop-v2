import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { toast } from 'react-toastify';

const S = {
  wrap: { maxWidth: '900px', margin: '0 auto' },
  card: { background: '#16213e', borderRadius: '12px', padding: '28px', marginBottom: '24px' },
  title: { color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '20px' },
  input: { width: '100%', background: '#0f3460', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box' },
  btn: { background: '#e94560', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' },
  badge: (status) => ({
    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
    background: status === 'Delivered' ? '#1a4a2e' : status === 'Cancelled' ? '#4a1a1a' : status === 'Shipped' ? '#1a3a4a' : '#2a2a1a',
    color: status === 'Delivered' ? '#4ade80' : status === 'Cancelled' ? '#f87171' : status === 'Shipped' ? '#60a5fa' : '#fbbf24'
  })
};

export function ProfilePage() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });

  const handleSave = async () => {
    try {
      const { data } = await API.put('/auth/profile', form);
      login({ ...data, token: user.token });
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div style={S.wrap}>
      <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>My Profile</h1>
      <div style={S.card}>
        <div style={S.title}>Personal Info</div>
        <input style={S.input} placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input style={S.input} type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input style={S.input} type="password" placeholder="New Password (leave blank to keep)" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button style={S.btn} onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}

export function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders/myorders').then(({ data }) => setOrders(data));
  }, []);

  return (
    <div style={S.wrap}>
      <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>My Orders</h1>
      {orders.length === 0 ? (
        <p style={{ color: '#aaa', textAlign: 'center', padding: '40px' }}>No orders yet. <Link to="/products" style={{ color: '#e94560' }}>Start Shopping!</Link></p>
      ) : orders.map(order => (
        <div key={order._id} style={S.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ color: '#888', fontSize: '13px' }}>Order #{order._id.slice(-8).toUpperCase()}</div>
              <div style={{ color: '#fff', fontWeight: '600', marginTop: '4px' }}>₹{order.totalPrice.toLocaleString()}</div>
              <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>{new Date(order.createdAt).toLocaleDateString('en-IN')}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={S.badge(order.status)}>{order.status}</span>
              <Link to={`/orders/${order._id}`} style={{ color: '#e94560', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>View →</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrderDetailPage() {
  const { id } = require('react-router-dom').useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    API.get(`/orders/${id}`).then(({ data }) => setOrder(data));
  }, [id]);

  if (!order) return <p style={{ color: '#aaa', textAlign: 'center', padding: '60px' }}>Loading...</p>;

  return (
    <div style={S.wrap}>
      <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
        Order #{order._id.slice(-8).toUpperCase()}
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <div style={S.card}>
            <div style={S.title}>📦 Items</div>
            {order.orderItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #333', color: '#aaa' }}>
                <span>{item.name} × {item.qty}</span>
                <span style={{ color: '#fff' }}>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={S.card}>
            <div style={S.title}>📍 Shipping Address</div>
            <p style={{ color: '#aaa' }}>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
          </div>
        </div>
        <div style={S.card}>
          <div style={S.title}>Summary</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', marginBottom: '8px' }}><span>Items</span><span>₹{order.itemsPrice}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', marginBottom: '8px' }}><span>Shipping</span><span>₹{order.shippingPrice}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', marginBottom: '16px' }}><span>Tax</span><span>₹{order.taxPrice}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: '700', fontSize: '18px', borderTop: '1px solid #333', paddingTop: '12px' }}>
            <span>Total</span><span>₹{order.totalPrice}</span>
          </div>
          <div style={{ marginTop: '16px', padding: '10px', background: '#0f3460', borderRadius: '8px', textAlign: 'center' }}>
            <span style={S.badge(order.status)}>{order.status}</span>
          </div>
          <p style={{ color: '#aaa', fontSize: '13px', marginTop: '10px' }}>Payment: {order.paymentMethod}</p>
        </div>
      </div>
    </div>
  );
}
