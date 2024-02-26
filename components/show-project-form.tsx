'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ProjectForm from './project-form'

export default function ShowProjectForm() {
    const [showForm, setShowForm] = useState(false)
    return (
        <>
            <Button 
                className='w-full'
                onClick={() => setShowForm(!showForm)}
            >
                New Project
            </Button>
            {showForm && (
                <ProjectForm project={null}/>
            )}
        </>
        
    )
}