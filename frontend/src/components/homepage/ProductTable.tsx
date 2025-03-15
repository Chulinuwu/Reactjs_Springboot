import { Product } from "@/types/product"
import { formatPrice } from "@/utils/formatPrice"
import ProductActions from "./ProductActions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface ProductTableProps {
  products: Product[]
  isAdmin: boolean
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
  onBuy: (productId: number, quantity: number) => void
  onQuantityChange?: (quantity: number) => void;
}

export default function ProductTable({ products, isAdmin, onEdit, onDelete, onBuy, onQuantityChange }: ProductTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Remaining</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Details</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatPrice(product.price)}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell className="max-w-[300px] truncate">{product.description}</TableCell>
            <TableCell className="text-center   ">
              <ProductActions
                product={product}
                isAdmin={isAdmin}
                onEdit={onEdit}
                onDelete={onDelete}
                onBuy={onBuy}
                onQuantityChange={onQuantityChange}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}