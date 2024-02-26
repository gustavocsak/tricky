"use client"

import React, { useEffect, useState, useRef } from 'react'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { CommitIcon } from '@radix-ui/react-icons'
import { useProjectContext } from '@/context/project-context'
import ProjectForm from './project-form'

interface Project {
    id: string,
    title: string,
    author: string,
    tickets: [],
    createdAt: string
}

const SideMenu = () => {
    const [loading, setLoading] = useState(true)
    const { currentProject, setProject, projects, setProjects } = useProjectContext();
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [error, setError] = useState(null)

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects')
            if (!response.ok) {
                throw new Error()
            }
            const result = await response.json()
            setProjects(result)
            setLoading(false)

        } catch (error) {
            console.error(error)
        }
    }

    const handleProjectSubmit = async (result: any) => {
        await fetchProjects()
        setProject(result)
    }

    useEffect(() => {
        fetchProjects()
    })

    return (
        <div className='p-4 w-72 border-r-2 border-border/90 flex gap-8 flex-col justify-between overflow-auto'
             style={{ maxHeight: `calc(100vh - 62px)` }}  
        >
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
                                <Button variant={currentProject?.id === project.id ? 'default' : 'ghost'}
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
            <div className='flex flex-col gap-4'>
                <div>
                    <Button
                        className='w-full'
                        onClick={() => setShowProjectForm(!showProjectForm)}
                    >
                        New Project
                    </Button>
                </div>
                {showProjectForm && 
                    <div>
                        <ProjectForm handleProjectSubmit={handleProjectSubmit} project={null}/>
                    </div>
                }

            </div>
        </div>
    )
}

export default SideMenu