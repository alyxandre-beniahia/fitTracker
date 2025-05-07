import { z } from "zod";

export const profileSchema = z.object({
  age: z
    .number({
      required_error: "L'âge est requis",
      invalid_type_error: "L'âge doit être un nombre",
    })
    .int({ message: "L'âge doit être un nombre entier" })
    .positive({ message: "L'âge doit être positif" })
    .min(16, { message: "Vous devez avoir au moins 16 ans" })
    .max(120, { message: "L'âge maximum est de 120 ans" }),
  taille: z
    .number({
      required_error: "La taille est requise",
      invalid_type_error: "La taille doit être un nombre",
    })
    .positive({ message: "La taille doit être positive" })
    .min(100, { message: "La taille minimum est de 100 cm" })
    .max(250, { message: "La taille maximum est de 250 cm" }),
  poids: z
    .number({
      required_error: "Le poids est requis",
      invalid_type_error: "Le poids doit être un nombre",
    })
    .positive({ message: "Le poids doit être positif" })
    .min(30, { message: "Le poids minimum est de 30 kg" })
    .max(300, { message: "Le poids maximum est de 300 kg" }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// Fonction utilitaire pour calculer l'IMC
export const calculerIMC = (poids: number, taille: number): number => {
  // Conversion de la taille de cm en mètres
  const tailleEnMetres = taille / 100;
  return poids / (tailleEnMetres * tailleEnMetres);
};

// Fonction pour interpréter l'IMC
export const interpreterIMC = (imc: number): string => {
  if (imc < 18.5) return "Maigreur";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Surpoids";
  if (imc < 35) return "Obésité modérée";
  if (imc < 40) return "Obésité sévère";
  return "Obésité morbide";
};
