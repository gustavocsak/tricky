"use client"

import React, { useState } from 'react'
import TicketTable from './ticket-table'
import { useProjectContext } from '../context/project-context';
import { Button } from './ui/button';

const ProjectView = () => {
	const { currentProject, setProject } = useProjectContext();

	return (
		<div className="p-4 w-full">
			{currentProject ? (
				<>
					<section className='flex justify-between items-center py-2'>
						<h2>{currentProject.title}</h2>
						<Button>New ticket</Button>
					</section>
					
					<TicketTable tickets={currentProject?.tickets}/>
				</>
			): (
				<h2 className="p-4">Select a project</h2>
			
			)}
			
		</div>
	)
}

export default ProjectView