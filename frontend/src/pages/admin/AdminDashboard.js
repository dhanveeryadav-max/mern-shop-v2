import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });

  useEffect(() => {
    Promise.all([
      API.get('/products'),
      API.get('/orders'),
      API.get('/users')
    ]).then(([p, o, u]) => {
      const revenue = o.data.reduce((acc, ord) => acc + (ord.isPaid ? ord.totalPrice : 0), 0);
      setStats({ products: p.data.total, orders: o.data.length, users: u.data.length, revenue });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Total Products', value: stats.products, icon: '📦', link: '/admin/products', color: '#e94560' },
    { label: 'Total Orders', value: stats.orders, icon: '🧾', link: '/admin/orders', color: '#3b82f6' },
    { label: 'Total Users', value: stats.users, icon: '👥', link: '/admin/users', color: '#10b981' },
    { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: '💰', link: '/admin/orders', color: '#f59e0b' },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Admin Dashboard</h1>
      <p style={{ color: '#888', marginBottom: '30px' }}>Welcome back, Admin!</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {cards.map(c => (
          <Link key={c.label} to={c.link} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#16213e', borderRadius: '12px', padding: '24px', borderLeft: `4px solid ${c.color}`, transition: 'transform 0.2s' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{c.icon}</div>
              <div style={{ color: c.color, fontSize: '28px', fontWeight: '800', marginBottom: '6px' }}>{c.value}</div>
              <div style={{ color: '#888', fontSize: '14px' }}>{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { to: '/admin/products', label: '➕ Add Product', color: '#e94560' },
          { to: '/admin/orders', label: '📋 Manage Orders', color: '#3b82f6' },
          { to: '/admin/users', label: '👥 Manage Users', color: '#10b981' },
        ].map(b => (
          <Link key={b.to} to={b.to} style={{
            background: b.color, color: '#fff', padding: '16px', borderRadius: '10px',
            textDecoration: 'none', fontWeight: '700', textAlign: 'center', fontSize: '15px'
          }}>{b.label}</Link>
        ))}
      </div>
    </div>
  );
}
