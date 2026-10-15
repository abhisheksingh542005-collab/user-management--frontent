import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/reducers/userslice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.user);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(getAllUsers());
    }
  }, [dispatch, token, navigate]);

  // Toggle Status PATCH API
  const handleToggleStatus = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/users/${id}/status`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(getAllUsers());
    } catch (error) {
      console.error('Status toggle error:', error);
    }
  };

  // Soft Delete DELETE API
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/users/${id}/soft-delete`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(getAllUsers());
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', fontFamily: "'Inter', -apple-system, sans-serif", color: '#f8fafc', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Top Header Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '28px 36px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '20px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontSize: '12px', fontWeight: '600', marginBottom: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              ADMIN CONTROL PANEL
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>User Management Hub</h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Monitor system accounts, access privileges, and directory statuses in real-time.</p>
          </div>
          <button 
            onClick={handleLogout} 
            style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            Logout
          </button>
        </div>

        {/* Analytics Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '24px 28px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Registered</div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#ffffff', marginTop: '10px' }}>{users.length}</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '24px 28px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Accounts</div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#4ade80', marginTop: '10px' }}>{users.filter(u => u.status !== 'Inactive').length}</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '24px 28px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inactive / Suspended</div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#f87171', marginTop: '10px' }}>{users.filter(u => u.status === 'Inactive').length}</div>
          </div>
        </div>

        {/* Data Table Container */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid #334155', fontSize: '16px', fontWeight: '700', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Active Users Directory</span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8' }}>Showing {users.length} entries</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
                <th style={{ padding: '16px 28px', fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User Details</th>
                <th style={{ padding: '16px 28px', fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>City</th>
                <th style={{ padding: '16px 28px', fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gender</th>
                <th style={{ padding: '16px 28px', fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '16px 28px', fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid #334155', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '20px 28px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff' }}>{u.name}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '20px 28px', fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>{u.city || 'N/A'}</td>
                  <td style={{ padding: '20px 28px', fontSize: '14px', color: '#cbd5e1', fontWeight: '500', textTransform: 'capitalize' }}>{u.gender || 'N/A'}</td>
                  <td style={{ padding: '20px 28px' }}>
                    <span style={{ 
                      padding: '6px 14px', 
                      borderRadius: '9999px', 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      backgroundColor: u.status === 'Inactive' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                      color: u.status === 'Inactive' ? '#f87171' : '#4ade80',
                      border: `1px solid ${u.status === 'Inactive' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: u.status === 'Inactive' ? '#ef4444' : '#22c55e' }}></span>
                      {u.status || 'Active'}
                    </span>
                  </td>
                  <td style={{ padding: '20px 28px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleToggleStatus(u._id)} 
                      style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#334155', color: '#ffffff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', marginRight: '8px', transition: 'background 0.2s' }}
                    >
                      Toggle Status
                    </button>
                    <button 
                      onClick={() => handleDelete(u._id)} 
                      style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}