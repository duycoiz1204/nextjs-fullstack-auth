'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

type Props = {
  params: Params;
};

export default function ProfilePage({ params }: Props) {
  const router = useRouter();
  const [id, setId] = React.useState<String>();

  const handleLogoutClick = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleGetUserClick = async () => {
    const response = await axios.get('/api/users/me');
    console.log(response.data);
    setId(response.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="p-2 rounded bg-orange-400">{params.id}</span>
      </p>
      <h2 className='padding rounded bg-emerald-300'>
        {id ? <Link href={`/profile/${id}`}>${id}</Link> : 'Nothing here'}
      </h2>
      <button
        className="bg-purple-300 hover:bg-purple-500 text-bold px-4 py-2 rounded"
        onClick={handleGetUserClick}
      >
        Get user
      </button>
      <button
        className="bg-cyan-300 hover:bg-cyan-500 text-bold px-4 py-2 rounded"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </div>
  );
}
