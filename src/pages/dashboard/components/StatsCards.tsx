import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCards() {
  const stats = [
    { title: "Séances", value: "12" },
    { title: "Calories brûlées", value: "3 400 kcal" },
    { title: "Temps d'entraînement", value: "6h 45min" },
    { title: "Eau bue", value: "7.5 L" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          <CardHeader>
            <CardTitle className="text-sm">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}