import { StatsCards } from "./components/StatsCards"
import { ProgressCharts } from "./components/ProgressCharts"
import { ActivityChart } from "./components/ActivityChart"
import { GoalTracker } from "./components/GoalTracker"
import { Link } from "react-router-dom"

export default function DashboardPage() {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-100 p-6 space-y-4 sticky top-0">
        <h2 className="text-xl font-bold">Menu</h2>
        <ul className="space-y-2">
          <li className="bg-green-200 text-black-800 font-semibold hover:bg-green-200 p-2 rounded block">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">
            <Link to="/dashboard/add-progress">Ajouter progrès</Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">
            <Link to="/dashboard/monCompte">Mon compte</Link>
          </li>
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
