'use client'
import ProjectCard from './project-card';
import { useProjectContext } from '@/context/project-context';
import { Project } from '@/lib/types';

export default function ProjectList() {
    const { projects } = useProjectContext();
    return (
        <ul>
            {projects?.map((project: Project) => {
                return (
                    <ProjectCard project={project} key={project.id} />
                )
            })}
        </ul>
    )
}
