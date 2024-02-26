import Dashboard from '@/components/dashboard'
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className='flex flex-col flex-1' style={{height: "calc(100vh - 62px)"}}>
      <Dashboard />
      <Toaster />
    </main>
  );
}
