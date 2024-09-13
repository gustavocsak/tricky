import React from 'react'
import SideMenu from './side-menu'
import ProjectView from './project-view'

export default async function Dashboard() {

	const response = await fetch('http://localhost:3000/api/projects', {
		next: {
				tags: ['get-projects'],
			}
	})
	const data = await response.json()

	console.log('Dashboard render')
	return (
		<div className='flex flex-1' style={{height: "calc(100vh - 62px)"}}>
			<SideMenu data={data}/>
			<ProjectView />
		</div>
	)
}