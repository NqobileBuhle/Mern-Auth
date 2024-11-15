// src/components/Logout.tsx
import React from 'react';
import axios from 'axios';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout');
      alert('Logged out successfully!');
    } catch (err: any) {
      console.error('Logout failed', err.response?.data?.message || err.message);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default Logout;
