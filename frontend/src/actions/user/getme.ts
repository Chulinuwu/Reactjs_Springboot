"use server"
import { User } from "@/types/user";
import { config } from '@/app/config';
import { cookies } from 'next/headers';

export const getMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');
  try {
    const response = await fetch(`${config.baseURL}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
};