import React, { useEffect, useState } from 'react';
import API from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    API.get('/users').then(({ data }) => setUsers(data));
  }, []);

  const handleDelete = async (id, name) => {
    if (id === currentUser._id) return toast.error("Can't delete yourself!");
    if (!window.confirm(`Delete user "${name}"?`)) return;
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.success('User deleted');
    } catch { toast.error('Delete failed'); }
  };

  const toggleAdmin = async (id) => {
    try {
      const { data } = await API.put(`/users/${id}/admin`);
      setUsers(users.map(u => u._id === id ? { ...u, isAdmin: !u.isAdmin } : u));
      toast.success(data.message);
    } catch { toast.error('Failed'); }
  };

  const S = {
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { background: '#0f3460', color: '#aaa', padding: '12px', textAlign: 'left', fontSize: '13px' },
    td: { padding: '14px 12px', borderBottom: '1px solid #1e2a4a', color: '#ddd', fontSize: '14px' },
    adminToggle: (isAdmin) => ({
      background: isAdmin ? '#1a4a2e' : '#2a1a2e', color: isAdmin ? '#4ade80' : '#c084fc',
      border: 'none', padding: '6px 14px', borderRadius: '16px', cursor: 'pointer', fontWeight: '600', fontSize: '13px'
    }),
    delBtn: { background: '#e94560', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '700', marginBottom: '24px' }}>Users ({users.length})</h1>
      <div style={{ background: '#16213e', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Name</th>
              <th style={S.th}>Email</th>
              <th style={S.th}>Joined</th>
              <th style={S.th}>Role</th>
              <th style={S.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td style={S.td}>{u.name} {u._id === currentUser._id && <span style={{ color: '#888', fontSize: '11px' }}>(you)</span>}</td>
                <td style={S.td}>{u.email}</td>
                <td style={S.td}>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                <td style={S.td}>
                  <button style={S.adminToggle(u.isAdmin)} onClick={() => toggleAdmin(u._id)}>
                    {u.isAdmin ? '👑 Admin' : '👤 User'}
                  </button>
                </td>
                <td style={S.td}>
                  <button style={{ ...S.delBtn, opacity: u._id === currentUser._id ? 0.4 : 1 }} onClick={() => handleDelete(u._id, u.name)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
