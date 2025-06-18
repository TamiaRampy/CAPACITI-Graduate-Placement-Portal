import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

interface Props {
  mode: 'login' | 'signup';
}

const GraduateAuth: React.FC<Props> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        // navigate('/graduate/dashboard');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // navigate('/graduate/dashboard');
      }
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
      <h2 style={{ textAlign: 'center', color: '#000' }}>
        Graduate {mode === 'login' ? 'Login' : 'Sign Up'}
      </h2>
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
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      </form>
      <div style={{ marginTop: 16, textAlign: 'center', color: '#000' }}>
        {mode === 'login' ? (
          <span>
            Don't have an account?{' '}
            <Link to="/signup/graduate" style={{ color: '#222', textDecoration: 'underline' }}>Sign up</Link>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <Link to="/login/graduate" style={{ color: '#222', textDecoration: 'underline' }}>Login</Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default GraduateAuth;