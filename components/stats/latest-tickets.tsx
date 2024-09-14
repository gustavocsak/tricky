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
import { Project, Status, Ticket } from "@/lib/types"
import { Badge } from "../ui/badge"

interface LatestTicket extends Ticket {
  project?: Project
  projectTitle: string
}

export default function LatestTickets() {

  const [latestTickets, setLatestTickets] = useState<LatestTicket[]>([]);

  useEffect(() => {
    async function fetchTickets() {
      const latestTickets = await getLatestTickets();
      setLatestTickets(latestTickets.map((item: LatestTicket) => {
        const { project, ...ticket } = item;
        return {
          ...ticket,
          projectTitle: project?.title
        }
      }).slice(0,3));
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
        {latestTickets.map(item => {
          return <TicketCard title={item.title} createdAt={item.createdAt} status={item.status} project={item.projectTitle} />
        })}
      </CardContent>
    </Card>
  )
}

interface TicketCardProps {
  title: string,
  createdAt: string,
  status: Status,
  project: string
}

function TicketCard({ title, createdAt, status, project }: TicketCardProps) {
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
      <div className="text-center text-sm w-3/12">{title}</div>
      <div className="text-center text-sm w-3/12">{createdAt.slice(0,10)}</div>
      <div className="text-center text-sm w-3/12">{project}</div>
      <div className="text-center text-sm w-3/12"><Badge variant={variant}>{statusDisplay}</Badge></div>
    </div>

  )
}

