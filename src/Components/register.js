import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAllUsers } from '../redux/reducers/userslice';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    city: ""
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/register', input);

      alert('Registration Successful!');
      navigate('/login');
    } catch (error) {
      console.error("Registration Error:", error);
      alert('Registration failed!');
    }
  };

   return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#090d16', fontFamily: "'Inter', -apple-system, sans-serif", padding: '24px', color: '#f8fafc' }}>
      <div style={{ width: '100%', maxWidth: '440px', background: '#1e293b', padding: '40px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '20px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontSize: '12px', fontWeight: '600', marginBottom: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
            GET STARTED
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>Create an Account</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Enter your details to access the enterprise platform</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={input.name} 
              onChange={handleChange} 
              placeholder="Abhishek Singh" 
              required 
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={input.email} 
              onChange={handleChange} 
              placeholder="name@example.com" 
              required 
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>Password</label>
            <input 
              type="password" 
              name="password" 
              value={input.password} 
              onChange={handleChange} 
              placeholder="••••••••" 
              required 
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>Gender</label>
              <select 
                name="gender" 
                value={input.gender} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              >
                <option value="" style={{ background: '#0f172a' }}>Select</option>
                <option value="male" style={{ background: '#0f172a' }}>Male</option>
                <option value="female" style={{ background: '#0f172a' }}>Female</option>
                <option value="other" style={{ background: '#0f172a' }}>Other</option>
              </select>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>City</label>
              <input 
                type="text" 
                name="city" 
                value={input.city} 
                onChange={handleChange} 
                placeholder="Bhopal" 
                required 
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={{ marginTop: '8px', width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: '#ffffff', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s' }}
          >
            Create Account
          </button>
        </form>

        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#94a3b8' }}>
          Already have an account? <Link to="/login" style={{ color: '#38bdf8', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
        </p>

      </div>
    </div>
  );
}