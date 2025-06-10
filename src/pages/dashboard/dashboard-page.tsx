import { StatsCards } from "./components/StatsCards"
import { ProgressCharts } from "./components/ProgressCharts"
import { ActivityChart } from "./components/ActivityChart"
import { GoalTracker } from "./components/GoalTracker"

export default function DashboardPage() {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-100 p-6 space-y-4">
        <h2 className="text-xl font-bold">Menu</h2>
        <ul className="space-y-2">
          <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Mon compte</li>
          <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Ajouter progrès</li>
          <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Déconnexion</li>
        </ul>
      </aside>
      <main className="flex-1 p-6 space-y-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <StatsCards />
        <ProgressCharts />
        <div className="grid md:grid-cols-2 gap-4">
          <ActivityChart />
          <GoalTracker />
        </div>
      </main>
    </div>
  )
}