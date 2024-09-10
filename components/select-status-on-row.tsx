import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Badge } from "./ui/badge";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from './ui/form'
import { editTicket } from '@/app/actions';
import { Ticket } from '@/lib/types';
import { useForm } from 'react-hook-form'
import { useProjectContext } from '@/context/project-context';
const TicketStatusEnum = z.enum(['OPEN', 'PROGRESS', 'CLOSED']);
const TicketFormSchema = z.object({
  status: TicketStatusEnum
})

interface SelectStatusOnRowProps {
  ticket: Ticket
}

export default function SelectStatusOnRow({ ticket }: SelectStatusOnRowProps) {
  const { currentProject } = useProjectContext();
  async function onSubmit(values: z.infer<typeof TicketFormSchema>) {
    const result = await editTicket({...ticket, status: values.status}, ticket.id);
    if (!result) {
      console.log('error');
      return;
    }
    if (result.error) {
        console.error(result.error)
        return
    }

    if (currentProject) {
        const editIndex = currentProject.tickets.findIndex((t) => {
            return t.id == ticket?.id
        })
        currentProject.tickets[editIndex] = result;
    }
  }
  const form = useForm<z.infer<typeof TicketFormSchema>>({
		resolver: zodResolver(TicketFormSchema),
	})
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className=''>
              <Select onValueChange={(value) => {
                  field.onChange(value);
                  form.handleSubmit(onSubmit)();
                }}
                defaultValue={ticket.status}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a ticket status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="OPEN">
                    <Badge variant="open">Open</Badge>
                  </SelectItem>
                  <SelectItem value="PROGRESS">
                    <Badge variant="progress">Progress</Badge>
                  </SelectItem>
                  <SelectItem value="CLOSED">
                    <Badge variant="closed">Closed</Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </form>
      </Form>
  )
}