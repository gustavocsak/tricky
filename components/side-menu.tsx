import ShowProjectForm from './show-project-form'
import ProjectList from './project-list'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { getProjects } from '@/app/actions';

export default async function SideMenu() {
    
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
      queryKey: ['projects'],
      queryFn: getProjects,
    })

    return (
            <div className='p-4 w-72 border-r-2 border-border/90 flex gap-8 flex-col justify-between overflow-auto'
        style={{ maxHeight: `calc(100vh - 62px)` }} > 
            <HydrationBoundary state={dehydrate(queryClient)}>  
                <ProjectList />
            </HydrationBoundary>
            <ShowProjectForm />
        </div>
    )
}
