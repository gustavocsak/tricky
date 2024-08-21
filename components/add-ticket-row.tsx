import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import {
	Form,
	FormField,
	FormItem,
	FormMessage,
	FormControl,
} from './ui/form'
import { Button } from './ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'
import { Badge } from './ui/badge'
import { useForm } from 'react-hook-form'
import { createTicket } from '@/app/actions'
import { useProjectContext } from '@/context/project-context'
const TicketStatusEnum = z.enum(['OPEN', 'PROGRESS', 'CLOSED']);
const TicketFormSchema = z.object({
	title: z.string().max(30, 'Ticket title must be less than 30 characters').min(1, 'Ticket title must not be empty'),
	author: z.string().max(30, 'Author name must be less than 30 characters').min(1, 'Author name must not be empty'),
	description: z.string().max(100, 'Description must be less than 100 characters').optional(),
	status: TicketStatusEnum
})

export default function AddTicketRow() {
	const { currentProject, setCurrentProject } = useProjectContext();

	async function onSubmit(values: z.infer<typeof TicketFormSchema>) {
		console.log(values)
		if (!values.author || !values.title) {
			return;
		}

		const result = await createTicket(values, currentProject?.id);
		if (!result) {
			console.log('error');
			return;
		}
		console.log(result)
		if (result.error) {
			console.error(result.error);
			return;
		}

		currentProject?.tickets.push(result)
	}

	const form = useForm<z.infer<typeof TicketFormSchema>>({
		resolver: zodResolver(TicketFormSchema),
	})

	return (
		<div className='border-2 border-primary rounded w-full mt-2'>
			<Form {...form}>
				<form className='flex flex-row w-full items-center' onSubmit={form.handleSubmit(onSubmit)}>

					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className='w-3/12 ps-2 pe-1 py-2'>
								<FormControl>
									<Input placeholder="Your ticket title" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className='w-4/12 ps-1 pe-1 py-2'>
								<FormControl>
									<Input placeholder="My new ticket description" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="author"
						render={({ field }) => (
							<FormItem className='w-1/12 ps-1'>
								<FormControl>
									<Input placeholder="Author" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem className='w-2/12 py-2 ps-2'>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
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
						)}
					/>
					<div className="w-2/12 p-2">
					<Button className='w-full'>Add ticket</Button>
					</div>
				</form>
			</Form>
		</div>

	)
}
