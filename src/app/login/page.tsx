'use client';

import React, { FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

type Props = {};

export default function LoginPage({}: Props) {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handlingStatus = (() => {
    if (buttonDisabled) return 'Please type data...';
    if (loading) return 'Processing...';
    return 'Login here';
  })();

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLoginClick = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/users/login', user);
      console.log('Login success', response.data);
      toast.success('Login success');
      router.push('/profile');
    } catch (error: any) {
      console.log('Login failed', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <form action="" className="flex flex-col gap-4 w-80">
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
            onClick={onLoginClick}
          >
            {handlingStatus}
          </button>
          <Link href="/signup">Visit signup page</Link>
        </div>
      </form>
    </div>
  );
}
