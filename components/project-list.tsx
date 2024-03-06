'use client'
import { useQuery } from '@tanstack/react-query';

import { getProjects } from '@/app/actions';
import ProjectCard from './project-card';

interface Project {
    id: string,
    title: string,
    author: string,
    tickets: [],
    createdAt: string
}


export default function ProjectList(/*{ data }: ProjectListProps*/) {
    
    const { data } = useQuery({ queryKey: ['projects'], queryFn: getProjects })
   

    return (
        <ul>
            {data?.map((project: Project) => {
                return (
                    <ProjectCard project={project} key={project.id} />
                )
            })}
        </ul>
    )
}
