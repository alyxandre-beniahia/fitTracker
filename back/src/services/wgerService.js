const axios = require("axios");

class WgerService {
  constructor() {
    this.baseUrl = "https://wger.de/api/v2";
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  // Récupérer tous les exercices
  async getAllExercises() {
    try {
      const response = await this.client.get("/exercise");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des exercices:", error);
      throw error;
    }
  }

  // Récupérer un exercice par son ID
  async getExerciseById(id) {
    try {
      console.log("Tentative de récupération de l'exercice avec l'ID:", id);
      const response = await this.client.get(`/exercise/${id}`);
      console.log("Réponse de l'API wger:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur détaillée lors de la récupération de l'exercice:",
        error
      );
      if (error.response) {
        console.error("Détails de la réponse d'erreur:", error.response.data);
      }
      if (error.response && error.response.status === 404) {
        throw new Error(`L'exercice avec l'ID ${id} n'existe pas`);
      }
      throw error;
    }
  }

  // Rechercher des exercices par nom
  async searchExercises(query) {
    try {
      const response = await this.client.get(
        `/exercise/search/?term=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la recherche d'exercices:", error);
      throw error;
    }
  }

  // Récupérer les catégories d'exercices
  async getExerciseCategories() {
    try {
      const response = await this.client.get("/exercisecategory");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      throw error;
    }
  }

  // Récupérer les muscles
  async getMuscles() {
    try {
      const response = await this.client.get("/muscle");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des muscles:", error);
      throw error;
    }
  }

  // Récupérer les équipements
  async getEquipment() {
    try {
      const response = await this.client.get("/equipment");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des équipements:", error);
      throw error;
    }
  }

  // Autocomplétion des exercices
  async autocompleteExercises(term) {
    try {
      const response = await this.client.get(
        `/exercise/search/?term=${encodeURIComponent(term)}&limit=10`
      );

      // Vérification de la structure de la réponse
      if (!response.data || !response.data.suggestions) {
        console.log("Structure de réponse inattendue:", response.data);
        return [];
      }

      // Formatage des résultats pour l'autocomplétion
      const suggestions = response.data.suggestions.map((suggestion) => ({
        id: suggestion.data.id,
        name: suggestion.value,
        category: suggestion.data.category,
        muscles: suggestion.data.muscles,
        equipment: suggestion.data.equipment,
      }));
      return suggestions;
    } catch (error) {
      console.error("Erreur lors de l'autocomplétion des exercices:", error);
      if (error.response) {
        console.error("Détails de la réponse:", error.response.data);
      }
      throw error;
    }
  }

  // Calculer les calories brûlées pour un exercice
  async calculateCaloriesBurned(exerciseId, duration, weight) {
    try {
      console.log("Début du calcul des calories brûlées");
      console.log("Paramètres:", { exerciseId, duration, weight });

      // Récupérer les informations de l'exercice depuis wger
      console.log("Récupération des informations de l'exercice...");
      const exercise = await this.getExerciseById(exerciseId);
      console.log("Informations de l'exercice récupérées:", exercise);

      // Récupérer le MET (Metabolic Equivalent of Task) de l'exercice
      const met = exercise.met || 3.5; // Valeur par défaut si non disponible
      console.log("MET utilisé:", met);

      // Formule pour calculer les calories brûlées :
      // Calories = MET * poids (kg) * durée (heures)
      const durationInHours = duration / 60; // Convertir les minutes en heures
      console.log("Durée en heures:", durationInHours);

      const caloriesBurned = met * weight * durationInHours;
      console.log("Calories brûlées calculées:", caloriesBurned);

      return Math.round(caloriesBurned);
    } catch (error) {
      console.error(
        "Erreur détaillée lors du calcul des calories brûlées:",
        error
      );
      throw error;
    }
  }

  // Calculer les calories brûlées pour une séance complète
  async calculateWorkoutCalories(exercises) {
    try {
      let totalCalories = 0;

      for (const exercise of exercises) {
        const calories = await this.calculateCaloriesBurned(
          exercise.exercise_id,
          exercise.duration || 0,
          exercise.weight || 0
        );
        totalCalories += calories;
      }

      return totalCalories;
    } catch (error) {
      console.error("Erreur lors du calcul des calories de la séance:", error);
      throw error;
    }
  }
}

module.exports = new WgerService();
