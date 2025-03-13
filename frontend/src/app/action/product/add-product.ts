'use server'
import { Product } from "@/type/product"

export async function addProduct(product: Product): Promise<Product> {
    const res = await fetch(`http://localhost:8080/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
  
    if (!res.ok) {
      const errorData = await res.text()
      console.error('Server Error:', errorData)
      throw new Error(`Failed to add product: ${errorData}`)
    }
  
    return res.json()
}
