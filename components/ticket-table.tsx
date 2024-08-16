import React from 'react'
import {
    Table, TableBody, TableHead, TableHeader, TableRow, TableFooter
} from "@/components/ui/table";

import TicketRow from './ticket-row';
import LoadingRow from './loading-row';
import { Ticket } from '@/lib/types';
import AddTicketRow from './add-ticket-row';

interface TicketTableProps {
    tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
    
    return (
        <div className="rounded-md sm:border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-7/12 font-medium">Title</TableHead>
                        <TableHead className="w-1/12 font-medium">Author</TableHead>
                        <TableHead className="w-2/12 font-medium">Status</TableHead>
                        <TableHead className="w-1/12 font-medium text-center">Edit</TableHead>
                        <TableHead className="w-1/12 font-medium">Delete</TableHead>
                    </TableRow>
                </TableHeader>   
                <TableBody>
                    {tickets?.map((ticket) => (
                        <TicketRow key={ticket.id} ticket={ticket} />
                    ))}
                </TableBody>    
                
                    
                
            </Table>
            <AddTicketRow />
        </div>
    )
}
