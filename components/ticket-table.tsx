import React, { useEffect, useState } from 'react'
import {
    Table, TableBody, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import { useProjectContext } from '@/context/project-context';
import { getProject } from '@/app/actions'
import TicketRow from './ticket-row';
import LoadingRow from './loading-row';
import { Ticket } from '@/lib/types';

interface TicketTableProps {
    tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
    const { currentProject } = useProjectContext();
    const [loading, setLoading] = useState(false);
    const [projectTickets, setProjectTickets] = useState<Ticket[]>([]);
    
    useEffect(() => {
        async function getTickets() {
            setLoading(true)
            console.log('true')
            if (currentProject) {
                const response = await getProject(currentProject.id);
                console.log(response)
                setProjectTickets(response.tickets)
            }
            setLoading(false)
        }
    
        getTickets();
    }, [currentProject])

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
                {loading ? (
                    <LoadingRow />     
                ) : 
                    <TableBody>
                        {projectTickets.map((ticket) => (
                            <TicketRow key={ticket.id} ticket={ticket} />
                        ))}
                    </TableBody>
                }
            </Table>
        </div>
    )
}
