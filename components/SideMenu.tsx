import React from 'react'
import { Button } from './ui/button'

const SideMenu = () => {
  return (
    <div className='p-4 w-72 border-r-2 border-border/90 flex flex-col justify-between'>
        <div>
            SideMenu
        </div>
        <div>
            <Button className='w-full'>Add Project</Button>
        </div>
    </div>
  )
}

export default SideMenu