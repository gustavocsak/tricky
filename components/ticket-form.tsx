"use client"
import React, { FC, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createTicket, editTicket, getProject } from '@/app/actions'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useProjectContext } from '@/context/project-context'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MagicWandIcon } from '@radix-ui/react-icons'
import { Ticket } from '@/lib/types'


const TicketStatusEnum = z.enum(['OPEN', 'PROGRESS', 'CLOSED']);

const TicketFormSchema = z.object({
    title: z.string().max(30, 'Ticket title must be less than 30 characters').min(1, 'Ticket title must not be empty'),
    author: z.string().max(30, 'Author name must be less than 30 characters').min(1, 'Author name must not be empty'),
    description: z.string().max(100, 'Description must be less than 100 characters').optional(),
    status: TicketStatusEnum
})

interface TicketFormProps {
    dialogTriggerButton: string;
    method: string;
    ticket?: Ticket;
    title: string;
}

export default function TicketForm({ dialogTriggerButton, method, ticket, title }: TicketFormProps) {
    const [open, setOpen] = useState(false);
    const { currentProject, setCurrentProject } = useProjectContext()

    const form = useForm<z.infer<typeof TicketFormSchema>>({
        resolver: zodResolver(TicketFormSchema),
        defaultValues: {
            title: method === "PATCH" ? ticket?.title : '',
            author: method === "PATCH" ? ticket?.author : '',
            description: method === "PATCH" ? ticket?.description : '',
            status: method === "PATCH" ? ticket?.status : undefined
        }
    })

    async function onSubmit(values: z.infer<typeof TicketFormSchema>) {
        //TODO: handle errors

        if (method === 'PATCH') {
            if (!values.author || !values.title) {
                console.log('error');
                return;
                // TODO: handle error
            }
            const result = await editTicket(values, ticket?.id);
            if (!result) {
                console.log('error');
                return;
            } 
            if (result.error) {
                console.error(result.error)
                return
            }
            setOpen(false);
            const updatedProject = await getProject(currentProject?.id)
            setCurrentProject(updatedProject)

        }

        if (method === 'POST') {
            if (!values.author || values.title) {
                return;
            }
            const result = await createTicket(values, currentProject?.id)
            if (!result) {
                console.log('error')
                return
            }
            if (result.error) {
                console.error(result.error)
                return
            }

            setOpen(false);
            const updatedProject = await getProject(currentProject?.id)
            setCurrentProject(updatedProject)

        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {dialogTriggerButton == "wand" ?
                    <Button variant={"ghost"}><MagicWandIcon /></Button> :
                    <Button>New ticket</Button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Add the information of your new ticket here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
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
                            <Button type="submit" className='w-full'>Submit</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>

    )
}
