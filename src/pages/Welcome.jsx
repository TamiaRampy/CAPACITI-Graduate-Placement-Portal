import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [loginType, setLoginType] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (loginType) {
      navigate(`/login/${loginType.toLowerCase()}`);
    }
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to the Portal</h1>
      <div className="button-group">
        <select value={loginType} onChange={e => setLoginType(e.target.value)}>
          <option value="">Select Login Type</option>
          <option value="Graduate">Graduate</option>
          <option value="Employer">Employer</option>
          <option value="Admin">Admin</option>
        </select>
        <button onClick={handleLogin} disabled={!loginType}>
          Login
        </button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
};

export default Welcome;