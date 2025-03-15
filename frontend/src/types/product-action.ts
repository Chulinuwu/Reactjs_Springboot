import { Product } from "./product"

export interface ProductActionsProps {
  product: Product
  isAdmin: boolean
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
  onBuy: (productId: number, quantity: number) => void
  onQuantityChange?: (quantity: number) => void;
  isCardView?: boolean
}