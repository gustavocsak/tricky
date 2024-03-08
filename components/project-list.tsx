'use client'
import { useEffect } from 'react';
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
    
    const { currentProject, setProject, setProjects } = useProjectContext();
    useEffect(() => {
        function setInitialProjects() {
            setProjects(data);
        }
        setInitialProjects();
    }, [data, setProjects])
   
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
