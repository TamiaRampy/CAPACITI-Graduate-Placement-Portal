import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AdminAuth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        maxWidth: 400,
        margin: '40px auto',
        padding: 32,
        border: '2px solid #222',
        borderRadius: 8,
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        background: '#fff',
        color: '#000'
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#000' }}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8, color: '#000', background: '#fff', border: '1px solid #222' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8, color: '#000', background: '#fff', border: '1px solid #222' }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#222', color: '#fff', border: 'none' }}>
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      </form>
      {/* No signup link for admin */}
    </div>
  );
};

export default AdminAuth;