'use server'
import { Product } from "@/types/product"

export async function getProducts(): Promise<Product> {
  const res = await fetch(`http://localhost:8080/api/products`, {
    method: 'GET',
  })

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Server Error:', errorData)
    throw new Error(`Failed to fetch produtc data: ${errorData}`)
  }
  return res.json()
}
