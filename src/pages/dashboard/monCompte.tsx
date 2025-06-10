import { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function PageCompte() {
  const [form, setForm] = useState({
    nom: "Jean Dupont",
    email: "jean.dupont@example.com",
    age: 28,
    taille: 175,
    objectifType: "prise",
    objectifPoids: 70,
    dateDebut: "",
    dateFin: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Données mises à jour :", form)
    alert("Modifications enregistrées !")
  }

  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-100 p-6 space-y-4 sticky top-0">
        <h2 className="text-xl font-bold">Menu</h2>
        <ul className="space-y-2">
                      <li>
            <Link
              to="/dashboard"
              className="hover:bg-gray-200 p-2 rounded block"
            >
                Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/add-progress"
              className="hover:bg-gray-200 p-2 rounded block"
            >
              Ajouter progrès
            </Link>
          </li>
        <li>
            <Link
              to="/dashboard/monCompte"
              className="bg-green-200 text-black-800 font-semibold hover:bg-green-200 p-2 rounded block"
            >
              Mon compte
            </Link>
            </li>
        </ul>
      </aside>


  <main className="flex-1 flex justify-center items-start p-10">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
          {/* Profile picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
            <h1 className="text-2xl font-bold">Mon compte</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input name="nom" value={form.nom} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="age">Âge</Label>
              <Input name="age" type="number" value={form.age} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="taille">Taille (en cm)</Label>
              <Input name="taille" type="number" value={form.taille} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="objectifType">Type d’objectif</Label>
              <Select value={form.objectifType} onValueChange={(value) => setForm({ ...form, objectifType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prise">Prise de poids</SelectItem>
                  <SelectItem value="perte">Perte de poids</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="objectifPoids">Objectif de poids (kg)</Label>
              <Input
                name="objectifPoids"
                type="number"
                value={form.objectifPoids}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="dateDebut">Date de début</Label>
              <Input name="dateDebut" type="date" value={form.dateDebut} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="dateFin">Date de fin</Label>
              <Input name="dateFin" type="date" value={form.dateFin} onChange={handleChange} required />
            </div>

            <Button type="submit" className="w-full mt-4">
              Sauvegarder les modifications
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}