import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TicketForm from "./ticket-form"

export default function AddTicket() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>New Ticket</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a new ticket</DialogTitle>
                    <DialogDescription>
                        Add the information of your new ticket here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <TicketForm />
                </div>
            </DialogContent>
        </Dialog>
    )
}