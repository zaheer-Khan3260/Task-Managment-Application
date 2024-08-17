'use client'

import { useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simulating API call to verify email
    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      if (response.ok) {
        setIsVerified(true);
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
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
                <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl shadow-md font-semibold text-lg hover:from-indigo-500 hover:to-blue-500 transition-colors"
            >
              Verify
            </button>
          </form>
        ) : (
          <div className="text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-xl font-semibold text-green-600">
              Your email has been verified!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
