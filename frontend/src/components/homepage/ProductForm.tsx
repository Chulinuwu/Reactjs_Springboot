import { Product } from "@/types/product"
import { Categories } from "@/constants/categories"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

interface ProductFormProps {
  product: Product
  onSubmit: () => void
  onCancel: () => void
  isSubmitting: boolean
  onChange: (product: Product) => void
}

export default function ProductForm({ product, onSubmit, onCancel, isSubmitting, onChange }: ProductFormProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={product.name}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
          placeholder="Enter product name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Price (Baht)</Label>
          <Input
            id="price"
            type="number"
            value={product.price}
            onChange={(e) => onChange({ ...product, price: Number(e.target.value) })}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={product.quantity}
            onChange={(e) => onChange({ ...product, quantity: Number(e.target.value) })}
            placeholder="0"
            min="0"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={product.category}
          onValueChange={(value) => onChange({ ...product, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Enter product category" />
          </SelectTrigger>
          <SelectContent>
            {Categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Details</Label>
        <Textarea
          id="description"
          value={product.description}
          onChange={(e) => onChange({ ...product, description: e.target.value })}
          placeholder="Enter product details"
          rows={3}
        />
      </div>

      <DialogFooter className="flex-col sm:flex-row gap-2">
        <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting || !product.name}
          className="gap-2 w-full sm:w-auto"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Submit
        </Button>
      </DialogFooter>
    </div>
  )
}