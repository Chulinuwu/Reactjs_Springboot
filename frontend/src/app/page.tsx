"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Toaster, toast } from 'react-hot-toast'
import { PlusCircle, RefreshCw, Loader2, Package } from "lucide-react"
import { getMe } from "@/actions/user/getme";
import { getProducts } from "../actions/product/get-product"
import { addProduct as addProductAPI } from "../actions/product/add-product"
import { updateProduct } from "../actions/product/update-product"
import { deleteProduct } from "../actions/product/delete-product"
import { buyProduct } from "../actions/product/buy-product"
import ProductTable from "@/components/homepage/ProductTable";
import ProductCard from "@/components/homepage/ProductCard";
import ProductForm from "@/components/homepage/ProductForm";
import DeleteDialog from "@/components/homepage/DeleteDialog";
import BuyDialog from "@/components/homepage/BuyDialog";
import { Product } from "@/types/product"
import { User } from "@/types/user"
import { Navbar } from "@/components/navbar";

export default function ProductManagement() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false)
  const [buyId, setBuyId] = useState<number | null>(null)
  const [buyQuantity, setBuyQuantity] = useState<number>(1)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    category: "อื่นๆ",
  })
  const [editProduct, setEditProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    category: "",
  })


  const fetchUser = async () => {
    try {
      const userData = await getMe();
      if (userData) {
        setUser(userData);
        setIsAdmin(userData.role === "ROLE_ADMIN");
      } 
    } catch (error) {
      toast.error("Failed to fetch user data.");

    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProducts(); 
    }
  }, [user]);

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await getProducts()
      setProducts(Array.isArray(response) ? response : [])
    } catch (error) {
      toast.error("Cannot fetch products. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const addProduct = async () => {
    setIsSubmitting(true)
    try {
      const response = await addProductAPI(newProduct as Product)
      setProducts([...products, response])
      setNewProduct({
        name: "",
        price: 0,
        quantity: 0,
        description: "",
        category: "อื่นๆ",
      })
      setIsAddDialogOpen(false)
      toast.success("Added new product successfully")
    } catch (error) {
      toast.error("Cannot add product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateProduct = async () => {
    setIsSubmitting(true)
    try {
      const response = await updateProduct(editProduct.id, editProduct)
      const updatedProducts = products.map((product) => (product.id === editProduct.id ? editProduct : product))
      setProducts(updatedProducts)
      setIsEditDialogOpen(false)
      toast.success("Updated product successfully")
    } catch (error) {
      toast.error("Cannot update product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async () => {
    if (deleteId === null) return
    setIsSubmitting(true)
    try {
      const response = await deleteProduct(deleteId)
      const filteredProducts = products.filter((product) => product.id !== deleteId)
      setProducts(filteredProducts)
      setIsDeleteDialogOpen(false)
      toast.success("Deleted product successfully")
    } catch (error) {
      toast.error("Cannot delete product. Please try again.")
    } finally {
      setIsSubmitting(false)
      setDeleteId(null)
    }
  }

  const openEditDialog = (product: Product) => {
    setEditProduct({ ...product, id: product.id ?? 0 })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (id: number) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const openBuyDialog = (id: number, quantity: number) => {
    setBuyId(id);
    setBuyQuantity(quantity);
    setIsBuyDialogOpen(true);
  };

  const handleBuy = async () => {
    if (buyId === null) return;

    setIsSubmitting(true);
    try {
      await buyProduct(buyId, buyQuantity);
      toast.success("Product purchased successfully!");
      setIsBuyDialogOpen(false);
      await fetchUser();
    } catch (error) {
      toast.error("Failed to purchase product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar balance={user?.balance ?? 0} isAdmin={isAdmin} />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 pt-28 pb-10 md:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Bakery Shop System</h1>
              <p className="text-muted-foreground mt-1">Freshly Baked for You</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={fetchProducts}
                disabled={isLoading}
                className="gap-2 flex-1 sm:flex-none"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                <span className="sm:inline">Refresh</span>
              </Button>

              {isAdmin && (
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 flex-1 sm:flex-none">
                      <PlusCircle className="h-4 w-4" />
                      <span className="sm:inline">Add new product</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] w-[95vw] max-w-full mx-auto">
                    <DialogHeader>
                      <DialogTitle>Add new product</DialogTitle>
                      <DialogDescription>Enter the Product Details</DialogDescription>
                    </DialogHeader>
                    <ProductForm
                      product={newProduct}
                      onSubmit={addProduct}
                      onCancel={() => setIsAddDialogOpen(false)}
                      isSubmitting={isSubmitting}
                      onChange={(product) => setNewProduct(product)}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <div className="bg-card rounded-lg border shadow-sm">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Loading data...</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Product data not found</h3>
              </div>
            ) : (
              <>
                <div className="hidden md:block overflow-x-auto">
                <ProductTable
                  products={products}
                  isAdmin={isAdmin}
                  onEdit={openEditDialog}
                  onDelete={openDeleteDialog}
                  onBuy={openBuyDialog}
                />
                </div>

                <div className="flex flex-col bg-transparent gap-4 md:hidden">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isAdmin={isAdmin}
                      onEdit={openEditDialog}
                      onDelete={openDeleteDialog}
                      onBuy={openBuyDialog}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Edit Product Information ID: {editProduct.id}</DialogDescription>
            </DialogHeader>
            <ProductForm
              product={editProduct}
              onSubmit={handleUpdateProduct}
              onCancel={() => setIsEditDialogOpen(false)}
              isSubmitting={isSubmitting}
              onChange={(product) => setEditProduct({ ...product, id: product.id ?? 0 })}
            />
          </DialogContent>
        </Dialog>

        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onDelete={handleDeleteProduct}
          isSubmitting={isSubmitting}
        />

        <BuyDialog
          isOpen={isBuyDialogOpen}
          onOpenChange={setIsBuyDialogOpen}
          onConfirm={handleBuy}
          productName={products.find((p) => p.id === buyId)?.name || ""}
          quantity={buyQuantity}
          isSubmitting={isSubmitting}
        />

        <Toaster />
      </div>
    </div>
  )
}