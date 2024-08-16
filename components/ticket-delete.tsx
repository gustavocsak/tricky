import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
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
import { useToast } from "./ui/use-toast";
import { useProjectContext } from "@/context/project-context";
import { deleteTicket, getProject } from "@/app/actions";

interface TicketDeleteProps {
    tid: string
}

export default function TicketDelete({ tid } : TicketDeleteProps) {
    const { currentProject, setCurrentProject } = useProjectContext();
    const { toast } = useToast()

    /**
     * Delete the current selected project
     * Makes a DELETE request to the api at /api/projects/:id
     */
    async function handleDelete() {
        
        const result = await deleteTicket(tid);
        if(!result) {
            console.log('error')
            return
        }
        if(result.error) {
            console.error(result.error)
            return
        }  
        
        if (currentProject) {
            currentProject.tickets = currentProject?.tickets.filter((ticket) => {
                return ticket.id !== tid;
            })
        }

        toast({
            description: `Ticket ${tid} deleted successfully.`,
        })
    }

    return (
         <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost">
                        <Cross2Icon className='text-red-600' />
                    </Button>
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