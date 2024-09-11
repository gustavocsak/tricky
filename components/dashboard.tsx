import React from 'react'
import SideMenu from './side-menu'
import ProjectView from './project-view'

export default function Dashboard() {
	console.log('Dashboard render')
	return (
		<div className='flex flex-1' style={{height: "calc(100vh - 62px)"}}>
			<SideMenu />
			<ProjectView />
		</div>
	)
}