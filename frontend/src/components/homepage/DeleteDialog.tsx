import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface DeleteDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onDelete: () => void
    isSubmitting: boolean
  }
  
export default function DeleteDialog({ isOpen, onOpenChange, onDelete, isSubmitting }: DeleteDialogProps) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Deleting Product</DialogTitle>
            <DialogDescription>Are you sure you want to delete this product?<br /> This action is irreversible.</DialogDescription>
          </DialogHeader>
  
          <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={isSubmitting}
              className="gap-2 w-full sm:w-auto"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }