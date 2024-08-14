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
                        <TableHead className="font-medium">Title</TableHead>
                        <TableHead className="w-[200px] font-medium">Author</TableHead>
                        <TableHead className="w-[200px] font-medium">Status</TableHead>
                        <TableHead className="w-[60px] font-medium text-center">Edit</TableHead>
                        <TableHead className="w-[60px] font-medium">Delete</TableHead>
                    </TableRow>
                </TableHeader>   
                <TableBody>
                    {tickets?.map((ticket) => (
                        <TicketRow key={ticket.id} ticket={ticket} />
                    ))}
                </TableBody>    
                <TableFooter>
                    <AddTicketRow />
                </TableFooter>
            </Table>
        </div>
    )
}
