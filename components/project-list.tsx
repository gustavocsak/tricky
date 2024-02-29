'use client'
import { Button } from '@/components/ui/button';
import { useProjectContext } from '@/context/project-context';
import { CommitIcon } from '@radix-ui/react-icons';
import { getProject } from '@/app/actions'; 

interface Project {
    id: string,
    title: string,
    author: string,
    tickets: [],
    createdAt: string
}

interface ProjectListProps {
    data: Project[];
}

export default function ProjectList({ data }: ProjectListProps) {
    const { currentProject, setProject } = useProjectContext()

    async function handleProjectClick(project: Project) {
        
        console.log(project);
        const result = await getProject(project.id);
        setProject(result);
        
    }

    return (
        <ul>
            {data.map((project) => {
                return (
                    <li key={project.id}>
                        <Button variant={currentProject?.id === project.id ? 'default' : 'ghost'}
                            className='w-full flex gap-4 justify-start items-center'
                            onClick={() => setProject(project)}
                        >
                            <CommitIcon />
                            {project.title}
                        </Button>
                    </li>
                )
            })}
        </ul>
    )
}
