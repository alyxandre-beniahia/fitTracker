import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const activityData = [
  { day: "Lun", cardio: 30, crossfit: 20, stretching: 10 },
  { day: "Mar", cardio: 40, crossfit: 10, stretching: 5 },
  { day: "Mer", cardio: 20, crossfit: 30, stretching: 15 },
  { day: "Jeu", cardio: 35, crossfit: 25, stretching: 10 },
  { day: "Ven", cardio: 45, crossfit: 15, stretching: 8 },
]

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité par type</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stretching" stackId="a" fill="#ccc" name="Stretching" />
            <Bar dataKey="cardio" stackId="a" fill="#82ca9d" name="Cardio" />
            <Bar dataKey="crossfit" stackId="a" fill="#8884d8" name="Cross Fit" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}