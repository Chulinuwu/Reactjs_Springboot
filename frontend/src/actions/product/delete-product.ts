'use server'

import { config } from "@/app/config"
import { cookies } from 'next/headers';

export async function deleteProduct(id: number): Promise<{ message: string }> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    const res = await fetch(`${config.baseURL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 
            Authorization: `Bearer ${token?.value}` 
        },
    });

    if (!res.ok) {
        const errorData = await res.text();
        console.error('Server Error:', errorData);
        throw new Error(`Failed to delete product: ${errorData}`);
    }

    const responseBody = await res.text();
    
    if (!responseBody) {
        return { message: "Deleted successfully" };
    }

    return { message: responseBody };
}
