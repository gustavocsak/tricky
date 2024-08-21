"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useProjectContext } from "@/context/project-context"
import { Status, Ticket } from "@/lib/types"

const chartConfig = {
  open: {
    label: "Open",
    color: "hsl(var(--chart-2))",
  },
  progress: {
    label: "Progress",
    color: "hsl(var(--chart-1))",
  },
  closed: {
    label: "Closed",
    color: "hsl(var(--chart-5))",
  }
} satisfies ChartConfig

export default function TaskByProject() {
  const { projects } = useProjectContext();
  const countTicketByStatus = (tickets: Ticket[]) => {
    const count = {open: 0, progress: 0, closed: 0};
    for (const ticket of tickets) {
      if (ticket.status == "OPEN") count.open++;
      if (ticket.status == "PROGRESS") count.progress++;
      if (ticket.status == "CLOSED") count.closed++;
    }
    return count;
  }
  const data = projects.map(project => {
    let count = countTicketByStatus(project.tickets);
    return {
      project: project.title,
      ...count
    }
  })
  console.log(data)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets by Project</CardTitle>
        <CardDescription>How are tasks going throughout your projects</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="project"
              tickLine={false}
              tickMargin={10}
              axisLine={false}

            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="open"
              stackId="a"
              fill="var(--color-open)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="progress"
              stackId="a"
              fill="var(--color-progress)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="closed"
              stackId="a"
              fill="var(--color-closed)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}