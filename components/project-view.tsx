"use client"
import React from 'react'
import TicketTable from './ticket-table'
import { useProjectContext } from '../context/project-context';
import ProjectHeader from './project-header';
import ProjectFooter from './project-footer';

export default function ProjectView() {
	const { currentProject } = useProjectContext();
	

	return (
		
		<div className="p-4 w-full flex flex-col gap-4 justify-between">
			{currentProject ? (
				<>
					<article>
						<ProjectHeader title={currentProject?.title} />
						<TicketTable tickets={currentProject?.tickets}/>
					</article>
					<article className='flex justify-between items-end'>
						<ProjectFooter 
							author={currentProject?.author}
							createdAt={currentProject?.createdAt}
						/>
					</article>
				</>
			): (
				// TODO: improve the no-project selected screen
				<h2 className="p-4">Select a project</h2>
			)}
		</div>
	)
}
