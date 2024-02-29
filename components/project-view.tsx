"use client"
import React from 'react'
import TicketTable from './ticket-table'
import { useProjectContext } from '../context/project-context';
import ProjectDelete from './project-delete';
import ProjectEdit from './project-edit';
import AddTicket from './add-ticket';


export default function ProjectView() {
	const { currentProject } = useProjectContext();

	return (
		
		<div className="p-4 w-full flex flex-col gap-4 justify-between">
			{currentProject ? (
				<>
					<article className='flex flex-col gap-2'>
						<section className='flex justify-between items-center py-2'>
							<h2 className='text-2xl font-bold'>
								{currentProject.title}
							</h2>
							<AddTicket />
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
				// TODO: improve the no-project selected screen
				<h2 className="p-4">Select a project</h2>
			)}
		</div>
	)
}
