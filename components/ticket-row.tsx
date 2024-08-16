import {
    TableCell, TableRow,
} from "@/components/ui/table";

import TicketDelete from "./ticket-delete";
import TicketEdit from "./ticket-edit";
import { Ticket } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Status } from "@/lib/types";

interface TicketRowProps {
    ticket: Ticket;
}

export default function TicketRow({ ticket }: TicketRowProps) {
    const mapStatus = (status: Status) => {
        switch(status) {
            case Status.OPEN:
                return "open";
            case Status.CLOSED:
                return "closed";
            case Status.PROGRESS:
                return "progress";
            default:
                return "default";
        }
    }
    const statusDisplay = ticket.status.toString().charAt(0) + ticket.status.toLowerCase().substring(1);
    const variant = mapStatus(ticket.status);
    
    return (
        <TableRow key={ticket.id}>
            <TableCell>
                <div className="flex flex-col gap-4">
                    <p className="font-medium">{ticket.title}</p>
                    <p className="text-zinc-400">{ticket.description}</p>
                </div>
            </TableCell>
            <TableCell>{ticket.author}</TableCell>
            <TableCell><Badge variant={variant}>{statusDisplay}</Badge></TableCell>
            <TableCell className="text-center">
                <TicketEdit ticket={ticket} />
            </TableCell>
            <TableCell>
                <TicketDelete tid={ticket.id}/>
            </TableCell>
        </TableRow>
   )
}