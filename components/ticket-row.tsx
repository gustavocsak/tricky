import {
    TableCell, TableRow,
} from "@/components/ui/table";

import TicketDelete from "./ticket-delete";
import TicketEdit from "./ticket-edit";
import { Ticket } from "@/lib/types";
import SelectStatusOnRow from "./select-status-on-row";

interface TicketRowProps {
    ticket: Ticket;
}

export default function TicketRow({ ticket }: TicketRowProps) {
    return (
        <TableRow key={ticket.id}>
            <TableCell>
                <div className="flex flex-col gap-4">
                    <p className="font-medium">{ticket.title}</p>
                    <p className="text-zinc-400">{ticket.description}</p>
                </div>
            </TableCell>
            <TableCell>{ticket.author}</TableCell>
            <TableCell>
                <SelectStatusOnRow ticket={ticket} />
            </TableCell>
            <TableCell className="text-center">
                <TicketEdit ticket={ticket} />
            </TableCell>
            <TableCell>
                <TicketDelete tid={ticket.id}/>
            </TableCell>
        </TableRow>
   )
}