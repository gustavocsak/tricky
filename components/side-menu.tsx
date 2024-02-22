"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { CommitIcon } from '@radix-ui/react-icons'
import { useProjectContext } from '@/context/project-context'

interface Project {
    id: string,
    title: string,
    author: string,
    tickets: [],
    createdAt: string
}

const SideMenu = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const { setProject } = useProjectContext();
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects')                
                if(!response.ok) {
                    throw new Error()
                }
                const result = await response.json()
                setProjects(result)
                setLoading(false)
                
            } catch(error) {
                console.error(error)
            }
        }

        fetchProjects()
    }, [])
    return (
        <div className='p-4 w-72 border-r-2 border-border/90 flex flex-col justify-between'>
            <div>
                {loading &&
                    <div className='flex gap-4 flex-col'>
                        <Skeleton className="w-full h-6 rounded-full" />
                        <Skeleton className="w-full h-6 rounded-full" />
                        <Skeleton className="w-full h-6 rounded-full" />
                    </div>
                }
                <ul>
                    {projects.map((project) => {
                        return (
                        <li key={project.id}>
                            <Button variant="ghost"
                                    className='w-full flex gap-4 justify-start items-center'
                                    onClick={() => setProject(project)}
                            >
                                <CommitIcon />
                                {project.title}
                            </Button>
                        </li>)
                    })}
                </ul>
            </div>
            <div>
                <Button className='w-full'>Add Project</Button>
            </div>
        </div>
    )
}

export default SideMenu