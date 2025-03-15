"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormValues } from '@/types/login';
import { LoginUser } from '@/actions/user/login';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    // console.log(data);
    const LoadingToast = toast.loading('Loading...');
    try {
        const loginResponse = await LoginUser({ form: data });
        // console.log('Logged in successfully:', loginResponse);
        toast.dismiss(LoadingToast);
        router.push('/');
    } catch (error: any) {
        toast.dismiss(LoadingToast);
        if (error.message.includes('Invalid email or password')) {
            toast.error('Invalid email or password');
            console.error('Login failed:', error);
        } else {
        console.error('Login failed:', error);
        toast.error('Login failed!');
        }
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-10'>
      <Toaster position='top-center'/>
      <div className='bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Email</label>
            <Input
              {...register('email', { required: 'Email is required' })}
              type='email'
              className='w-full p-2 border rounded'
            />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
          </div>

          <div className='mb-4 relative'>
            <label className='block text-sm font-medium mb-2'>Password</label>
            <Input
              {...register('password', { required: 'Password is required' })}
              type={showPassword ? 'text' : 'password'}
              className='w-full p-2 border rounded pr-10'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute cursor-pointer right-3 top-12 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
          </div>

          <Button
            type='submit'
            disabled={loading}
            className='w-full'
          >
            {loading ? 'Loading...' : 'Register'}
          </Button>
        </form>
      </div>
    </div>
  );
}