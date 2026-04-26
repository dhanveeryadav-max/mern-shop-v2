import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import { toast } from 'react-toastify';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProducts = () => {
    API.get(`/products?page=${page}`).then(({ data }) => {
      setProducts(data.products);
      setPages(data.pages);
    });
  };

  useEffect(fetchProducts, [page]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch { toast.error('Delete failed'); }
  };

  const S = {
    wrap: { maxWidth: '1200px', margin: '0 auto' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { background: '#0f3460', color: '#aaa', padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600' },
    td: { padding: '14px 12px', borderBottom: '1px solid #1e2a4a', color: '#ddd', fontSize: '14px' },
    img: { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' },
    editBtn: { background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', marginRight: '6px' },
    delBtn: { background: '#e94560', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }
  };

  return (
    <div style={S.wrap}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '700' }}>Products</h1>
        <Link to="/admin/products/new" style={{ background: '#e94560', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700' }}>
          ➕ Add Product
        </Link>
      </div>

      <div style={{ background: '#16213e', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Image</th>
              <th style={S.th}>Name</th>
              <th style={S.th}>Price</th>
              <th style={S.th}>Category</th>
              <th style={S.th}>Stock</th>
              <th style={S.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td style={S.td}><img src={p.image} alt={p.name} style={S.img} onError={e=>e.target.src='https://via.placeholder.com/50'} /></td>
                <td style={S.td}>{p.name}</td>
                <td style={{ ...S.td, color: '#e94560', fontWeight: '600' }}>₹{p.price.toLocaleString()}</td>
                <td style={S.td}>{p.category}</td>
                <td style={{ ...S.td, color: p.countInStock > 0 ? '#4ade80' : '#f87171' }}>{p.countInStock}</td>
                <td style={S.td}>
                  <Link to={`/admin/products/${p._id}/edit`}><button style={S.editBtn}>Edit</button></Link>
                  <button style={S.delBtn} onClick={() => handleDelete(p._id, p.name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
          {Array.from({ length: pages }, (_, i) => i+1).map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              background: p === page ? '#e94560' : '#16213e', color: '#fff', border: '1px solid #333',
              padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'
            }}>{p}</button>
          ))}
        </div>
      )}
    </div>
  );
}
