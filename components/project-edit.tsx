import React, { useState } from 'react'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import ProjectForm from './project-form'
import { Button } from "@/components/ui/button"

export default function ProjectEdit() {
	const [open, setOpen] = useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant='secondary'>Edit Project</Button>
			</DrawerTrigger>
			<DrawerContent className='p-8 md:pb-6 flex justify-center items-center'>
				<DrawerHeader>
					<DrawerTitle>Here you can edit your project details</DrawerTitle>
					<DrawerDescription>Change the project title and author</DrawerDescription>
				</DrawerHeader>
				<div className='lg:w-1/4'>
					<ProjectForm method="PATCH" setDrawerOpen={setOpen} />
					<DrawerClose className='mt-2 w-full'>
						<Button variant="outline" className='w-full'>Close</Button>
					</DrawerClose>
				</div>
			</DrawerContent>
		</Drawer>
	)
}