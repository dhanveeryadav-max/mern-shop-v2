import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    API.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success('Added to cart!');
  };

  const handleReview = async () => {
    try {
      await API.post(`/products/${id}/reviews`, { rating, comment });
      toast.success('Review submitted!');
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      setComment('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  if (!product) return <p style={{ color: '#aaa', textAlign: 'center', padding: '60px' }}>Loading...</p>;

  const S = {
    wrap: { maxWidth: '1100px', margin: '0 auto' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' },
    img: { width: '100%', borderRadius: '12px', maxHeight: '450px', objectFit: 'cover' },
    infoBox: { background: '#16213e', borderRadius: '12px', padding: '28px' },
    name: { color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '12px' },
    price: { color: '#e94560', fontSize: '32px', fontWeight: '800', marginBottom: '16px' },
    desc: { color: '#aaa', lineHeight: '1.6', marginBottom: '20px' },
    label: { color: '#888', fontSize: '13px', marginBottom: '4px' },
    select: { background: '#0f3460', color: '#fff', border: '1px solid #333', padding: '8px 12px', borderRadius: '6px', fontSize: '15px', marginBottom: '16px' },
    btn: { background: '#e94560', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '16px', width: '100%' },
    reviewCard: { background: '#16213e', borderRadius: '8px', padding: '16px', marginBottom: '12px' },
    reviewInput: { width: '100%', background: '#16213e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '10px', resize: 'vertical', minHeight: '80px', boxSizing: 'border-box' }
  };

  return (
    <div style={S.wrap}>
      <div style={S.grid}>
        <img src={product.image} alt={product.name} style={S.img} onError={e => e.target.src='https://via.placeholder.com/500x450?text=Product'} />
        <div style={S.infoBox}>
          <h1 style={S.name}>{product.name}</h1>
          <p style={{ color: '#f5a623', marginBottom: '10px' }}>
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5-Math.round(product.rating))} ({product.numReviews} reviews)
          </p>
          <div style={S.price}>₹{product.price.toLocaleString()}</div>
          <p style={S.desc}>{product.description}</p>
          <p style={{ color: '#aaa', marginBottom: '8px' }}>Brand: <strong style={{ color: '#fff' }}>{product.brand}</strong></p>
          <p style={{ color: '#aaa', marginBottom: '16px' }}>Category: <strong style={{ color: '#fff' }}>{product.category}</strong></p>

          {product.countInStock > 0 ? (
            <>
              <div style={S.label}>Quantity:</div>
              <select style={S.select} value={qty} onChange={e => setQty(Number(e.target.value))}>
                {[...Array(Math.min(product.countInStock, 10)).keys()].map(x => (
                  <option key={x+1} value={x+1}>{x+1}</option>
                ))}
              </select>
              <button style={S.btn} onClick={handleAddToCart}>🛒 Add to Cart</button>
            </>
          ) : (
            <div style={{ ...S.btn, background: '#444', textAlign: 'center', cursor: 'not-allowed' }}>Out of Stock</div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>Customer Reviews</h2>
        {product.reviews.length === 0 && <p style={{ color: '#888' }}>No reviews yet.</p>}
        {product.reviews.map((r, i) => (
          <div key={i} style={S.reviewCard}>
            <strong style={{ color: '#fff' }}>{r.name}</strong>
            <span style={{ color: '#f5a623', marginLeft: '10px' }}>{'★'.repeat(r.rating)}</span>
            <p style={{ color: '#aaa', marginTop: '6px', marginBottom: 0 }}>{r.comment}</p>
          </div>
        ))}

        {user && (
          <div style={{ background: '#16213e', borderRadius: '12px', padding: '20px', marginTop: '20px' }}>
            <h3 style={{ color: '#fff', marginBottom: '16px' }}>Write a Review</h3>
            <div style={S.label}>Rating:</div>
            <select style={{ ...S.select, marginBottom: '12px' }} value={rating} onChange={e => setRating(Number(e.target.value))}>
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ★</option>)}
            </select>
            <textarea style={S.reviewInput} placeholder="Write your review..." value={comment} onChange={e => setComment(e.target.value)} />
            <button style={{ ...S.btn, width: 'auto', padding: '10px 24px' }} onClick={handleReview}>Submit Review</button>
          </div>
        )}
      </div>
    </div>
  );
}
