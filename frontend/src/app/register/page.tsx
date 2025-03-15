"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormValues } from '@/types/register';
import { registerUser } from '@/actions/user/register';
import { LoginUser } from '@/actions/user/login';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Toaster, toast } from 'react-hot-toast'

export default function Register() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    // console.log(data);
    const LoadingToast = toast.loading('Loading...');
    try {
      const response = await registerUser({ form: data });
    //   console.log('Registered user:', response);

      try {
        const loginData = {
            email: data.email,
            password: data.password
        }
        const loginResponse = await LoginUser({ form: loginData });
        // console.log('Logged in successfully:', loginResponse);
        toast.dismiss(LoadingToast);
        router.push('/');
      } catch (error: any) {
        toast.dismiss(LoadingToast);
        console.error('Login failed:', error);
        toast.error('Login failed!');
        router.push('/login');
      }
    } catch (error: any) {
        toast.dismiss(LoadingToast);
        if (error.message.includes('Email is already taken')) {
            toast.error('Email is already taken!');
          } else {
            console.error('Registration failed:', error);
          }
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-10'>
      <Toaster position='top-center'/>
      <div className='bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Name</label>
            <Input
              {...register('name', { required: 'Name is required' })}
              type='text'
              className='w-full p-2 border rounded'
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
          </div>

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

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Role</label>
            <Controller
              name='role'
              control={control}
              defaultValue='ROLE_USER'
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className='w-full p-2 border rounded'>
                    <SelectValue placeholder='Select a role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='ROLE_USER'>User</SelectItem>
                    <SelectItem value='ROLE_ADMIN'>Admin</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && <p className='text-red-500 text-sm'>{errors.role.message}</p>}
          </div>

          <Button
            type='submit'
            disabled={loading}
            className='w-full'
          >
            {loading ? 'Loading...' : 'Register'}
          </Button>
        </form>

        <p className='mt-4 text-sm text-center'>
          Already have an account?{' '}
          <Link href='/login' className='text-sky-800 hover:underline'>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}