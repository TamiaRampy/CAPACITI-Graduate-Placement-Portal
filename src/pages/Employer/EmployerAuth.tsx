import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

interface Props {
  mode: 'login' | 'signup';
}

const EmployerAuth: React.FC<Props> = ({ mode }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!name.trim() || !surname.trim()) {
        setError('Name and Surname are required.');
        return;
      }
    }
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        // navigate('/employer/dashboard');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess('You have signed up successfully! Redirecting to login...');
        setName('');
        setSurname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setSuccess('');
          navigate('/login/employer');
        }, 2000);
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
        Employer {mode === 'login' ? 'Login' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 12, padding: 8 }}
            />
            <input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 12, padding: 8 }}
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />
        {mode === 'signup' && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
          />
        )}
        <button type="submit" style={{ width: '100%', padding: 10, background: '#222', color: '#fff', border: 'none' }}>
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: 8 }}>{success}</p>}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link to="/forgot-password" style={{ color: '#222', textDecoration: 'underline', fontSize: 14 }}>
            Forgot password?
          </Link>
        </div>
      </form>
      <div style={{ marginTop: 16, textAlign: 'center', color: '#000' }}>
        {mode === 'login' ? (
          <span>
            Don't have an account?{' '}
            <Link to="/signup/employer" style={{ color: '#222', textDecoration: 'underline' }}>Sign up</Link>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <Link to="/login/employer" style={{ color: '#222', textDecoration: 'underline' }}>Login</Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default EmployerAuth;