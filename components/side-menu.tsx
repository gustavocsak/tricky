import ShowProjectForm from './show-project-form'
import ProjectList from './project-list'

export default async function SideMenu() {
    
    /**
     * Fetch projects using server actions
     */
    const response = await fetch('http://localhost:3000/api/projects', {
        next: {
            tags: ['get-projects'],
        }
    })
    const data = await response.json()

    return (
        <div className='p-4 w-72 border-r-2 border-border/90 flex gap-8 flex-col justify-between overflow-auto'
        style={{ maxHeight: `calc(100vh - 62px)` }}  
            >
            <ProjectList data={data}/>
            <ShowProjectForm />
        </div>
    )
}
