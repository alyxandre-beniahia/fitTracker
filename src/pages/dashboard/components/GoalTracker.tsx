import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GoalTracker() {
  const weightGoal = {
    current: 132,
    goal: 110,
  }

  const lost = weightGoal.current - weightGoal.goal
  const progress = ((lost / weightGoal.current) * 100).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Votre objectif</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            Poids actuel : <strong>{weightGoal.current} kg</strong>
          </p>
          <p>
            Objectif : <strong>{weightGoal.goal} kg</strong>
          </p>
          <p>
            Progrès : <strong>{progress}%</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
