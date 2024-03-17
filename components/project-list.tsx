'use client'
import ProjectCard from './project-card';
import { useProjectContext } from '@/context/project-context';

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
