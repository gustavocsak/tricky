'use client'

import ShowProjectForm from './show-project-form'
import ProjectList from './project-list'
import { Project } from '@/lib/types'
import { useProjectContext } from '@/context/project-context';

interface SideMenuProps {
    data: Project[];
}

export default function SideMenu({ data }: SideMenuProps) {
    const { setProjects } = useProjectContext();
    setProjects(data);

    return (
        <div className='p-4 w-72 border-r-2 border-border/90 flex gap-8 flex-col justify-between overflow-auto'
        style={{ maxHeight: `calc(100vh - 62px)` }}
            >
            <ProjectList />
            <ShowProjectForm />
        </div>
    )
}
