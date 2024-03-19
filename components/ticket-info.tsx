import React from 'react'
import { TableCell, TableRow } from "@/components/ui/table";
import { Ticket } from '@/lib/types'

interface TicketTableProps {
    ticket: Ticket;
}

const TicketInfo: React.FC<TicketTableProps> = ({ ticket }) => {
    console.log(ticket)
    return (
        <>
            <TableRow>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.author}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.createdAt}</TableCell>
            </TableRow>
        </>
    )
}

export default TicketInfo