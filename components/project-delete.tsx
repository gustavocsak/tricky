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
import { deleteProject } from '@/app/actions'
import { useToast } from "@/components/ui/use-toast"

const ProjectDelete = () => {
    const { currentProject, setProject } = useProjectContext();
    const { toast } = useToast()

    /**
     * Delete the current selected project
     * Makes a DELETE request to the api at /api/projects/:id
     */
    const handleDelete = async () => {
        const result = await deleteProject(currentProject?.id);
        if(!result) {
            console.log('error')
            return
        }
        if(result.error) {
            console.error(result.error)
            return
        }
        
        setProject(null)
        toast({
            description: 'Project updated successfully!',
        })
        return
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