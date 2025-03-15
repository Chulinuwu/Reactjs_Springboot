'use server';

import { cookies } from "next/headers";
import { config } from "@/app/config"

export const buyProduct = async (productId: number, quantity: number): Promise<string> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await fetch(`${config.baseURL}/api/products/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to buy product");
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error buying product:", error);
    throw error;
  }
};