'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

type LoginFormData = {
  email: string;
  password: string;
};

const initialFormData: LoginFormData = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      setLoading(false);
      setError('Login failed. Check your email or password.');
    } else {
      setLoading(false);
      setError('');
      router.push('/dashboard');
    }

    // try {
    //   const response = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data.error || 'Something went wrong');
    //   }
    //   console.log('data: ', data);
    //   // Save token to localStorage or cookies
    //   localStorage.setItem('token', data.token);

    //   // Redirect to the home page or dashboard
    //   if (data.user.role === 'ADMIN') {
    //     router.push('/dashboard');
    //   } else {
    //     router.push('/');
    //   }
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (err: any) {
    //   setError(err.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  if (session) {
    router.replace('/dashboard');
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 m-4 md:m-0 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl text-gray-700 font-semibold text-center mb-6">
          Login
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {loading ? 'Logging in' : 'Log In'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
