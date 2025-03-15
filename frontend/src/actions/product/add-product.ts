'use server'

import { Product } from "@/types/product"
import { config } from "@/app/config"
import { cookies } from 'next/headers';

export async function addProduct(product: Product): Promise<Product> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    const res = await fetch(`${config.baseURL}/api/products`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token?.value}` 
      },
      body: JSON.stringify(product),
    })
  
    if (!res.ok) {
      const errorData = await res.text()
      console.error('Server Error:', errorData)
      throw new Error(`Failed to add product: ${errorData}`)
    }
  
    return res.json()
}
