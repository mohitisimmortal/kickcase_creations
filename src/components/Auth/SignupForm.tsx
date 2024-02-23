// components/Auth/SignupForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { userState } from '@/state/userState';
import Link from 'next/link';
import { handleApiError } from '@/utils/reactToastify';
import baseUrl from '@/baseUrl';
import Loader from '../Loader';

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, formData);
      if (response.status === 201) {
        setUser({ isLoggedIn: true, user: { name: formData.name, email: formData.email, userId: response.data.user.id } });
        router.push('/');
      }
    } catch (error) {
      handleApiError(error);
      // console.error('Error signing up:', error);
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  return (
    <form onSubmit={handleSubmit} className='h-screen flex flex-col items-center gap-4 mt-10'>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className='p-2 lg:w-1/2' />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className='p-2 lg:w-1/2' />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className='p-2 lg:w-1/2'
      />
      <button type="submit" className='lg:w-1/2 text-white px-4 py-1 border rounded-sm'>  {loading ? <Loader /> : 'Sign Up'}
      </button>
      <p className='text-white lg:w-1/2'>Already have an account? <Link href="/login" className='underline'>Log in</Link></p>
    </form>
  );
};

export default SignupForm;