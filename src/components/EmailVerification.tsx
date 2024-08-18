'use client';

import { useState, useEffect } from 'react';
import api from '../../api';
import {  useAppSelector } from '@/lib/hook';
import Link from 'next/link';

function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const email = useAppSelector(state => state.email.email);

  useEffect(() => {
    const sendVerificationCode = async () => {
      try {
        const response = await api.post('/api/auth/sentEmail-verification', { email });
        if (response.status === 200) {
          console.log('Verification code sent');
        } else {
          console.log('Failed to send verification code');
        }
      } catch (error) {
        console.log('Failed to send verification code', error);
      }
    };

    if (email) {
      sendVerificationCode();
    }
  }, [email]); // Dependency array to prevent infinite loop

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setError('');

    try {
      const response = await api.post('/api/auth/verifyEmail', {
        email,
        code: verificationCode,
      });

      if (response.data.success) {
        setIsVerified(true);
        
      } else {
        setError('Email verification failed.');
      }
    } catch (err) {
      console.error('Error during email verification or login:', err);
      setError('Something went wrong, please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Verify Your Email
        </h2>
        {!isVerified ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="code"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full px-4 text-black py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>
            {error && (
              <div className="flex items-center mb-4 text-red-600 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit" // Changed to submit for form handling
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl shadow-md font-semibold text-lg hover:from-indigo-500 hover:to-blue-500 transition-colors"
            >
              Verify
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold text-green-600">
              Your email has been verified! 
              <Link href="/login">
              <span
              className='text-2xl text-blue-600'
              >Sign in</span>
              </Link> 
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
