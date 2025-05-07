import { z } from "zod";

export const objectifSchema = z.object({
  type: z.enum(["gain", "perte"], {
    required_error: "Veuillez sélectionner un type d'objectif",
  }),
  dateDebut: z.date({
    required_error: "Veuillez sélectionner une date de début",
  }),
  dateFin: z.date({
    required_error: "Veuillez sélectionner une date de fin",
  }),
  objectifPoids: z
    .number({
      required_error: "Veuillez entrer votre objectif de poids",
    })
    .min(30, "Le poids doit être supérieur à 30kg")
    .max(300, "Le poids doit être inférieur à 300kg"),
});

export type ObjectifFormValues = z.infer<typeof objectifSchema>;
