// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/auth', { email, password });
      console.log('Logged in:', data);
      alert('Login successful!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-10 space-y-4">
    <h2 className="text-2xl font-bold text-center text-purple-700">Login</h2>
    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
    />
    
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
    />
    
    <button 
      type="submit" 
      className="w-full bg-purple-700 text-pink-500 p-3 rounded-md font-semibold hover:bg-purple-500 transition duration-200"
    >
      Login
    </button>
  </form>
  
  );
};

export default Login;
