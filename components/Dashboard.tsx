import React from 'react'
import SideMenu from './side-menu'
import ProjectView from './project-view'
import ProjectContextProvider from '../context/project-context'

const Dashboard = () => {
	
	return (
		<div className='flex flex-1'>
			<ProjectContextProvider>
				<SideMenu />
				<ProjectView />
			</ProjectContextProvider>
		</div>
	)
}

export default Dashboard