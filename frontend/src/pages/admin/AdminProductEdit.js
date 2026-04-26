import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../utils/api';
import { toast } from 'react-toastify';

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', brand: '', countInStock: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      API.get(`/products/${id}`).then(({ data }) => {
        setForm({ name: data.name, description: data.description, price: data.price, category: data.category, brand: data.brand, countInStock: data.countInStock });
        setPreview(data.image);
      });
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append('image', image);

      if (isEdit) {
        await API.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product updated!');
      } else {
        if (!image) return toast.error('Please upload an image');
        await API.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product created!');
      }
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const S = {
    wrap: { maxWidth: '700px', margin: '0 auto' },
    card: { background: '#16213e', borderRadius: '12px', padding: '28px' },
    input: { width: '100%', background: '#0f3460', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '14px', boxSizing: 'border-box' },
    textarea: { width: '100%', background: '#0f3460', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '14px', boxSizing: 'border-box', resize: 'vertical', minHeight: '100px' },
    label: { color: '#aaa', fontSize: '13px', marginBottom: '6px', display: 'block', fontWeight: '500' },
    btn: { background: '#e94560', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '15px', marginRight: '10px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }
  };

  return (
    <div style={S.wrap}>
      <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '700', marginBottom: '24px' }}>
        {isEdit ? '✏️ Edit Product' : '➕ New Product'}
      </h1>
      <div style={S.card}>
        <label style={S.label}>Product Name</label>
        <input style={S.input} placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />

        <label style={S.label}>Description</label>
        <textarea style={S.textarea} placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />

        <div style={S.grid}>
          <div>
            <label style={S.label}>Price (₹)</label>
            <input style={S.input} type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
          </div>
          <div>
            <label style={S.label}>Stock</label>
            <input style={S.input} type="number" placeholder="Count in Stock" value={form.countInStock} onChange={e => setForm({...form, countInStock: e.target.value})} />
          </div>
          <div>
            <label style={S.label}>Category</label>
            <input style={S.input} placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
          </div>
          <div>
            <label style={S.label}>Brand</label>
            <input style={S.input} placeholder="Brand" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
          </div>
        </div>

        <label style={S.label}>Product Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ color: '#aaa', marginBottom: '14px' }} />
        {preview && <img src={preview} alt="preview" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />}

        <div>
          <button style={{ ...S.btn, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button style={{ ...S.btn, background: '#444' }} onClick={() => navigate('/admin/products')}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
