import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { getMe } from "@/service/getMe"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const user = await getMe()

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 p-4">
        <Sidebar role={user?.data?.role} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader  user={user}/>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}