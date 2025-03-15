
import { formatPrice } from "@/utils/formatPrice"
import ProductActions from "./ProductActions"
import { ProductActionsProps } from "@/types/product-action"

export default function ProductCard({ product, isAdmin, onEdit, onDelete, onBuy }: ProductActionsProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-lg">{product.name}</h3>
          <p className="text-muted-foreground text-sm">ID: {product.id}</p>
        </div>
        <ProductActions
          product={product}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          onBuy={onBuy}
          isCardView
        />
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div className="text-muted-foreground">Price:</div>
        <div className="font-medium">{formatPrice(product.price)}</div>

        <div className="text-muted-foreground">Quantity:</div>
        <div className="font-medium">{product.quantity}</div>

        <div className="text-muted-foreground">Category:</div>
        <div className="font-medium">{product.category}</div>
      </div>

      {product.description && (
        <div className="mt-3 pt-3 border-t text-sm">
          <div className="text-muted-foreground mb-1">Details:</div>
          <div>{product.description}</div>
        </div>
      )}
    </div>
  )
}