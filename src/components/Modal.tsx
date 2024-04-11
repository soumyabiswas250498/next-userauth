
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function Modal(props: any) {
    const { isModalOpen, setIsModalOpen, children } = props;
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} modal>
            <DialogContent >
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal