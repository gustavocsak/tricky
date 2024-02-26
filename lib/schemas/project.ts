import { z } from 'zod'

const ProjectFormSchema = z.object({
    title: z.string().max(30, 'Project title must be less than 30 characters'),
    author: z.string().max(30, 'Author name must be less than 30 characters'),
})

export default ProjectFormSchema