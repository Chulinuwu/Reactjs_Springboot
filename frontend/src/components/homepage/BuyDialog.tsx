import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BuyDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    productName: string;
    quantity: number;
    isSubmitting: boolean;
}

export default function BuyDialog({
    isOpen,
    onOpenChange,
    onConfirm,
    productName,
    quantity,
    isSubmitting,
}: BuyDialogProps) {
return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
                You are about to buy <strong>{productName}</strong> with a quantity of{" "}
                <strong>{quantity}</strong>.
            </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
            <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
            >
                Cancel
            </Button>
            <Button
                onClick={onConfirm}
                disabled={isSubmitting}
                className="gap-2 w-full sm:w-auto hover:bg-green-500"
            >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Confirm Purchase
            </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);
}