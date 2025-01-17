export interface Ticket {
  id: string;
  author: string;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
  projectId: string;
}

export interface Project {
  id: string;
  title: string;
  author: string;
  tickets: Ticket[];
  createdAt: string;
}

export enum Status {
  OPEN = "OPEN",
  PROGRESS = "PROGRESS",
  CLOSED = "CLOSED",
}
