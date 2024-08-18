'use client'

import { useState, useEffect } from 'react';
import api from '../../api';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { login } from '@/lib/features/userSlice/userSlice';
import { useRouter } from 'next/navigation';
// import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid';

function EmailVerification(){
  const dispatch = useAppDispatch()
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const email = useAppSelector(state => state.email.email);
 

  useEffect(() => {
      const sendVerficationCode = async () => {
       try {
         const response = await api.post('/api/auh/sentEmail-verification', {email: email})
         if(response.status === 200) {
           console.log('Verification code sent');
         }
         else {
           console.log('Failed to send verification code');
         }
       } catch (error) {
        console.log('Failed to send verification code', error);
        
       }

      }

      sendVerficationCode();
  })

  const handleSubmit = async () => {
    setError('');
    
    // Simulating API call to verify email
    try {
      const response = await api.post('/api/auth/verifyEmail', {email: email, code: verificationCode});
      if(response.data.success === true) {
        setIsVerified(true)
        const userData = response.data.user
        const loginResponse = await api.post('/api/auth/login',
         {
          email: userData.email,
          password: userData.password
        }
        );
        if(loginResponse.status === 201){
          const loginUserData = loginResponse.data.user
          dispatch(login(loginUserData));
          router.push('/');
        }

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
          <form>
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
                {/* <ExclamationCircleIcon className="h-5 w-5 mr-2" /> */}
                {error}
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl shadow-md font-semibold text-lg hover:from-indigo-500 hover:to-blue-500 transition-colors"
            >
              Verify
            </button>
          </form>
        ) : (
          <div className="text-center">
            {/* <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" /> */}
            <p className="text-xl font-semibold text-green-600">
              Your email has been verified!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
