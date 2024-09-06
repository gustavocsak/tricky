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
import { Badge } from "../ui/badge"

export default function LatestTickets() {

  const [tickets, setTickets] = useState<Ticket[]>([]);
  useEffect(() => {
    async function fetchTickets() {
      const latestTickets = await getLatestTickets();
      setTickets(latestTickets.slice(0, 3));
    }
    fetchTickets();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl">Latest tickets</CardTitle>
        <CardDescription>Here are your three latest added tickets</CardDescription>
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



function TicketCard({ title, createdAt, status }: TicketProps) {
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
  const statusDisplay = status.toString().charAt(0) + status.toLowerCase().substring(1);
  const variant = mapStatus(status);
  return (
    <div className="flex flex-row justify-around rounded-md border p-2">
      <div className="text-center text-sm w-4/12">{title}</div>
      <div className="text-center text-sm w-4/12">{createdAt.slice(0,10)}</div>
      <div className="text-center text-sm w-4/12"><Badge variant={variant}>{statusDisplay}</Badge></div>
    </div>

  )
}

