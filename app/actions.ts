'use server'

import { z } from 'zod'
import ProjectFormSchema from './../lib/schemas/project';
import { revalidateTag } from 'next/cache';

type Project = z.infer<typeof ProjectFormSchema>

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

export async function getProjectById(id: string) {
    const response = await fetch(`http://localhost:3000/api/projects/${id}`)
    return response.json()
}