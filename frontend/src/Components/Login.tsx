import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className="bg-slate-300 p-8 rounded-lg shadow-md max-w-md mx-auto mt-10 space-y-4">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-blue-600">
            Sign in to your account
          </h2>
        </div>

        {error && <p className="text-blue-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-600">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-blue-600">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-500  px-3 py-1.5 text-sm font-semibold text-blue-400 shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              Sign in
            </button>
            <div className='ml-12 p-5 '>
              New Member? <Link className='text-blue-600' to='/Register'>Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
