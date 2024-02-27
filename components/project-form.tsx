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
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { createProject, editProject } from '@/app/actions'
import { useProjectContext } from '@/context/project-context'

const ProjectFormSchema = z.object({
    title: z.string().max(30, 'Project title must be less than 30 characters'),
    author: z.string().max(30, 'Author name must be less than 30 characters'),
})

interface ProjectFormProps {
    method: 'PATCH' | 'PUT' | 'POST';
}

interface Project {
    id: string,
    title: string,
    author: string,
    tickets: [],
    createdAt: string
}

const ProjectForm: React.FC<ProjectFormProps> = ({ method }) => {
    const { toast } = useToast()
    const { currentProject, setProject } = useProjectContext()

    const form = useForm<z.infer<typeof ProjectFormSchema>>({
        resolver: zodResolver(ProjectFormSchema),
        defaultValues: {
            title: method === "PATCH" ? currentProject?.title : '',
            author: method === "PATCH" ? currentProject?.author : '',
        }
    })

    async function onSubmit(values: z.infer<typeof ProjectFormSchema>) {
        //TODO: handle errors
        console.log(method)
        if(method === 'PATCH') {
            const result = await editProject(values, currentProject?.id);
            
            if(!result) {
                console.log('error')
                return
            }

            if(result.error) {
                console.error(result.error)
                return
            }
            setProject(result)
            toast({
                description: 'Project updated successfully!',
            })
            return
        }

        if(method === 'POST') {
            const result = await createProject(values);
            // let result = ''
            if(!result) {
                console.log('error')
                return
            }
    
            if(result.error) {
                console.error(result.error)
                return
            }
            
            setProject(result)
            toast({
                description: 'Project created!',
            })

        }
        
        
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                                <Input placeholder="My design project" {...field}  />
                            </FormControl>
                            <FormDescription>
                                This is the project title that will be shown in the menu above.
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
                            <FormLabel>Project Author</FormLabel>
                            <FormControl>
                                <Input placeholder="Gustavo" {...field}  />
                            </FormControl>
                            <FormDescription>
                                This is your name!
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-full'>Submit</Button>
            </form>
        </Form>
    )
}

export default ProjectForm