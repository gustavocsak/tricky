import TicketForm from './ticket-form';

interface ProjectHeaderProps {
    title: string;
}

export default function ProjectHeader({ title }: ProjectHeaderProps) {

    return ( 
        <article className='flex flex-col gap-2'>
            <section className='flex justify-between items-center py-2'>
                <h2 className='text-2xl font-bold'>
                    {title}
                </h2>
                <TicketForm method="POST" dialogTriggerButton={"New ticket"} title="Create a new ticket"/>

            </section>
        </article>
    )
}