"use client"

import TicketTable from './ticket-table'
import { useProjectContext } from '../context/project-context';
import { Button } from './ui/button';
import ProjectDelete from './project-delete';
import ProjectEdit from './project-edit';

const ProjectView = () => {
	const { currentProject, setProject } = useProjectContext();

	return (
		<div className="p-4 w-full flex flex-col gap-4 justify-between">
			{currentProject ? (
				<>
					<article className='flex flex-col gap-2'>
						<section className='flex justify-between items-center py-2'>
							<h2 className='text-2xl font-bold'>
								{currentProject.title}
							</h2>
							<Button>New ticket</Button>
						</section>
						
						<TicketTable tickets={currentProject?.tickets}/>
					</article>
					<article className='flex justify-between items-end'>
						<section>
							<h3 className='text-lg font-semibold'>Project details</h3>
							<p>Author: {currentProject.author}</p>
							<p>Created: {currentProject.createdAt.substring(0,10)}</p>
						</section>
						<div className='space-x-2'>
							<ProjectDelete />
							<ProjectEdit />
						</div>
					</article>
				</>
			): (
				<h2 className="p-4">Select a project</h2>
			
			)}
			
		</div>
	)
}

export default ProjectView