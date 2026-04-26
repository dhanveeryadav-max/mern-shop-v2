import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const formStyle = {
  wrap: { maxWidth: '420px', margin: '40px auto' },
  card: { background: '#16213e', borderRadius: '16px', padding: '36px', boxShadow: '0 8px 30px rgba(0,0,0,0.4)' },
  title: { color: '#fff', fontSize: '26px', fontWeight: '700', marginBottom: '28px', textAlign: 'center' },
  input: { width: '100%', background: '#0f3460', border: '1px solid #333', color: '#fff', padding: '12px 14px', borderRadius: '8px', fontSize: '15px', marginBottom: '14px', boxSizing: 'border-box', outline: 'none' },
  btn: { width: '100%', background: '#e94560', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '16px' },
  link: { color: '#e94560', textDecoration: 'none', fontWeight: '600' },
  footer: { textAlign: 'center', marginTop: '18px', color: '#888', fontSize: '14px' }
};

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate(data.isAdmin ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={formStyle.wrap}>
      <div style={formStyle.card}>
        <div style={formStyle.title}>🔐 Login</div>
        <input style={formStyle.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={formStyle.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button style={{ ...formStyle.btn, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={formStyle.footer}>
          New user? <Link to="/register" style={formStyle.link}>Register here</Link>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', { name: form.name, email: form.email, password: form.password });
      login(data);
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={formStyle.wrap}>
      <div style={formStyle.card}>
        <div style={formStyle.title}>📝 Register</div>
        {['name', 'email', 'password', 'confirm'].map(field => (
          <input key={field} style={formStyle.input}
            type={field === 'password' || field === 'confirm' ? 'password' : field === 'email' ? 'email' : 'text'}
            placeholder={field === 'confirm' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        <button style={{ ...formStyle.btn, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
        <div style={formStyle.footer}>
          Already have an account? <Link to="/login" style={formStyle.link}>Login</Link>
        </div>
      </div>
    </div>
  );
}
