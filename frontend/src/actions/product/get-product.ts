'use server'
import { Product } from "@/types/product"
import { config } from "@/app/config"

export async function getProducts(): Promise<Product> {
  const res = await fetch(`${config.baseURL}/api/products`, {
    method: 'GET',
  })

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Server Error:', errorData)
    throw new Error(`Failed to fetch produtc data: ${errorData}`)
  }
  return res.json()
}
