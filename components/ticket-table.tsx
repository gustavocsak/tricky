import React from 'react'
import {
    Table, TableBody, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import TicketRow from './ticket-row';
import LoadingRow from './loading-row';
import { Ticket } from '@/lib/types';

interface TicketTableProps {
    tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
   
    return (
        <div className="rounded-md sm:border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-medium">Title</TableHead>
                        <TableHead className="font-medium">Author</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="w-[15px] font-medium"></TableHead>
                        <TableHead className="w-[15px] font-medium"></TableHead>
                    </TableRow>
                </TableHeader>   
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TicketRow key={ticket.id} ticket={ticket} />
                        ))}
                    </TableBody>    
            </Table>
        </div>
    )
}
