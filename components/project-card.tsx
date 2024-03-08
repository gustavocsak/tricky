import { Button } from "@/components/ui/button";
import { useProjectContext } from "@/context/project-context";
import { CommitIcon } from '@radix-ui/react-icons';

interface Project {
    id: string,
    title: string,
    author: string,
    tickets: [],
    createdAt: string
}

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {

    const { currentProject, setProject } = useProjectContext();

    return (
        <li>
            <Button 
                variant={currentProject?.id === project.id ? 'default' : 'ghost'}
                className='w-full flex gap-4 justify-start items-center'
                onClick={() => setProject(project)}
            >
                <CommitIcon />
                {project.title}
            </Button>
        </li>
    )
}