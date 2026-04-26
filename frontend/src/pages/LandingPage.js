import React, { useState } from 'react';

// ✅ Google Sheets Script URL — apna Apps Script URL yahan paste karein
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycda8VwxbGTbLi1uX0N5HVsqCGNNHCCYObp9WTOQRKdiP-cicjS1WhhgCfU8crvbbdLQ/exec';

const packages = [
  { name: 'Starter', price: '₹4,999', orig: '₹9,999', desc: '5 Page Static Website', features: ['Responsive Design', 'Contact Form', 'WhatsApp Button', 'Google Maps', '1 Month Support'], color: '#16213e', badge: '' },
  { name: 'Business', price: '₹12,999', orig: '₹24,999', desc: 'Full E-Commerce Website', features: ['Everything in Starter', 'Product Catalog', 'Admin Dashboard', 'Cart & Checkout', 'Order Management', '3 Month Support'], color: '#0f3460', badge: '⭐ Most Popular' },
  { name: 'Premium', price: '₹24,999', orig: '₹49,999', desc: 'Custom MERN Stack App', features: ['Everything in Business', 'User Authentication', 'Payment Gateway', 'Mobile App Ready API', 'Custom Features', '6 Month Support'], color: '#1a1a2e', badge: '' },
];

const testimonials = [
  { name: 'Rajesh Kumar', city: 'Mumbai', text: 'A website was created for my clothing store — sales increased by 40% in the first month!', stars: 5, avatar: 'R', bg: '#e94560' },
  { name: 'Priya Sharma', city: 'Pune', text: 'Very professional work. The website runs perfectly on mobile too. Highly recommended!', stars: 5, avatar: 'P', bg: '#0f3460' },
  { name: 'Amit Patel', city: 'Surat', text: 'I can add products myself through the admin panel. It is very easy to use. Thank you!', stars: 5, avatar: 'A', bg: '#16213e' },
];

