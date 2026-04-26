import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) { navigate(`/products?keyword=${search}`); setMenuOpen(false); }
  };

  const S = {
    nav: { background: '#1a1a2e', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', position: 'sticky', top: 0, zIndex: 1000 },
    logo: { color: '#e94560', fontSize: '20px', fontWeight: '800', textDecoration: 'none', whiteSpace: 'nowrap' },
    searchBox: { display: 'flex', gap: '6px', alignItems: 'center', background: '#16213e', borderRadius: '8px', padding: '6px 10px', flex: '1', maxWidth: '260px', margin: '0 12px' },
    searchInput: { background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '13px', width: '100%' },
    links: { display: 'flex', alignItems: 'center', gap: '14px', listStyle: 'none', margin: 0, padding: 0 },
    link: { color: '#ccc', textDecoration: 'none', fontSize: '13px', fontWeight: '500' },
    cartBtn: { background: '#e94560', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
    badge: { background: '#fff', color: '#e94560', borderRadius: '50%', width: '17px', height: '17px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', marginLeft: '4px' },
    mobileMenu: { position: 'fixed', top: '60px', left: 0, right: 0, bottom: 0, background: '#1a1a2e', zIndex: 999, padding: '20px 24px', display: menuOpen ? 'flex' : 'none', flexDirection: 'column', gap: '4px', overflowY: 'auto' },
    mobileLink: { color: '#ccc', textDecoration: 'none', fontSize: '17px', fontWeight: '500', padding: '14px 0', borderBottom: '1px solid #2a2a4a', display: 'block' },
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nd { display: none !important; }
          .ns { max-width: 140px !important; margin: 0 8px !important; }
          .nh { display: flex !important; }
        }
        .nh { display: none; background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; padding: 4px 8px; align-items: center; }
      `}</style>
      <nav style={S.nav}>
        <Link to="/" style={S.logo} onClick={() => setMenuOpen(false)}>🛒 ShopMERN</Link>
        <form onSubmit={handleSearch} style={S.searchBox} className="ns">
          <input style={S.searchInput} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          <button type="submit" style={{ background: 'none', border: 'none', color: '#e94560', cursor: 'pointer' }}>🔍</button>
        </form>
        <ul style={S.links} className="nd">
          <li><Link to="/products" style={S.link}>Products</Link></li>
          <li><Link to="/cart" style={{ textDecoration: 'none' }}><button style={S.cartBtn}>🛒 {totalItems > 0 && <span style={S.badge}>{totalItems}</span>}</button></Link></li>
          {user ? (
            <><li><Link to="/profile" style={S.link}>👤 {user.name.split(' ')[0]}</Link></li>
            <li><Link to="/orders" style={S.link}>Orders</Link></li>
            {user.isAdmin && <li><Link to="/admin" style={{ ...S.link, color: '#e94560' }}>Admin</Link></li>}
            <li><button onClick={logout} style={{ ...S.cartBtn, background: '#555' }}>Logout</button></li></>
          ) : (
            <><li><Link to="/login" style={S.link}>Login</Link></li>
            <li><Link to="/register" style={{ ...S.cartBtn, textDecoration: 'none', padding: '8px 14px', borderRadius: '6px', display: 'inline-block' }}>Register</Link></li></>
          )}
        </ul>
        <button className="nh" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '✕' : '☰'}</button>
      </nav>
      <div style={S.mobileMenu}>
        <Link to="/products" style={S.mobileLink} onClick={() => setMenuOpen(false)}>🛍️ All Products</Link>
        <Link to="/cart" style={S.mobileLink} onClick={() => setMenuOpen(false)}>🛒 Cart {totalItems > 0 && `(${totalItems})`}</Link>
        {user ? (
          <><Link to="/profile" style={S.mobileLink} onClick={() => setMenuOpen(false)}>👤 My Profile</Link>
          <Link to="/orders" style={S.mobileLink} onClick={() => setMenuOpen(false)}>📦 My Orders</Link>
          {user.isAdmin && <Link to="/admin" style={{ ...S.mobileLink, color: '#e94560' }} onClick={() => setMenuOpen(false)}>⚙️ Admin Panel</Link>}
          <button onClick={() => { logout(); setMenuOpen(false); }} style={{ ...S.cartBtn, marginTop: '16px', width: '100%', padding: '14px', borderRadius: '8px', fontSize: '16px' }}>Logout</button></>
        ) : (
          <><Link to="/login" style={S.mobileLink} onClick={() => setMenuOpen(false)}>🔑 Login</Link>
          <Link to="/register" style={{ ...S.mobileLink, color: '#e94560' }} onClick={() => setMenuOpen(false)}>✨ Create Account</Link></>
        )}
      </div>
    </>
  );
}
