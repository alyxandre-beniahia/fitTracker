const db = require("../config/db");

const goalController = {
  // Créer un nouvel objectif
  createGoal: async (req, res) => {
    try {
      const { type, target_value, start_date, end_date } = req.body;
      const userId = req.user.id;

      const result = await db.query(
        `INSERT INTO goals (user_id, type, target_value, start_date, end_date)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [userId, type, target_value, start_date, end_date]
      );

      res.status(201).json({
        message: "Objectif créé avec succès",
        goal: result.rows[0],
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'objectif:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Obtenir tous les objectifs de l'utilisateur
  getGoals: async (req, res) => {
    try {
      const userId = req.user.id;

      const result = await db.query(
        "SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at DESC",
        [userId]
      );

      res.json(result.rows);
    } catch (error) {
      console.error("Erreur lors de la récupération des objectifs:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Obtenir un objectif spécifique
  getGoal: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await db.query(
        "SELECT * FROM goals WHERE id = $1 AND user_id = $2",
        [id, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Objectif non trouvé" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'objectif:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Mettre à jour un objectif
  updateGoal: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, target_value, start_date, end_date, status } = req.body;
      const userId = req.user.id;

      const result = await db.query(
        `UPDATE goals 
         SET type = $1, target_value = $2, start_date = $3, end_date = $4, status = $5, updated_at = CURRENT_TIMESTAMP
         WHERE id = $6 AND user_id = $7
         RETURNING *`,
        [type, target_value, start_date, end_date, status, id, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Objectif non trouvé" });
      }

      res.json({
        message: "Objectif mis à jour avec succès",
        goal: result.rows[0],
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'objectif:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Supprimer un objectif
  deleteGoal: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await db.query(
        "DELETE FROM goals WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Objectif non trouvé" });
      }

      res.json({ message: "Objectif supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'objectif:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};

module.exports = goalController;
