import React from 'react'
import { LinkNone2Icon } from '@radix-ui/react-icons'
import { ModeToggle } from './ui/mode-toggle'

const Navbar = () => {
  return (
    <nav className='py-3 flex justify-center border-b border-border/20 backdrop-blur'>
        <div className='flex w-10/12 justify-between'>
            <div className='flex items-center gap-2'>
                <LinkNone2Icon />
                <h1 className='font-bold text-xl'>tricky</h1>
            </div>
            <div>
                <ModeToggle />
            </div>
        </div>
        
    </nav>
  )
}

export default Navbar