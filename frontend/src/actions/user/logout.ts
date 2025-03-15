'use server';

import { cookies } from 'next/headers';

export async function LogoutUser(): Promise<string> {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');

  const responseData = 'Logged out successfully!';

  return responseData;
}
