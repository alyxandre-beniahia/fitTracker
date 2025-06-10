import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export default function AddProgressPage() {
  const [form, setForm] = useState({
    exercice: "",
    eau: "",
    repetitions: "",
    duree: "",
    calories: "",
    notes: "",
    poids: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Progrès ajouté :", form)
    alert("Progrès ajouté avec succès !")
  }

  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-100 p-6 space-y-4">
        <h2 className="text-xl font-bold">Menu</h2>
        <ul className="space-y-2">
            <li>
            <Link to="/dashboard" className="hover:bg-gray-200 p-2 rounded block">
            Dashboard
            </Link>
            </li>
            <li>
            <Link
              to="/dashboard/add-progress"
              className="bg-green-200 text-black-800 font-semibold hover:bg-green-200 p-2 rounded block">
              Ajouter progrès
            </Link>
          </li>
          <li>
            <Link to="/dashboard/monCompte" className="hover:bg-gray-200 p-2 rounded block">
              Mon compte
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Ajouter mes progrès</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="exercice" placeholder="Nom de l'exercice" value={form.exercice} onChange={handleChange} required />
            <Input name="eau" placeholder="Litre bu" value={form.eau} onChange={handleChange} required />
            <Input name="repetitions" placeholder="Nombre de répétitions" value={form.repetitions} onChange={handleChange} required />
            <Input name="duree" placeholder="Durée" value={form.duree} onChange={handleChange} required />
            <Input name="calories" placeholder="Calories brûlées" value={form.calories} onChange={handleChange} required />
            <input name="poids" type="number" placeholder="Poids (kg)" value={form.poids} onChange={handleChange} required className="w-full p-2 border rounded" />
            <Button type="submit" className="w-full">Ajouter</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
