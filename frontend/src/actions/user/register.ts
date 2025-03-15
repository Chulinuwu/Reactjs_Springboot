'use server'

import { config } from '@/app/config'
import { FormValues } from '@/types/register'

interface RegisterUserResponse {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    balance: number;
}

export async function registerUser(data: {
  form: FormValues
}): Promise<RegisterUserResponse> {
    
    const res = await fetch(`${config.baseURL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.form),
    })

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Server Error:', errorData)
    throw new Error(`Failed to register user: ${errorData}`)
  }

  return res.json()
}
