'use client';

import React from 'react';
import Link from 'next/link';
import axios from 'axios';

type Props = {};

export default function VerifyEmailPage({}: Props) {
  const [token, setToken] = React.useState('');
  const [isVerified, setIsVerified] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlToken = searchParams.get('token') || '';
    setToken(urlToken);
  }, []);

  React.useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const verifyUserEmail = async () => {
    console.log(token)
    try {
      await axios.post('/api/users/verifyemail', { token });
      setIsVerified(true);
    } catch (error: any) {
      setIsError(true);
      console.error(error.response.data);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-300">${token ? token : 'No token'}</h2>

      {isVerified && (
        <div>
          <h2 className='text-2xl'>Email Verified</h2>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      )}

      {isError && (
        <div>
          <h2 className="text-2xl text-red-500">Error</h2>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
