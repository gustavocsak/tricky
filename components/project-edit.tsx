import React from 'react'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import ProjectForm from './project-form'
import { useProjectContext } from '@/context/project-context'
import { Button } from "@/components/ui/button"

const ProjectEdit = () => {
	const { currentProject, setProject } = useProjectContext();
	const handleEdit = () => {
		// handle edit logic
	
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant='secondary'>Edit Project</Button>
			</DrawerTrigger>
			<DrawerContent className='p-8 md:pb-6 flex justify-center items-center'>
				<DrawerHeader>
					<DrawerTitle>Here you can edit your project details</DrawerTitle>
					<DrawerDescription>Change the project title and author</DrawerDescription>
				</DrawerHeader>
				<div className='md:w-1/4'>
					<ProjectForm handleProjectSubmit={handleEdit} project={currentProject} />
				</div>
				{/* <DrawerFooter>
					<Button>Submit</Button>
					<DrawerClose>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter> */}
			</DrawerContent>
		</Drawer>
	)
}

export default ProjectEdit