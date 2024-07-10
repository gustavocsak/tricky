"use client"
import React from 'react'
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
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createTicket, getProject } from '@/app/actions'
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useProjectContext } from '@/context/project-context'
import { DialogTrigger } from '@radix-ui/react-dialog'

const TicketStatusEnum = z.enum(['OPEN', 'PROGRESS', 'DONE']);

const TicketFormSchema = z.object({
    title: z.string().max(30, 'Ticket title must be less than 30 characters').min(1, 'Ticket title must not be empty'),
    author: z.string().max(30, 'Author name must be less than 30 characters').min(1, 'Author name must not be empty'),
    description: z.string().max(100, 'Description must be less than 100 characters').optional(),
    status: TicketStatusEnum
})

export default function TicketForm() {
    const { toast } = useToast()
    const { currentProject, setCurrentProject } = useProjectContext()

    const form = useForm<z.infer<typeof TicketFormSchema>>({
        resolver: zodResolver(TicketFormSchema),
        // defaultValues: {
        //     title: method === "PATCH" ? currentProject?.title : '',
        //     author: method === "PATCH" ? currentProject?.author : '',
        // }
    })

    async function onSubmit(values: z.infer<typeof TicketFormSchema>) {
        //TODO: handle errors
        
        const result = await createTicket(values, currentProject?.id)
        // console.log(result)
        if(!result) {
            console.log('error')
            return
        }
        if(result.error) {
            console.error(result.error)
            return
        }

        const updatedProject = await getProject(currentProject?.id)
        setCurrentProject(updatedProject)

    }

    return (
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
                <DialogTrigger asChild>
                    <Button type="submit" className='w-full'>Submit</Button>
                </DialogTrigger>
            </form>
        </Form>
    )
}
