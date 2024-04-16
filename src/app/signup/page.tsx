'use client';

import React, { FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

type Props = {};

export default function SignupPage({}: Props) {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handlingStatus = (() => {
    if (buttonDisabled) return 'Please type data...';
    if (loading) return 'Processing...';
    return 'Signup here';
  })();

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleSignupClick = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup success', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log('Signup failed', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr />
      <form action="" className="flex flex-col gap-4 w-80">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            placeholder="Type username here"
            className="p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-600"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            placeholder="Type email here"
            className="p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-600"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            placeholder="Type password here"
            className="p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-600"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <button
            className="p-2 border w-full border-slate-300 rounded-lg focus:outline-none hover:bg-slate-300 transition-colors focus:border-slate-600"
            onClick={handleSignupClick}
          >
            {handlingStatus}
          </button>
          <Link href="/login">Visit login page</Link>
        </div>
      </form>
    </div>
  );
}
