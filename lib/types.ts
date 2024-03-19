export interface Project {
    id: string,
    title: string,
    author: string,
    tickets: [],
    createdAt: string
}

export interface Ticket {
    id: string;
    author: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    projectId: string;
}