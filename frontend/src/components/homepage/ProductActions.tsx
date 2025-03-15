"use client"

import { useState } from "react"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus, Minus, ShoppingCart } from "lucide-react"

interface ProductActionsProps {
  product: Product
  isAdmin: boolean
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
  isCardView?: boolean
}

export default function ProductActions({ product, isAdmin, onEdit, onDelete, isCardView }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1)

  if (isAdmin) {
    return (
      <div className="flex gap-2 items-center justify-center">
        <Button
          variant="outline"
          size={isCardView ? "icon" : "default"}
          className={isCardView ? "h-8 w-8" : ""}
          onClick={() => onEdit(product)}
        >
          <Pencil className={isCardView ? "h-3.5 w-3.5" : "h-4 w-4"} />
          {!isCardView && <span className="ml-2">Edit</span>}
        </Button>
        <Button
          variant="outline"
          size={isCardView ? "icon" : "default"}
          className={`${isCardView ? "h-8 w-8" : ""} text-destructive hover:text-destructive`}
          onClick={() => product.id !== undefined && onDelete(product.id)}
        >
          <Trash2 className={isCardView ? "h-3.5 w-3.5" : "h-4 w-4"} />
          {!isCardView && <span className="ml-2">Delete</span>}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 items-center justify-center">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
      <Button size={isCardView ? "icon" : "default"} className={isCardView ? "h-8 w-8" : ""}>
        <ShoppingCart className={isCardView ? "h-3.5 w-3.5" : "h-4 w-4"} />
        {!isCardView && <span className="ml-2">Buy</span>}
      </Button>
    </div>
  )
}