export default function LandingPage() {
  const [form, setForm] = useState({ name: '', mobile: '', city: '', businessType: '', requirement: '', budget: '' });
  const [status, setStatus] = useState('idle');
  const [activePackage, setActivePackage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile) return alert('Name aur Mobile number zaroori hai!');
    setStatus('loading');
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toLocaleString('hi-IN'), source: 'Landing Page' }),
      });
      setStatus('success');
      setForm({ name: '', mobile: '', city: '', businessType: '', requirement: '', budget: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = { width: '100%', padding: '12px 14px', background: '#16213e', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { color: '#aaa', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' };

  return (
    <div style={{ background: '#0d0d1a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>

      {/* NAV */}
      <nav style={{ background: '#1a1a2e', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ color: '#e94560', fontWeight: '800', fontSize: '20px' }}>🛒 ShopMERN</div>
        <a href="#contact" style={{ background: '#e94560', color: '#fff', padding: '8px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: '700', fontSize: '13px' }}>Free Quote लें →</a>
      </nav>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', padding: 'clamp(40px,8vw,80px) 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(233,69,96,0.15)', color: '#e94560', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '16px' }}>
          🇮🇳 Made for Indian Businesses
        </div>
        <h1 style={{ color: '#fff', fontSize: 'clamp(26px, 6vw, 56px)', fontWeight: '800', lineHeight: 1.1, marginBottom: '16px' }}>
          Apne Business ke liye<br /><span style={{ color: '#e94560' }}>Professional Website</span><br />Sirf ₹4,999 mein!
        </h1>
        <p style={{ color: '#aaa', fontSize: 'clamp(14px, 3vw, 18px)', marginBottom: '28px', lineHeight: 1.6 }}>
          E-Commerce, Admin Panel, Mobile Friendly — Poora Setup.<br />14 din mein ready. 3 saal tak support.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          <a href="#contact" style={{ background: '#e94560', color: '#fff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>Free Consultation Book Karein</a>
          <a href="#demo" style={{ background: 'transparent', color: '#e94560', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '15px', border: '2px solid #e94560' }}>Live Demo Dekhein</a>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['✅ 50+ Websites Delivered', '⚡ 14 Days Delivery', '🔧 Free Maintenance 3 Months'].map(b => (
            <span key={b} style={{ color: '#ccc', fontSize: '13px' }}>{b}</span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px 40px' }}>
        <h2 style={{ color: '#fff', textAlign: 'center', fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: '800', marginBottom: '8px' }}>Kyun Choose Karein Humein?</h2>
        <p style={{ color: '#888', textAlign: 'center', marginBottom: '36px', fontSize: '14px' }}>India ke 50+ businesses humpe bharosa karte hain</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            ['🚀', 'Fast Delivery', '14 working days mein website ready. Koi delay nahi.'],
            ['📱', 'Mobile First', 'Har mobile, tablet, desktop pe perfectly kaam karta hai.'],
            ['🔒', 'Secure & Fast', 'SSL certificate, fast loading, Google friendly.'],
            ['💰', 'Affordable', 'Market se 60% sasta. No hidden charges. EMI available.'],
            ['🛠️', 'Easy to Use', 'Khud manage karo — admin panel se products, orders sab.'],
            ['📞', 'Lifetime Support', 'WhatsApp pe turant help milegi. Kabhi bhi contact karein.'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
              <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px', marginBottom: '6px' }}>{title}</div>
              <div style={{ color: '#888', fontSize: '12px', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PACKAGES */}
      <div style={{ background: '#111122', padding: '60px 20px' }} id="packages">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ color: '#fff', textAlign: 'center', fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: '800', marginBottom: '8px' }}>Packages & Pricing</h2>
          <p style={{ color: '#888', textAlign: 'center', marginBottom: '36px', fontSize: '14px' }}>🎉 Launch Offer — Limited Time Only</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {packages.map((pkg, i) => (
              <div key={i} onClick={() => setActivePackage(i)} style={{ background: pkg.color, border: `2px solid ${activePackage === i ? '#e94560' : '#2a2a4a'}`, borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}>
                {pkg.badge && <div style={{ background: '#e94560', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '4px 12px', position: 'absolute', top: '16px', right: '-28px', transform: 'rotate(45deg)', width: '120px', textAlign: 'center' }}>{pkg.badge}</div>}
                <div style={{ color: '#aaa', fontSize: '12px', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{pkg.name}</div>
                <div style={{ color: '#fff', fontSize: '28px', fontWeight: '800' }}>{pkg.price}</div>
                <div style={{ color: '#666', fontSize: '13px', textDecoration: 'line-through', marginBottom: '4px' }}>{pkg.orig}</div>
                <div style={{ color: '#e94560', fontSize: '12px', fontWeight: '600', marginBottom: '16px' }}>{pkg.desc}</div>
                <div style={{ borderTop: '1px solid #2a2a4a', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {pkg.features.map(f => <div key={f} style={{ color: '#ccc', fontSize: '13px' }}>✅ {f}</div>)}
                </div>
                <a href="#contact" style={{ display: 'block', background: '#e94560', color: '#fff', textAlign: 'center', padding: '12px', borderRadius: '8px', marginTop: '20px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
                  Abhi Enquiry Karein →
                </a>
              </div>
            ))}
          </div>
          <p style={{ color: '#888', textAlign: 'center', fontSize: '12px', marginTop: '16px' }}>💬 Custom requirements? Alag quote milega. Contact karein!</p>
        </div>
      </div>

      {/* DEMO */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }} id="demo">
        <h2 style={{ color: '#fff', textAlign: 'center', fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: '800', marginBottom: '36px' }}>Live Demo Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {['🛍️ Product Listing', '🔍 Search & Filter', '🛒 Cart & Wishlist', '💳 Secure Checkout', '📦 Order Tracking', '⭐ Reviews System', '👤 User Dashboard', '⚙️ Admin Panel', '📊 Sales Reports', '📱 Mobile App Ready'].map(f => (
            <div key={f} style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '10px', padding: '14px 16px', color: '#ccc', fontSize: '13px', fontWeight: '500' }}>{f}</div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: '#111122', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ color: '#fff', textAlign: 'center', fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: '800', marginBottom: '36px' }}>Happy Customers ❤️</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px' }}>
                <div style={{ color: '#f5a623', fontSize: '14px', marginBottom: '10px' }}>{'★'.repeat(t.stars)}</div>
                <p style={{ color: '#ccc', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '15px' }}>{t.avatar}</div>
                  <div><div style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>{t.name}</div><div style={{ color: '#888', fontSize: '11px' }}>{t.city}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEAD CAPTURE FORM */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '60px 20px' }} id="contact">
        <div style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '16px', padding: 'clamp(24px, 5vw, 40px)' }}>
          <h2 style={{ color: '#fff', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>
            Get Your Custom Business Website Started Today
          </h2>
          <p style={{ color: '#888', textAlign: 'center', fontSize: '13px', marginBottom: '28px' }}>
            Aap form bharein — hum 2 ghante mein WhatsApp pe call karenge 📞
          </p>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '50px', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Thank You!</h3>
              <p style={{ color: '#aaa', fontSize: '14px' }}>Aapki enquiry receive ho gayi.<br />Hum 2 ghante mein WhatsApp pe contact karenge!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Aapka Naam *</label>
                  <input style={inputStyle} placeholder="Ex: Rahul Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div>
                  <label style={labelStyle}>Mobile Number *</label>
                  <input style={inputStyle} placeholder="10 digit number" type="tel" maxLength="10" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Aapka Shehar</label>
                  <input style={inputStyle} placeholder="Ex: Mumbai" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Business Type</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.businessType} onChange={e => setForm({...form, businessType: e.target.value})}>
                    <option value="">Select karein</option>
                    <option>Kapde / Fashion</option>
                    <option>Electronics</option>
                    <option>Food / Restaurant</option>
                    <option>Education / Coaching</option>
                    <option>Medical / Pharmacy</option>
                    <option>Real Estate</option>
                    <option>Service Business</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Website mein kya chahiye?</label>
                <textarea style={{ ...inputStyle, height: '80px', resize: 'vertical' }} placeholder="Ex: E-commerce site chahiye, 50 products hain, payment gateway chahiye..." value={form.requirement} onChange={e => setForm({...form, requirement: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Approximate Budget</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}>
                  <option value="">Select karein</option>
                  <option>₹5,000 – ₹10,000</option>
                  <option>₹10,000 – ₹20,000</option>
                  <option>₹20,000 – ₹50,000</option>
                  <option>₹50,000+</option>
                  <option>Discuss karna hai</option>
                </select>
              </div>
              <button type="submit" disabled={status === 'loading'} style={{ background: status === 'loading' ? '#888' : '#e94560', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', cursor: status === 'loading' ? 'not-allowed' : 'pointer', width: '100%' }}>
                {status === 'loading' ? '⏳ Submitted Successfully! Our team will contact you soon.' : 'Get Your Free Website Quote'}
              </button>
              <p style={{ color: '#666', textAlign: 'center', fontSize: '12px' }}>
                🔒 Your details are 100% safe. We will never spam you.
              </p>
            </form>
          )}
        </div>

        {/* WhatsApp Button */}
        <a href="https://wa.me/918104969906?text=Hello%20bhai,%20website%20banwani%20hai!" target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#25D366', color: '#fff', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '15px', marginTop: '12px' }}>
          💬 WhatsApp pe Direct Message Karein
        </a>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#111122', borderTop: '1px solid #2a2a4a', padding: '24px 20px', textAlign: 'center' }}>
        <div style={{ color: '#e94560', fontWeight: '800', fontSize: '18px', marginBottom: '8px' }}>🛒 ShopMERN</div>
        <p style={{ color: '#666', fontSize: '12px' }}>Professional Web Development | Made with ❤️ in India</p>
        <p style={{ color: '#555', fontSize: '11px', marginTop: '8px' }}>© 2025 ShopMERN. All rights reserved.</p>
      </div>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/918104969906?text=Hello,%20website%20ke%20baare%20mein%20baat%20karni%20hai!" target="_blank" rel="noreferrer"
        style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#25D366', color: '#fff', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', boxShadow: '0 4px 20px rgba(37,211,102,0.4)', textDecoration: 'none', zIndex: 9999 }}>
        💬
      </a>
    </div>
  );
}
