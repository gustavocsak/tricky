import { getLatestTickets } from "@/app/actions"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Status, Ticket } from "@/lib/types"

export default function LatestTickets() {

  const [tickets, setTickets] = useState<Ticket[]>([]);
  useEffect(() => {
    async function fetchTickets() {
      const latestTickets = await getLatestTickets();
      setTickets(latestTickets.slice(0,3));
    }
    fetchTickets();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest tickets</CardTitle>
        <CardDescription>Here are your latest added tickets</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
          {tickets.map(ticket => {
            return <TicketCard title={ticket.title} createdAt={ticket.createdAt} status={ticket.status} />
          })}
      </CardContent>
    </Card>
  )
}

interface TicketProps {
  title: string,
  createdAt: string,
  status: Status
}

function TicketCard({title, createdAt, status}: TicketProps) {
  return (
    <div className="flex items-center-space-x-4 rounded-md border p-2">
      <p className="text-sm">{title}</p>
      <p className="text-sm">{createdAt}</p>
      <p className="text-sm">{status}</p>
    </div>

  )
}