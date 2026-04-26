import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true);
    API.get(`/products?keyword=${keyword}&category=${category}&page=${page}`)
      .then(({ data }) => {
        setProducts(data.products);
        setPages(data.pages);
        setTotal(data.total);
      }).finally(() => setLoading(false));

    API.get('/products/categories').then(({ data }) => setCategories(data));
  }, [keyword, category, page]);

  const setParam = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, val); else p.delete(key);
    p.delete('page');
    setSearchParams(p);
  };

  const S = {
    wrap: { maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
    title: { color: '#fff', fontSize: '28px', fontWeight: '700' },
    filters: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    chip: (active) => ({
      background: active ? '#e94560' : '#16213e', color: active ? '#fff' : '#aaa',
      padding: '8px 16px', borderRadius: '20px', border: `1px solid ${active ? '#e94560' : '#333'}`,
      cursor: 'pointer', fontSize: '13px', fontWeight: '500'
    }),
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' },
    pagination: { display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' },
    pageBtn: (active) => ({
      background: active ? '#e94560' : '#16213e', color: '#fff',
      border: `1px solid ${active ? '#e94560' : '#333'}`, padding: '8px 16px',
      borderRadius: '6px', cursor: 'pointer', fontWeight: '600'
    })
  };

  return (
    <div style={S.wrap}>
      <div style={S.header}>
        <div>
          <h1 style={S.title}>Products</h1>
          <p style={{ color: '#888', fontSize: '14px' }}>{total} products found</p>
        </div>
        <div style={S.filters}>
          <span style={S.chip(!category)} onClick={() => setParam('category', '')}>All</span>
          {categories.map(c => (
            <span key={c} style={S.chip(category === c)} onClick={() => setParam('category', c)}>{c}</span>
          ))}
        </div>
      </div>

      {keyword && (
        <p style={{ color: '#aaa', marginBottom: '16px' }}>
          Search results for "<strong style={{ color: '#e94560' }}>{keyword}</strong>"
          <span onClick={() => setParam('keyword', '')} style={{ color: '#e94560', cursor: 'pointer', marginLeft: '10px' }}>✕ Clear</span>
        </p>
      )}

      {loading ? (
        <p style={{ color: '#aaa', textAlign: 'center', padding: '60px' }}>Loading...</p>
      ) : products.length === 0 ? (
        <p style={{ color: '#aaa', textAlign: 'center', padding: '60px' }}>No products found.</p>
      ) : (
        <div style={S.grid}>
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}

      {pages > 1 && (
        <div style={S.pagination}>
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button key={p} style={S.pageBtn(p === page)} onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('page', p);
              setSearchParams(params);
            }}>{p}</button>
          ))}
        </div>
      )}
    </div>
  );
}
