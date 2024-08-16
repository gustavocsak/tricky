import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TableRow, TableCell } from './ui/table'
import { Input } from './ui/input'
import {
	Form,
	FormField,
	FormDescription,
	FormItem,
	FormMessage,
	FormControl,
	FormLabel
} from './ui/form'
import { Button } from './ui/button'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './ui/select'
import { Badge } from './ui/badge'
import { useForm } from 'react-hook-form'
import { createTicket, getProject } from '@/app/actions'
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

		if (!values.author || !values.title) {
			return;
		}

		const result = await createTicket(values, currentProject?.id);
		if (!result) {
			console.log('error');
			return;
		}
		if (result.error) {
			console.error(result.error);
			return;
		}

		const updatedProject = await getProject(currentProject?.id);
		setCurrentProject(updatedProject);
	}

	const form = useForm<z.infer<typeof TicketFormSchema>>({
		resolver: zodResolver(TicketFormSchema),
	})

	return (
		<div className='border-2 border-primary w-full'>
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
										<SelectItem value="OPEN">Open</SelectItem>
										<SelectItem value="PROGRESS">In progress</SelectItem>
										<SelectItem value="CLOSED">Closed</SelectItem>
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

/**
 * <Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder="Create new feature" {...field} />
										</FormControl>
										<FormDescription>
											Ticket title that will be displayed in the project table.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="author"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Author</FormLabel>
										<FormControl>
											<Input placeholder="Gustavo" {...field} />
										</FormControl>
										<FormDescription>
											This is your name!
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description (optional)</FormLabel>
										<FormControl>
											<Textarea
												placeholder="The new feature should have a button to create a new project."
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Add any details for your ticket here.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a status for your ticket" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="OPEN">Open</SelectItem>
												<SelectItem value="PROGRESS">In progress</SelectItem>
												<SelectItem value="CLOSED">Closed</SelectItem>
											</SelectContent>
										</Select>
										<FormDescription>
											The current status for your tikcet
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
 */