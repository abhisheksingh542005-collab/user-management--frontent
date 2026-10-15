import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://user-management-backent.vercel.app/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://user-management-backent.vercel.app/api/v1/users/${userId}/status`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Kya aap is user ko delete karna chahte hain?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `https://user-management-backent.vercel.app/v1/users/${userId}/soft-delete`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: "'Inter', sans-serif", color: '#f8fafc' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', color: '#38bdf8', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>⚡</span> SaaSPanel
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '12px 16px', backgroundColor: '#3b82f6', color: '#ffffff', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
            📊 Users Dashboard
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={handleLogout} 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ef4444', backgroundColor: 'transparent', color: '#ef4444', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
          >
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#f8fafc', margin: '0 0 6px 0' }}>User Overview</h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Real-time access control and directory management</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '10px 18px', borderRadius: '8px', border: '1px solid #334155', fontSize: '14px', color: '#cbd5e1' }}>
            🟢 Admin Online
          </div>
        </header>

        {/* Metric Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '12px' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Users</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#f8fafc', marginTop: '10px' }}>{users.length}</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '12px' }}>
            <div style={{ fontSize: '13px', color: '#4ade80', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Accounts</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#4ade80', marginTop: '10px' }}>{users.filter(u => u.status !== 'Inactive').length}</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '12px' }}>
            <div style={{ fontSize: '13px', color: '#f87171', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inactive / Suspended</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#f87171', marginTop: '10px' }}>{users.filter(u => u.status === 'Inactive').length}</div>
          </div>
        </div>

        {/* Professional Table Card */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #334155', fontSize: '16px', fontWeight: '600', color: '#f8fafc' }}>
            Registered Users Directory
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>User Info</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>City</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>Gender</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '18px 24px' }}>
                    <div style={{ fontWeight: '600', color: '#f8fafc', fontSize: '14px' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{user.email}</div>
                  </td>
                  <td style={{ padding: '18px 24px', fontSize: '14px', color: '#cbd5e1' }}>{user.city}</td>
                  <td style={{ padding: '18px 24px', fontSize: '14px', color: '#cbd5e1', textTransform: 'capitalize' }}>{user.gender}</td>
                  <td style={{ padding: '18px 24px' }}>
                    <span style={{ 
                      padding: '6px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      backgroundColor: user.status === 'Inactive' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                      color: user.status === 'Inactive' ? '#f87171' : '#4ade80',
                      border: `1px solid ${user.status === 'Inactive' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                    }}>
                      ● {user.status || 'Active'}
                    </span>
                  </td>
                  <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleToggleStatus(user._id)} 
                      style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#334155', color: '#f8fafc', fontSize: '13px', fontWeight: '500', cursor: 'pointer', marginRight: '8px' }}
                    >
                      Toggle Status
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user._id)} 
                      style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.4)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
