import Dashboard from '../components/dashboard'
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className='flex flex-col flex-1'>
      <Dashboard />
      <Toaster />
    </main>
  );
}
