import {
    TableCell, TableRow,
} from "@/components/ui/table";

import TicketDelete from "./ticket-delete";
import TicketForm from "./ticket-form";
import { Ticket } from "@/lib/types";

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
                <TicketForm ticket={ticket} method="PATCH" dialogTriggerButton="wand" title="Edit ticket" />
            </TableCell>
            <TableCell>
                <TicketDelete tid={ticket.id}/>
            </TableCell>
        </TableRow>
   )
}