"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Toaster, toast } from 'react-hot-toast'
import { PlusCircle, Pencil, Trash2, Loader2, Package, RefreshCw } from "lucide-react"
import { getProducts } from "../actions/product/get-product"
import { addProduct as addProductAPI } from "../actions/product/add-product"
import { updateProduct } from "../actions/product/update-product"
import { deleteProduct } from "../actions/product/delete-product"

// ประเภทข้อมูลสินค้า
interface Product {
  id: number
  name: string
  price: number
  quantity: number
  description: string
  category: string
}

// ประเภทสินค้าที่มี
export const CATEGORIES = [
  "Bakery",
  "Dairy",
  "Poultry",
  "Fruits",
  "Meat",
  "Grains",
  "Beverages",
  "Others",
];

export default function ProductManagement() {
  // สถานะต่างๆ
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // สถานะสำหรับฟอร์มเพิ่มสินค้า
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    category: "อื่นๆ",
  })

  // สถานะสำหรับฟอร์มแก้ไขสินค้า
  const [editProduct, setEditProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    category: "",
  })

  // โหลดข้อมูลสินค้าเมื่อเริ่มต้น
  useEffect(() => {
    fetchProducts()
  }, [])

  // ฟังก์ชันดึงข้อมูลสินค้า
  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await getProducts()
      setProducts(Array.isArray(response) ? response : [])
    } catch (error) {
      toast.error("ไม่สามารถดึงข้อมูลสินค้าได้ กรุณาลองใหม่อีกครั้ง")
    } finally {
      setIsLoading(false)
    }
  }

  // ฟังก์ชันเพิ่มสินค้าใหม่
  const addProduct = async () => {
    setIsSubmitting(true)
    try {
      const response = await addProductAPI(newProduct as Product);
      setProducts([...products, response])
      setNewProduct({
        name: "",
        price: 0,
        quantity: 0,
        description: "",
        category: "อื่นๆ",
      })
      setIsAddDialogOpen(false)
      toast.success("เพิ่มสินค้าใหม่เรียบร้อยแล้ว")
    } catch (error) {
      toast.error("ไม่สามารถเพิ่มสินค้าได้ กรุณาลองใหม่อีกครั้ง")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ฟังก์ชันอัปเดตสินค้า
  const handleUpdateProduct = async () => {
    setIsSubmitting(true)
    try {
      const response = await updateProduct(editProduct.id, editProduct);
      const updatedProducts = products.map((product) => (product.id === editProduct.id ? editProduct : product))
      setProducts(updatedProducts)
      setIsEditDialogOpen(false)
      toast.success("อัปเดตสินค้าเรียบร้อยแล้ว")
    } catch (error) {
      toast.error("ไม่สามารถอัปเดตสินค้าได้ กรุณาลองใหม่อีกครั้ง")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ฟังก์ชันลบสินค้า
  const handleDeleteProduct = async () => {
    if (deleteId === null) return
    setIsSubmitting(true)
    try {
      const response = await deleteProduct(deleteId)
      const filteredProducts = products.filter((product) => product.id !== deleteId)
      setProducts(filteredProducts)
      setIsDeleteDialogOpen(false)
      toast.success("ลบสินค้าเรียบร้อยแล้ว")
    } catch (error) {
      toast.error("ไม่สามารถลบสินค้าได้ กรุณาลองใหม่อีกครั้ง")
    } finally {
      setIsSubmitting(false)
      setDeleteId(null)
    }
  }

  // ฟังก์ชันเปิดหน้าต่างแก้ไขสินค้า
  const openEditDialog = (product: Product) => {
    setEditProduct({ ...product })
    setIsEditDialogOpen(true)
  }

  // ฟังก์ชันเปิดหน้าต่างยืนยันการลบสินค้า
  const openDeleteDialog = (id: number) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  // ฟังก์ชันจัดรูปแบบราคา
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 2,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">ระบบจัดการสินค้า</h1>
            <p className="text-muted-foreground mt-1">แสดงและจัดการข้อมูลสินค้าทั้งหมด</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={fetchProducts}
              disabled={isLoading}
              className="gap-2 flex-1 sm:flex-none"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              <span className="sm:inline">รีเฟรช</span>
            </Button>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 flex-1 sm:flex-none">
                  <PlusCircle className="h-4 w-4" />
                  <span className="sm:inline">เพิ่มสินค้าใหม่</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] w-[95vw] max-w-full mx-auto">
                <DialogHeader>
                  <DialogTitle>เพิ่มสินค้าใหม่</DialogTitle>
                  <DialogDescription>กรอกข้อมูลสินค้าที่ต้องการเพิ่มในระบบ</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">ชื่อสินค้า</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="ระบุชื่อสินค้า"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">ราคา (บาท)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="quantity">จำนวน</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category">ประเภท</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทสินค้า" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">รายละเอียด</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="รายละเอียดสินค้า"
                      rows={3}
                    />
                  </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="w-full sm:w-auto">
                    ยกเลิก
                  </Button>
                  <Button
                    onClick={addProduct}
                    disabled={isSubmitting || !newProduct.name}
                    className="gap-2 w-full sm:w-auto"
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    บันทึก
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* ตารางแสดงสินค้า */}
        <div className="bg-card rounded-lg border shadow-sm">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">กำลังโหลดข้อมูล...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">ไม่พบข้อมูลสินค้า</h3>
              <p className="text-muted-foreground mt-1">เพิ่มสินค้าใหม่เพื่อเริ่มต้นใช้งาน</p>
            </div>
          ) : (
            <>
              {/* แสดงตารางบนหน้าจอขนาดกลางและใหญ่ */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>ชื่อสินค้า</TableHead>
                      <TableHead>ราคา</TableHead>
                      <TableHead>จำนวน</TableHead>
                      <TableHead>ประเภท</TableHead>
                      <TableHead>รายละเอียด</TableHead>
                      <TableHead className="text-right">จัดการ</TableHead>
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
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => openEditDialog(product)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => openDeleteDialog(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* แสดงการ์ดบนหน้าจอขนาดเล็ก */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {products.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-slate-800 rounded-lg border shadow-sm p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">ID: {product.id}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(product)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => openDeleteDialog(product.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="text-muted-foreground">ราคา:</div>
                      <div className="font-medium">{formatPrice(product.price)}</div>

                      <div className="text-muted-foreground">จำนวน:</div>
                      <div className="font-medium">{product.quantity} ชิ้น</div>

                      <div className="text-muted-foreground">ประเภท:</div>
                      <div className="font-medium">{product.category}</div>
                    </div>

                    {product.description && (
                      <div className="mt-3 pt-3 border-t text-sm">
                        <div className="text-muted-foreground mb-1">รายละเอียด:</div>
                        <div>{product.description}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* หน้าต่างแก้ไขสินค้า */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>แก้ไขสินค้า</DialogTitle>
            <DialogDescription>แก้ไขข้อมูลสินค้า ID: {editProduct.id}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">ชื่อสินค้า</Label>
              <Input
                id="edit-name"
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                placeholder="ระบุชื่อสินค้า"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">ราคา (บาท)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-quantity">จำนวน</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={editProduct.quantity}
                  onChange={(e) => setEditProduct({ ...editProduct, quantity: Number(e.target.value) })}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-category">ประเภท</Label>
              <Select
                value={editProduct.category}
                onValueChange={(value) => setEditProduct({ ...editProduct, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภทสินค้า" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">รายละเอียด</Label>
              <Textarea
                id="edit-description"
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                placeholder="รายละเอียดสินค้า"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="w-full sm:w-auto">
              ยกเลิก
            </Button>
            <Button
              onClick={handleUpdateProduct}
              disabled={isSubmitting || !editProduct.name}
              className="gap-2 w-full sm:w-auto"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              บันทึกการแก้ไข
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* หน้าต่างยืนยันการลบสินค้า */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>ยืนยันการลบสินค้า</DialogTitle>
            <DialogDescription>คุณต้องการลบสินค้านี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้</DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="w-full sm:w-auto">
              ยกเลิก
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
              disabled={isSubmitting}
              className="gap-2 w-full sm:w-auto"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              ยืนยันการลบ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

