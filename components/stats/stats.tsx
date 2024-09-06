import LatestTickets from "./latest-tickets"
import TaskByProject from "./task-by-project"
export default function Stats() {
  return (
    <div className="flex flex-row overflow-auto">
      <div className="w-1/2">
        <TaskByProject />
        <LatestTickets />


      </div>
      <div>
        asjhd
      </div>
    </div>
  )
}