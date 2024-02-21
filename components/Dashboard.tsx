import React from 'react'
import SideMenu from './SideMenu'
import ProjectView from './ProjectView'

const Dashboard = () => {
  return (
    <div className='flex flex-1'>
        <SideMenu />
        <ProjectView />
    </div>
  )
}

export default Dashboard