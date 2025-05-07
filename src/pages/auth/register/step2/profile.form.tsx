import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  calculerIMC,
  interpreterIMC,
  profileSchema,
  type ProfileFormValues,
} from "./profile.schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ProfileFormProps {
  onSuccess?: () => void;
}

export function ProfileForm({ onSuccess }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imc, setImc] = useState<number | null>(null);
  const [imcInterpretation, setImcInterpretation] = useState<string>("");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      age: undefined,
      taille: undefined,
      poids: undefined,
    },
  });

  const { watch } = form;
  const taille = watch("taille");
  const poids = watch("poids");

  // Calculer l'IMC lorsque la taille et le poids changent
  useEffect(() => {
    if (taille && poids) {
      const imcCalcule = calculerIMC(poids, taille);
      setImc(parseFloat(imcCalcule.toFixed(1)));
      setImcInterpretation(interpreterIMC(imcCalcule));
    } else {
      setImc(null);
      setImcInterpretation("");
    }
  }, [taille, poids]);

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    try {
      // Ici vous pouvez implémenter la logique pour soumettre les données du formulaire
      console.log(data);

      // Calculer l'IMC final
      const imcFinal = calculerIMC(data.poids, data.taille);
      console.log("IMC calculé:", imcFinal, interpreterIMC(imcFinal));

      // Simuler un délai de traitement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Appeler la fonction onSuccess si elle est fournie
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-2xl font-bold">Votre profil</h1>
        <p className="text-muted-foreground">
          Renseignez vos informations personnelles pour un suivi adapté.
        </p>

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Âge</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="30"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value
                      ? parseInt(e.target.value)
                      : undefined;
                    field.onChange(value);
                  }}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Votre âge en années</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taille"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taille (cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="170"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value
                      ? parseInt(e.target.value)
                      : undefined;
                    field.onChange(value);
                  }}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Votre taille en centimètres</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="poids"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poids (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="70"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value
                      ? parseInt(e.target.value)
                      : undefined;
                    field.onChange(value);
                  }}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Votre poids en kilogrammes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {imc !== null && (
          <Card className="bg-muted">
            <CardContent className="pt-6">
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold">
                  Votre Indice de Masse Corporelle (IMC)
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{imc}</span>
                  <span className="text-md text-muted-foreground">kg/m²</span>
                </div>
                <p className="text-md font-medium">{imcInterpretation}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Traitement en cours..." : "Continuer"}
        </Button>
      </form>
    </Form>
  );
}
