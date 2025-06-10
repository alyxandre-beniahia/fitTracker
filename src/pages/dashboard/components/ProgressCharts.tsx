import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const progressData = [
  { name: "Lun", poids: 80, calories: 500 },
  { name: "Mar", poids: 79.5, calories: 450 },
  { name: "Mer", poids: 79, calories: 480 },
  { name: "Jeu", poids: 78.8, calories: 520 },
  { name: "Ven", poids: 78.5, calories: 550 },
]

export function ProgressCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progrès de la semaine</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="poids" stroke="#8884d8" name="Poids (kg)" />
            <Line type="monotone" dataKey="calories" stroke="#82ca9d" name="Calories" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}