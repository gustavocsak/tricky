import React from 'react'
import { useProjectContext } from '@/context/project-context'
import { Button } from './ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ProjectDelete = () => {
    const { currentProject, setProject, projects, setProjects } = useProjectContext();

    /**
     * Delete the current selected project
     * Makes a DELETE request to the api at /api/projects/:id
     */
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/projects/${currentProject?.id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error('Failed to delete project');
            }
            const newProjects = projects.filter(project => project.id !== currentProject?.id)
            setProject(null)
            setProjects(newProjects)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='destructive'>Delete Project</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                        This will permanently delete your project
                        and remove your data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction 
                        onClick={handleDelete}
                        variant='destructive'
                    >
                        Continue
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ProjectDelete