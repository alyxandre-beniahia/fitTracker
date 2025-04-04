const wgerService = require("../services/wgerService");
const pool = require("../db/db");

const exerciseController = {
  // Récupérer tous les exercices
  getAllExercises: async (req, res) => {
    try {
      const exercises = await wgerService.getAllExercises();
      res.json(exercises);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des exercices" });
    }
  },

  // Récupérer un exercice par son ID
  getExerciseById: async (req, res) => {
    try {
      const { id } = req.params;
      const exercise = await wgerService.getExerciseById(id);
      res.json(exercise);
    } catch (error) {
      if (error.message.includes("n'existe pas")) {
        return res.status(404).json({ message: error.message });
      }
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération de l'exercice" });
    }
  },

  // Rechercher des exercices
  searchExercises: async (req, res) => {
    try {
      const { query } = req.query;
      const exercises = await wgerService.searchExercises(query);
      res.json(exercises);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la recherche d'exercices" });
    }
  },

  // Récupérer les catégories d'exercices
  getExerciseCategories: async (req, res) => {
    try {
      const categories = await wgerService.getExerciseCategories();
      res.json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des catégories" });
    }
  },

  // Récupérer les muscles
  getMuscles: async (req, res) => {
    try {
      const muscles = await wgerService.getMuscles();
      res.json(muscles);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des muscles" });
    }
  },

  // Récupérer les équipements
  getEquipment: async (req, res) => {
    try {
      const equipment = await wgerService.getEquipment();
      res.json(equipment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des équipements" });
    }
  },

  // Autocomplétion des exercices
  autocompleteExercises: async (req, res) => {
    try {
      const { term } = req.query;
      if (!term || term.length < 2) {
        return res.status(400).json({
          message: "Le terme de recherche doit contenir au moins 2 caractères",
        });
      }
      const suggestions = await wgerService.autocompleteExercises(term);
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'autocomplétion des exercices",
      });
    }
  },

  // Créer un nouvel exercice
  createExercise: async (req, res) => {
    const client = await pool.connect();
    try {
      const { name, description, category } = req.body;
      const userId = req.user.id;

      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO exercises (user_id, name, description, category)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [userId, name, description, category]
      );

      await client.query("COMMIT");
      res.status(201).json(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erreur lors de la création de l'exercice:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la création de l'exercice" });
    } finally {
      client.release();
    }
  },

  // Récupérer tous les exercices d'un utilisateur
  getExercises: async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await pool.query(
        `SELECT * FROM exercises 
         WHERE user_id = $1 
         ORDER BY name ASC`,
        [userId]
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Erreur lors de la récupération des exercices:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des exercices" });
    }
  },

  // Récupérer un exercice spécifique
  getExercise: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await pool.query(
        `SELECT * FROM exercises 
         WHERE id = $1 AND user_id = $2`,
        [id, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Exercice non trouvé" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'exercice:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération de l'exercice" });
    }
  },

  // Mettre à jour un exercice
  updateExercise: async (req, res) => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { name, description, category } = req.body;

      await client.query("BEGIN");

      const result = await client.query(
        `UPDATE exercises 
         SET name = $1, description = $2, category = $3, updated_at = CURRENT_TIMESTAMP
         WHERE id = $4 AND user_id = $5
         RETURNING *`,
        [name, description, category, id, userId]
      );

      if (result.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ message: "Exercice non trouvé" });
      }

      await client.query("COMMIT");
      res.json(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erreur lors de la mise à jour de l'exercice:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de l'exercice" });
    } finally {
      client.release();
    }
  },

  // Supprimer un exercice
  deleteExercise: async (req, res) => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await client.query("BEGIN");

      const result = await client.query(
        `DELETE FROM exercises 
         WHERE id = $1 AND user_id = $2
         RETURNING *`,
        [id, userId]
      );

      if (result.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ message: "Exercice non trouvé" });
      }

      await client.query("COMMIT");
      res.json({ message: "Exercice supprimé avec succès" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erreur lors de la suppression de l'exercice:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de l'exercice" });
    } finally {
      client.release();
    }
  },
};

module.exports = exerciseController;
