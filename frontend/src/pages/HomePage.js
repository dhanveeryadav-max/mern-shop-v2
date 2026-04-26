import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

const S = {
  page: { maxWidth: '1200px', margin: '0 auto', padding: '16px' },
  hero: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '60px 24px', textAlign: 'center', borderRadius: '16px', marginBottom: '32px'
  },
  heroTitle: { color: '#fff', fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: '800', marginBottom: '12px', lineHeight: 1.1 },
  heroSub: { color: '#aaa', fontSize: 'clamp(14px, 3vw, 18px)', marginBottom: '24px', lineHeight: 1.5 },
  cta: { background: '#e94560', color: '#fff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '15px', display: 'inline-block' },
  badges: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' },
  badge: { background: 'rgba(255,255,255,0.1)', color: '#ccc', padding: '6px 14px', borderRadius: '20px', fontSize: '12px' },
  secTitle: { color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '16px', borderLeft: '4px solid #e94560', paddingLeft: '12px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' },
  catChip: (active) => ({ background: active ? '#e94560' : '#16213e', color: active ? '#fff' : '#aaa', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontWeight: '600', border: `1px solid ${active ? '#e94560' : '#333'}`, fontSize: '13px', display: 'inline-block' }),
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([API.get('/products?page=1'), API.get('/products/categories')])
      .then(([p, c]) => { setProducts(p.data.products); setCategories(c.data); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={S.page}>
      <div style={S.hero}>
        <h1 style={S.heroTitle}>🛒 ShopMERN</h1>
        <p style={S.heroSub}>Best products at best prices.<br />Fast delivery across India 🇮🇳</p>
        <Link to="/products" style={S.cta}>Shop Now →</Link>
        <div style={S.badges}>
          <span style={S.badge}>🚚 Free Shipping ₹999+</span>
          <span style={S.badge}>🔒 Secure Payment</span>
          <span style={S.badge}>↩️ 30-Day Returns</span>
        </div>
      </div>

      {categories.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={S.secTitle}>Categories</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map(cat => <Link key={cat} to={`/products?category=${cat}`} style={S.catChip(false)}>{cat}</Link>)}
          </div>
        </div>
      )}

      <div style={{ marginBottom: '32px' }}>
        <h2 style={S.secTitle}>Featured Products</h2>
        {loading ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '40px' }}>Loading...</p>
        ) : (
          <div style={S.grid}>
            {products.slice(0, 8).map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/products" style={S.cta}>View All Products →</Link>
        </div>
      </div>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[['🚚', 'Free Delivery', '₹999+ orders'], ['🔒', 'Secure Pay', 'UPI / Cards / COD'], ['↩️', 'Easy Return', '30 days policy'], ['💬', '24/7 Support', 'Always here']].map(([icon, title, sub]) => (
          <div key={title} style={{ background: '#16213e', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '1px solid #0f3460' }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>{icon}</div>
            <div style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>{title}</div>
            <div style={{ color: '#888', fontSize: '11px', marginTop: '2px' }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
