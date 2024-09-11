import { Button } from "@/components/ui/button";
import { useProjectContext } from "@/context/project-context";
import { CommitIcon } from '@radix-ui/react-icons';
import { Project } from "@/lib/types";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { currentProject, setCurrentProject } = useProjectContext();

    return (
        <li>
            <Button
                variant={currentProject?.id === project.id ? 'default' : 'ghost'}
                className='w-full flex gap-4 justify-start items-center'
                onClick={() => setCurrentProject(project)}
            >
                <CommitIcon />
                {project.title}
            </Button>
        </li>
    )
}