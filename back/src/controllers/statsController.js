const pool = require("../db/db");

const statsController = {
  // Obtenir les statistiques globales des séances
  getWorkoutStats: async (req, res) => {
    try {
      const userId = req.user.id;

      const stats = await pool.query(
        `
        SELECT 
          COUNT(*) as total_workouts,
          AVG(duration) as avg_duration,
          AVG(calories_burned) as avg_calories,
          SUM(calories_burned) as total_calories,
          MIN(date) as first_workout,
          MAX(date) as last_workout
        FROM workouts 
        WHERE user_id = $1
      `,
        [userId]
      );

      res.json(stats.rows[0]);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des statistiques" });
    }
  },

  // Obtenir l'historique des performances par exercice
  getExerciseHistory: async (req, res) => {
    try {
      const userId = req.user.id;
      const { exercise_id } = req.params;

      const history = await pool.query(
        `
        SELECT 
          we.*,
          w.date as workout_date,
          w.name as workout_name
        FROM workout_exercises we
        JOIN workouts w ON w.id = we.workout_id
        WHERE w.user_id = $1 AND we.exercise_id = $2
        ORDER BY w.date DESC
      `,
        [userId, exercise_id]
      );

      res.json(history.rows);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération de l'historique" });
    }
  },

  // Obtenir les statistiques mensuelles
  getMonthlyStats: async (req, res) => {
    try {
      const userId = req.user.id;
      const { year, month } = req.query;

      const stats = await pool.query(
        `
        SELECT 
          DATE_TRUNC('day', date) as day,
          COUNT(*) as workouts_count,
          AVG(duration) as avg_duration,
          SUM(calories_burned) as total_calories
        FROM workouts 
        WHERE user_id = $1 
        AND EXTRACT(YEAR FROM date) = $2 
        AND EXTRACT(MONTH FROM date) = $3
        GROUP BY DATE_TRUNC('day', date)
        ORDER BY day
      `,
        [userId, year, month]
      );

      res.json(stats.rows);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des statistiques mensuelles:",
        error
      );
      res
        .status(500)
        .json({
          message: "Erreur lors de la récupération des statistiques mensuelles",
        });
    }
  },

  // Obtenir les exercices les plus fréquents
  getMostFrequentExercises: async (req, res) => {
    try {
      const userId = req.user.id;
      const { limit = 5 } = req.query;

      const exercises = await pool.query(
        `
        SELECT 
          e.name,
          e.category,
          COUNT(*) as frequency,
          AVG(we.weight) as avg_weight,
          MAX(we.weight) as max_weight
        FROM workout_exercises we
        JOIN workouts w ON w.id = we.workout_id
        JOIN exercises e ON e.id = we.exercise_id
        WHERE w.user_id = $1
        GROUP BY e.id, e.name, e.category
        ORDER BY frequency DESC
        LIMIT $2
      `,
        [userId, limit]
      );

      res.json(exercises.rows);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des exercices fréquents:",
        error
      );
      res
        .status(500)
        .json({
          message: "Erreur lors de la récupération des exercices fréquents",
        });
    }
  },
};

module.exports = statsController;
