import { z } from 'zod'

const TicketStatusEnum = z.enum(['OPEN', 'PROGRESS', 'CLOSED']);

const TicketFormSchema = z.object({
    title: z.string().max(30, 'Ticket title must be less than 30 characters'),
    author: z.string().max(30, 'Author name must be less than 30 characters'),
    description: z.string().max(100, 'Description must be less than 100 characters').optional(),
    status: TicketStatusEnum
})

export default TicketFormSchema