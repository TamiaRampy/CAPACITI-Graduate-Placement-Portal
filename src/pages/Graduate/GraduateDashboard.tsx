import React from 'react';

const GraduateDashboard: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 32,
        border: '2px solid #222',
        borderRadius: 8,
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        background: '#fff',
        color: '#000',
        textAlign: 'center'
      }}
    >
      <h1>Welcome to the Graduate Dashboard!</h1>
      <p>This is your dashboard. You can add more features here.</p>
    </div>
  );
};

export default GraduateDashboard;