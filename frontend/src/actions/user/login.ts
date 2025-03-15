'use server';

import { config } from '@/app/config';
import { FormValues } from '@/types/login';
import { cookies } from 'next/headers';

interface LoginResponse {
  token: string;
}

export async function LoginUser(data: { form: FormValues }): Promise<LoginResponse> {
  const res = await fetch(`${config.baseURL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.form),
  });

  if (!res.ok) {
    const errorData = await res.text();
    console.error('Server Error:', errorData);
    throw new Error(`Failed to login user: ${errorData}`);
  }

  const responseData = await res.json();

  const cookieStore = await cookies();
  cookieStore.set('auth-token', responseData.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'production', // Set to true in production
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return responseData;
}
