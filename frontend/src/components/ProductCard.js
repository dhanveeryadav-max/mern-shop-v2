import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const handleAdd = (e) => {
    e.preventDefault();
    if (product.countInStock === 0) return toast.error('Out of stock!');
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };
  return (
    <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
      <div style={{ background: '#16213e', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', border: '1px solid #0f3460', height: '100%', display: 'flex', flexDirection: 'column' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(233,69,96,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)'; }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} onError={e => e.target.src = 'https://via.placeholder.com/300x200?text=Product'} />
        <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#eee', fontWeight: '600', fontSize: '14px', marginBottom: '4px', lineHeight: '1.3' }}>{product.name}</div>
          <div style={{ color: '#f5a623', fontSize: '12px', marginBottom: '6px' }}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))} ({product.numReviews})</div>
          <div style={{ color: '#e94560', fontWeight: '700', fontSize: '18px', marginBottom: '6px' }}>₹{product.price.toLocaleString()}</div>
          <div style={{ fontSize: '11px', color: '#888', marginBottom: '10px' }}>{product.countInStock > 0 ? `✅ In Stock` : '❌ Out of Stock'}</div>
          <button style={{ width: '100%', background: '#e94560', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', marginTop: 'auto' }} onClick={handleAdd}>
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </Link>
  );
}
