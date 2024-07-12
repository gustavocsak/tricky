import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function TicketForm() {

    // async function handleDelete() {
    //     const result = await deleteProject(currentProject?.id);
    //     if(!result) {
    //         console.log('error')
    //         return
    //     }
    //     if(result.error) {
    //         console.error(result.error)
    //         return
    //     }
        
    //     toast({
    //         description: `Project ${currentProject?.title} deleted successfully.`,
    //     })

    //     setCurrentProject(null)
        
    //     return
    // }

    return (
        <Button variant="ghost">
            <Cross2Icon className='text-red-600' />
        </Button>
    )
}