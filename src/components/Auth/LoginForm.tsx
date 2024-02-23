// components/Auth/LoginForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { userState } from '@/state/userState';
import Link from 'next/link';
import { handleApiError } from '@/utils/reactToastify';
import baseUrl from '@/baseUrl';
import Loader from '../Loader';
// import baseUrl from '../../baseUrl';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, formData);
      if (response.status === 200) {
        setUser({ isLoggedIn: true, user: { name: response.data.name, email: formData.email, userId: response.data.user.id } });
        router.push('/');
      }
    } catch (error) {
      handleApiError(error)
      // console.error('Error logging in:', error);
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className='h-screen flex flex-col items-center gap-4 mt-10'>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required  className='p-2 lg:w-1/2'/>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className='p-2 lg:w-1/2'
      />
      <button type="submit" className='text-white px-4 py-1 border rounded-sm lg:w-1/2'>{loading?<Loader/>:'Log In'}</button>
      <p className='text-white lg:w-1/2'>Don't have an account? <Link href="/signup" className=' underline'>Sign up</Link></p>
    </form>
  );
};

export default LoginForm;