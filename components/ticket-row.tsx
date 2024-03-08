import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Cross2Icon, MagicWandIcon } from "@radix-ui/react-icons";

interface Ticket {
    id: string;
    author: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    projectId: string;
}

interface TicketRowProps {
    ticket: Ticket;
}

export default function TicketRow({ ticket }: TicketRowProps) {
   return (
        <TableRow key={ticket.id}>
            <TableCell>{ticket.title}</TableCell>
            <TableCell>{ticket.author}</TableCell>
            <TableCell>{ticket.status}</TableCell>
            <TableCell>
                <Button variant="ghost">
                    <MagicWandIcon />
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="ghost">
                    <Cross2Icon className='text-red-600' />
                </Button>
            </TableCell>
        </TableRow>
   )
}