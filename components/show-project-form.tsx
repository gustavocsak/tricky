'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ProjectForm from './project-form'
import { PlusIcon } from '@radix-ui/react-icons'

export default function ShowProjectForm() {
    const [showForm, setShowForm] = useState(false)
    return (
        <>
            <Button 
                className='w-full mr-auto'
                onClick={() => setShowForm(!showForm)}
            >
                <PlusIcon className='w-1/12'/>
                <span className='w-11/12'>New Project</span>
            </Button>
            {showForm && (
                <ProjectForm method="POST" />
            )}
        </>
        
    )
}