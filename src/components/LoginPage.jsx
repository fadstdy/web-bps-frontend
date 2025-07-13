import React, { useState } from 'react';
import locked from '../assets/locked.png';
import user from '../assets/user.png';
import logoBPS from '../assets/Galeri/logoBPS.png';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAction, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi sederhana
    if (!email || !password) {
      alert('Email dan password harus diisi!');
      return;
    }
    try {
      console.log('🚀 Logging in with:', email, password);
      const success = await loginAction(email, password);

      if (success) {
        console.log('✅ Login success. Redirecting...');
        navigate('/publications');
      } else {
        console.log('❌ Login failed but no error thrown.');
      }
    } catch (err) {
      console.error('🔥 Login error caught in LoginPage:', err);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">

        {/* Header Section */}
        <div className="text-center mb-4">
          <img src={logoBPS} alt="Logo BPS" className="mx-auto mb-2 w-16 h-16 rounded-full" />
          <div className="text-3xl font-bold text-gray-800">Login</div>
          <div className='underline'></div>
        </div>

        {/* Error Message */}
        {
          error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )
        }

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <img src={user} alt="" className="w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
   />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <img src={locked} alt="" className="w-5 h-5 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>


        {/* Submit Buttons */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer">Login
          </button>
      </div>
    </div>
  );
};

