# FitTracker - Interfaces Front-end

## Vue d'ensemble

FitTracker est une application web responsive permettant de suivre ses performances sportives et d'atteindre ses objectifs de manière efficace.

## Interfaces Principales

### 1. Page d'Accueil (`/`)

- Présentation de l'application
- Boutons de connexion/inscription
- Section "Pourquoi FitTracker"
- Témoignages d'utilisateurs

### 2. Authentification

#### Page de Connexion (`/login`)

- Formulaire de connexion (email/mot de passe)
- Option "Se souvenir de moi"
- Lien vers la page d'inscription
- Lien "Mot de passe oublié"

#### Page d'Inscription (`/register`)

- Formulaire d'inscription
- Champs requis : nom, email, mot de passe, confirmation
- Validation des données en temps réel

### 3. Tableau de Bord (`/dashboard`)

- Vue d'ensemble des statistiques
- Widgets :
  - Calories brûlées aujourd'hui
  - Temps d'entraînement de la semaine
  - Objectifs en cours
  - Prochain entraînement prévu
- Graphiques de progression
- Dernières séances effectuées

### 4. Profil Utilisateur (`/profile`)

- Informations personnelles
- Statistiques physiques
- Historique des objectifs
- Paramètres du compte
- Préférences de notification
- Afficher IMC quand l'utilisateur crée son profil

### 5. Gestion des Objectifs (`/goals`)

- Liste des objectifs en cours
- Création d'un nouvel objectif
- Suivi de progression
- Historique des objectifs atteints

### 6. Entraînements (`/workouts`)

#### Liste des Entraînements (`/workouts`)

- Liste des séances disponibles
- Filtres par type d'entraînement
- Recherche rapide

#### Création d'Entraînement (`/workouts/new`)

- Formulaire de création
- Sélection des exercices
- Configuration des séries/répétitions
- Estimation des calories

#### Détail d'Entraînement (`/workouts/:id`)

- Détails de la séance
- Liste des exercices
- Statistiques de performance
- Option de modification/suppression

### 7. Exercices (`/exercises`)

- Bibliothèque d'exercices
- Filtres par catégorie
- Recherche
- Détails de chaque exercice
- Intégration avec l'API Wger

### 8. Statistiques (`/stats`)

- Graphiques de progression
- Filtres par période
- Export des données
- Comparaisons de performance

### 9. Notifications (`/notifications`)

- Centre de notifications
- Paramètres de rappels
- Historique des notifications

## Composants Réutilisables

- Barre de navigation
- Menu latéral
- Cartes de statistiques
- Graphiques
- Formulaires
- Modales de confirmation
- Messages d'alerte
- Loaders

## Responsive Design

- Mobile First
- Breakpoints :
  - Mobile : < 768px
  - Tablette : 768px - 1024px
  - Desktop : > 1024px

## Technologies Front-end Recommandées

- React.js
- Tailwind CSS
- Chart.js pour les graphiques
- React Router pour la navigation
- Axios pour les requêtes API
- React Query pour la gestion d'état
