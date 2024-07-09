'use client'
import ProjectCard from './project-card';
import { useProjectContext } from '@/context/project-context';
import { Project } from '@/lib/types';
interface ProjectListProps {
    data: Project[];
}

export default function ProjectList({ data }: ProjectListProps) {
    const { setProjects } = useProjectContext();

    /* To be used in project-view */
    setProjects(data);

    return (
        <ul>
            {data.map((project: Project) => {
                return (
                    <ProjectCard project={project} key={project.id} />
                )
            })}
        </ul>
    )
}
