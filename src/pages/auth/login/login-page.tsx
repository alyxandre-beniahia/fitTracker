import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginForm } from "./login.schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  onSuccess?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
}

export function LoginPage({
  onSuccess,
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      motDePasse: "",
    },
  });

  async function onSubmit(data: LoginForm) {
    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setAuthError(result.message || "Adresse email ou mot de passe incorrect");
        return;
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setAuthError("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`px-8 mx-auto w-full max-w-4xl h-[90vh] overflow-auto rounded-4xl shadow-xl ${stepCircleContainerClassName}`}
    >
      <div
        className={`${stepContainerClassName} flex w-full items-center p-8 sticky top-0 bg-white z-10 mt-20` }
      >
        <h1 className="text-2xl font-bold">Connexion</h1>
      </div>

      <div className={`space-y-2 px-8 pb-10 ${contentClassName}`}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="exemple@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motDePasse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {authError && (
              <div className="text-red-500 text-sm text-center">
                {authError}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Traitement en cours..." : "Se connecter"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
