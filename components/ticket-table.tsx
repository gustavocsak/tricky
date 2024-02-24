import React from 'react'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import { MagicWandIcon, Cross2Icon } from '@radix-ui/react-icons';
import TicketInfo from './ticket-info';
import { Button } from './ui/button';

interface Ticket {
    id: string;
    author: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    projectId: string;
}

interface TicketTableProps {
    tickets: Ticket[];
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {

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
                
                    {tickets ? (
                        <TableBody>
                        {tickets.map((ticket) => (
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
                        ))}
                        </TableBody>
                    ) : null}
                
            </Table>
        </div>
    )
}

export default TicketTable