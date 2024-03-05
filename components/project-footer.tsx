import ProjectDelete from "./project-delete";
import ProjectEdit from "./project-edit";

interface ProjectFooterProps {
    author: string;
    createdAt: string;
}

export default function ProjectFooter({ author, createdAt }: ProjectFooterProps) {
    return (
        <>
            <section>
                <h3 className='text-lg font-semibold'>Project details</h3>
                <p>Author: {author}</p>
                <p>Created: {createdAt.substring(0,10)}</p>
            </section>
            <div className='space-x-2'>
                <ProjectDelete />
                <ProjectEdit />
            </div>
        </>
    )
}