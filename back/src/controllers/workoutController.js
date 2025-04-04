const pool = require("../db/db");
const wgerService = require("../services/wgerService");

const workoutController = {
  // Créer une nouvelle séance
  createWorkout: async (req, res) => {
    const client = await pool.connect();
    try {
      const { name, description, date, duration, calories_burned } = req.body;
      const userId = req.user.id;

      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO workouts (user_id, name, description, date, duration, calories_burned)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [userId, name, description, date, duration, calories_burned]
      );

      await client.query("COMMIT");
      res.status(201).json(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erreur lors de la création de la séance:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la création de la séance" });
    } finally {
      client.release();
    }
  },

  // Récupérer toutes les séances d'un utilisateur
  getWorkouts: async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await pool.query(
        `SELECT * FROM workouts 
         WHERE user_id = $1 
         ORDER BY date DESC`,
        [userId]
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Erreur lors de la récupération des séances:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des séances" });
    }
  },

  // Récupérer une séance spécifique
  getWorkout: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const workoutResult = await pool.query(
        `SELECT * FROM workouts 
         WHERE id = $1 AND user_id = $2`,
        [id, userId]
      );

      if (workoutResult.rows.length === 0) {
        return res.status(404).json({ message: "Séance non trouvée" });
      }

      const exercisesResult = await pool.query(
        `SELECT * FROM workout_exercises 
         WHERE workout_id = $1 
         ORDER BY created_at ASC`,
        [id]
      );

      const workout = workoutResult.rows[0];
      workout.exercises = exercisesResult.rows;

      res.json(workout);
    } catch (error) {
      console.error("Erreur lors de la récupération de la séance:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération de la séance" });
    }
  },

  // Mettre à jour une séance
  updateWorkout: async (req, res) => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { name, description, date, duration, calories_burned } = req.body;

      await client.query("BEGIN");

      const result = await client.query(
        `UPDATE workouts 
         SET name = $1, description = $2, date = $3, duration = $4, calories_burned = $5, updated_at = CURRENT_TIMESTAMP
         WHERE id = $6 AND user_id = $7
         RETURNING *`,
        [name, description, date, duration, calories_burned, id, userId]
      );

      if (result.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ message: "Séance non trouvée" });
      }

      await client.query("COMMIT");
      res.json(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erreur lors de la mise à jour de la séance:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de la séance" });
    } finally {
      client.release();
    }
  },

  // Supprimer une séance
  deleteWorkout: async (req, res) => {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await client.query("BEGIN");

      const result = await client.query(
        `DELETE FROM workouts 
         WHERE id = $1 AND user_id = $2
         RETURNING *`,
        [id, userId]
      );

      if (result.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ message: "Séance non trouvée" });
      }

      await client.query("COMMIT");
      res.json({ message: "Séance supprimée avec succès" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erreur lors de la suppression de la séance:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de la séance" });
    } finally {
      client.release();
    }
  },

  // Ajouter un exercice à une séance
  addExercise: async (req, res) => {
    const client = await pool.connect();
    try {
      console.log("Début de l'ajout d'exercice");
      const { workout_id } = req.params;
      const { exercise_id, name, sets, reps, weight, duration, notes } =
        req.body;
      const userId = req.user.id;

      console.log("Paramètres reçus:", {
        workout_id,
        exercise_id,
        name,
        sets,
        reps,
        weight,
        duration,
        notes,
      });

      // Vérifier que la séance appartient à l'utilisateur
      const workoutCheck = await client.query(
        `SELECT id FROM workouts WHERE id = $1 AND user_id = $2`,
        [workout_id, userId]
      );

      console.log(
        "Résultat de la vérification de la séance:",
        workoutCheck.rows
      );

      if (workoutCheck.rows.length === 0) {
        return res.status(404).json({ message: "Séance non trouvée" });
      }

      // Vérifier que l'exercice existe dans l'API wger
      try {
        console.log("Vérification de l'exercice dans l'API wger...");
        const wgerExercise = await wgerService.getExerciseById(exercise_id);
        console.log("Exercice trouvé dans wger:", wgerExercise);

        // Utiliser le nom de l'exercice de wger si fourni
        const exerciseName = wgerExercise.name || name;
      } catch (error) {
        console.error("Erreur lors de la vérification de l'exercice:", error);
        return res.status(404).json({
          message: "L'exercice n'existe pas dans la base de données wger",
          error: error.message,
        });
      }

      await client.query("BEGIN");
      console.log("Transaction commencée");

      // Calculer les calories brûlées pour cet exercice
      console.log("Calcul des calories brûlées...");
      const caloriesBurned = await wgerService.calculateCaloriesBurned(
        exercise_id,
        duration || 0,
        weight || 0
      );
      console.log("Calories brûlées calculées:", caloriesBurned);

      const result = await client.query(
        `INSERT INTO workout_exercises (workout_id, exercise_id, name, sets, reps, weight, duration, notes, calories_burned)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          workout_id,
          exercise_id,
          exerciseName,
          sets,
          reps,
          weight,
          duration,
          notes,
          caloriesBurned,
        ]
      );

      console.log("Exercice ajouté:", result.rows[0]);

      // Mettre à jour les calories totales de la séance
      await client.query(
        `UPDATE workouts 
         SET calories_burned = COALESCE(calories_burned, 0) + $1
         WHERE id = $2`,
        [caloriesBurned, workout_id]
      );

      console.log("Calories totales de la séance mises à jour");

      await client.query("COMMIT");
      console.log("Transaction validée");
      res.status(201).json(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erreur détaillée lors de l'ajout de l'exercice:", error);
      res.status(500).json({
        message: "Erreur lors de l'ajout de l'exercice",
        error: error.message,
      });
    } finally {
      client.release();
    }
  },

  // Mettre à jour un exercice
  updateExercise: async (req, res) => {
    const client = await pool.connect();
    try {
      const { workout_id, exercise_id } = req.params;
      const { sets, reps, duration, weight, notes } = req.body;
      const userId = req.user.id;

      // Vérifier que la séance appartient à l'utilisateur
      const workoutCheck = await client.query(
        `SELECT id FROM workouts WHERE id = $1 AND user_id = $2`,
        [workout_id, userId]
      );

      if (workoutCheck.rows.length === 0) {
        return res.status(404).json({ message: "Séance non trouvée" });
      }

      await client.query("BEGIN");

      const result = await client.query(
        `UPDATE workout_exercises 
         SET sets = $1, reps = $2, duration = $3, weight = $4, notes = $5, updated_at = CURRENT_TIMESTAMP
         WHERE id = $6 AND workout_id = $7
         RETURNING *`,
        [sets, reps, duration, weight, notes, exercise_id, workout_id]
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
      const { workout_id, exercise_id } = req.params;
      const userId = req.user.id;

      // Vérifier que la séance appartient à l'utilisateur
      const workoutCheck = await client.query(
        `SELECT id FROM workouts WHERE id = $1 AND user_id = $2`,
        [workout_id, userId]
      );

      if (workoutCheck.rows.length === 0) {
        return res.status(404).json({ message: "Séance non trouvée" });
      }

      await client.query("BEGIN");

      const result = await client.query(
        `DELETE FROM workout_exercises 
         WHERE id = $1 AND workout_id = $2
         RETURNING *`,
        [exercise_id, workout_id]
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

module.exports = workoutController;
