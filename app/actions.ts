'use server'

import { z } from 'zod'
import ProjectFormSchema from './../lib/schemas/project';
import TicketFormSchema from '@/lib/schemas/ticket';
import { revalidateTag } from 'next/cache';

type Project = z.infer<typeof ProjectFormSchema>
type Ticket = z.infer<typeof TicketFormSchema>

export async function createProject(project: Project) {
    const result = ProjectFormSchema.safeParse(project)

    if(result.success) {
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            body: JSON.stringify(result.data)
        })
        revalidateTag('get-projects')
        return response.json()
    }

    if(result.error) {
        return { success: false, error: result.error.format() }
    }
}

export async function editProject(project: Project, id: string | undefined) {
    if(!id) {
        return { success: false, error: 'No id provided' }
    }
    const result = ProjectFormSchema.safeParse(project)
    if(result.success) {
        const response = await fetch(
            `http://localhost:3000/api/projects/${id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(result.data)
            }
        )
        revalidateTag('get-projects')
        return response.json()
    }

    if(result.error) {
        return { success: false, error: result.error.format() }
    }
}

export async function deleteProject(id: string | undefined) {

    if(!id) {
        return
    }

    const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Failed to delete project');
    }

    revalidateTag('get-projects')
    return response.json()
}

export async function getProject(id: string | undefined) {
    const response = await fetch(`http://localhost:3000/api/projects/${id}`)
    return response.json()
}

export async function getProjects() {
    const response = await fetch('http://localhost:3000/api/projects')
    return response.json()
}

export async function createTicket(ticket: Ticket, projectId: string | undefined) {
    if(!projectId) {
        return
    }
    const result = TicketFormSchema.safeParse(ticket)
    if(result.success) {
        const response = await fetch('http://localhost:3000/api/tickets', {
            method: 'POST',
            body: JSON.stringify({...result.data, projectId})
        })
        revalidateTag('get-projects')
        return response.json()
    }

    if(result.error) {
        return { success: false, error: result.error.format() }
    }
}

export async function deleteTicket(id: string) {

    if(!id) {
        return
    }

    const response = await fetch(`http://localhost:3000/api/tickets/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Failed to delete ticket');
    }

    revalidateTag('get-projects')
    return response.json()

}

export async function editTicket(ticket: Ticket, id: string | undefined) {
    if(!id) {
        return { success: false, error: 'No id provided' }
    }
    const result = TicketFormSchema.safeParse(ticket);
    // console.log(project)
    if(result.success) {
        const response = await fetch(
            `http://localhost:3000/api/tickets/${id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(result.data)
            }
        )
        revalidateTag('get-projects')
        return response.json()
    }

    if(result.error) {
        return { success: false, error: result.error.format() }
    }
}

export async function getLatestTickets() {
    const response = await fetch('http://localhost:3000/api/tickets');
    return response.json();
}