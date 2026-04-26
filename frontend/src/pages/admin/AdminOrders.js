import React, { useEffect, useState } from 'react';
import API from '../../utils/api';
import { toast } from 'react-toastify';

const statusColors = {
  Pending: '#fbbf24', Processing: '#60a5fa', Shipped: '#a78bfa',
  Delivered: '#4ade80', Cancelled: '#f87171'
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders').then(({ data }) => setOrders(data));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await API.put(`/orders/${id}/status`, { status });
      setOrders(orders.map(o => o._id === id ? data : o));
      toast.success(`Status updated to ${status}`);
    } catch { toast.error('Update failed'); }
  };

  const S = {
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { background: '#0f3460', color: '#aaa', padding: '12px', textAlign: 'left', fontSize: '13px' },
    td: { padding: '14px 12px', borderBottom: '1px solid #1e2a4a', color: '#ddd', fontSize: '14px' },
    select: { background: '#0f3460', color: '#fff', border: '1px solid #333', padding: '6px 10px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '700', marginBottom: '24px' }}>All Orders ({orders.length})</h1>
      <div style={{ background: '#16213e', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Order ID</th>
              <th style={S.th}>Customer</th>
              <th style={S.th}>Total</th>
              <th style={S.th}>Date</th>
              <th style={S.th}>Payment</th>
              <th style={S.th}>Status</th>
              <th style={S.th}>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td style={S.td}><span style={{ color: '#e94560', fontWeight: '600' }}>#{o._id.slice(-6).toUpperCase()}</span></td>
                <td style={S.td}>{o.user?.name || 'N/A'}<br /><span style={{ color: '#666', fontSize: '12px' }}>{o.user?.email}</span></td>
                <td style={{ ...S.td, fontWeight: '600' }}>₹{o.totalPrice.toLocaleString()}</td>
                <td style={S.td}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                <td style={S.td}>
                  <span style={{ color: o.isPaid ? '#4ade80' : '#f87171' }}>
                    {o.isPaid ? '✅ Paid' : '❌ Unpaid'} ({o.paymentMethod})
                  </span>
                </td>
                <td style={S.td}>
                  <span style={{ color: statusColors[o.status], fontWeight: '600' }}>{o.status}</span>
                </td>
                <td style={S.td}>
                  <select style={S.select} value={o.status} onChange={e => updateStatus(o._id, e.target.value)}>
                    {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
