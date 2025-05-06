import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./components/ui/navigation-menu";
import { Separator } from "./components/ui/separator";

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* En-tête */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 bg-green-500">
              <AvatarFallback>FT</AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold text-green-600">FitTracker</span>
          </div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="#"
                >
                  Accueil
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="#"
                >
                  Fonctionnalités
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="#"
                >
                  Tarifs
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="#"
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center space-x-4">
            <Button variant="default">Connexion</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Section Héro */}
      <section className="bg-green-50 py-16 flex-grow">
        <div className="container mx-auto px-4 text-center">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-sm border-green-600 text-green-700"
          >
            Nouveau - Version 2023
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Suivez vos performances sportives
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Suivre ses performances sportives est essentiel pour atteindre ses
            objectifs. FitTracker offre une solution simple, sans distractions,
            pour vous permettre de suivre vos entraînements et progrès en toute
            sérénité.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button size="lg">Commencer gratuitement</Button>
            <Button size="lg" variant="outline">
              Voir la démo
            </Button>
          </div>
          <div className="mt-8 bg-white p-4 rounded-xl shadow-md max-w-sm mx-auto">
            <p className="text-sm text-gray-500 mb-2">
              Utilisé par plus de 10 000 athlètes
            </p>
            <div className="flex justify-center -space-x-2">
              <Avatar className="border-2 border-white">
                <AvatarFallback className="bg-red-400">JD</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white">
                <AvatarFallback className="bg-blue-400">MS</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white">
                <AvatarFallback className="bg-green-400">AK</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white">
                <AvatarFallback className="bg-yellow-400">PL</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white">
                <AvatarFallback className="bg-purple-400">+</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos fonctionnalités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardHeader className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl mb-2">
                  Profil personnalisé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Création de profil utilisateur avec vos données personnelles
                  (nom, âge, taille, poids) pour un suivi adapté à vos besoins.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Badge variant="outline" className="text-green-700">
                  Personnalisable
                </Badge>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl mb-2">
                  Suivi des progrès
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visualisez vos progrès sous forme de graphiques intuitifs
                  (poids, endurance, calories brûlées) pour rester motivé.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Badge variant="outline" className="text-green-700">
                  Visuel
                </Badge>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl mb-2">
                  Gestion d'entraînements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Enregistrez facilement vos séances avec exercices, séries,
                  répétitions et durée pour un suivi complet.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Badge variant="outline" className="text-green-700">
                  Complet
                </Badge>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Caractéristiques additionnelles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tout ce dont vous avez besoin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-2">
                      Objectifs personnalisés
                    </CardTitle>
                    <p className="text-gray-600">
                      Définissez et suivez vos objectifs sportifs personnalisés
                      (perte de poids, gain musculaire, endurance).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-2">
                      Tableau de bord statistique
                    </CardTitle>
                    <p className="text-gray-600">
                      Accédez à vos statistiques essentielles comme le nombre de
                      séances, calories brûlées et temps d'entraînement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <Avatar className="h-10 w-10 bg-green-500 mr-2">
              <AvatarFallback>FT</AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold text-white">FitTracker</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">À propos</h3>
              <p className="text-gray-300">
                FitTracker aide les sportifs à suivre leurs performances et
                atteindre leurs objectifs depuis 2023.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Légal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Politique de confidentialité
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">contact@fittracker.com</p>
              <p className="text-gray-300">+33 1 23 45 67 89</p>
              <div className="flex space-x-4 mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-300">
            <p>© 2023 FitTracker. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
