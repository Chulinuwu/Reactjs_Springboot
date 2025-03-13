'use server'
import { Product } from "@/type/product"

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const res = await fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
  
    if (!res.ok) {
      const errorData = await res.text()
      console.error('Server Error:', errorData)
      throw new Error(`Failed to update product: ${errorData}`)
    }
  
    return res.json()
}