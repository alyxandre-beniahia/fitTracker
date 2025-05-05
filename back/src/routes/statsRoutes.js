const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     WorkoutStats:
 *       type: object
 *       properties:
 *         total_workouts:
 *           type: integer
 *           description: Nombre total de séances
 *         total_duration:
 *           type: integer
 *           description: Durée totale en minutes
 *         average_duration:
 *           type: number
 *           description: Durée moyenne des séances
 *         completion_rate:
 *           type: number
 *           description: Taux de complétion des séances
 *     ExerciseHistory:
 *       type: object
 *       properties:
 *         exercise_id:
 *           type: string
 *           description: ID de l'exercice
 *         history:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               sets:
 *                 type: integer
 *               reps:
 *                 type: integer
 *               weight:
 *                 type: number
 *     MonthlyStats:
 *       type: object
 *       properties:
 *         month:
 *           type: string
 *           format: date
 *         total_workouts:
 *           type: integer
 *         total_duration:
 *           type: integer
 *         exercises_completed:
 *           type: integer
 *         most_frequent_exercises:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               exercise_id:
 *                 type: string
 *               count:
 *                 type: integer
 */

// Routes protégées par authentification
router.use(auth);

/**
 * @swagger
 * /api/stats/workouts:
 *   get:
 *     summary: Récupérer les statistiques des séances d'entraînement
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutStats'
 *       401:
 *         description: Non autorisé
 */
router.get("/workouts", statsController.getWorkoutStats);

/**
 * @swagger
 * /api/stats/exercises/{exercise_id}/history:
 *   get:
 *     summary: Récupérer l'historique d'un exercice
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exercise_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'exercice
 *     responses:
 *       200:
 *         description: Historique récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseHistory'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Exercice non trouvé
 */
router.get(
  "/exercises/:exercise_id/history",
  statsController.getExerciseHistory
);

/**
 * @swagger
 * /api/stats/monthly:
 *   get:
 *     summary: Récupérer les statistiques mensuelles
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Année pour les statistiques
 *     responses:
 *       200:
 *         description: Statistiques mensuelles récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MonthlyStats'
 *       401:
 *         description: Non autorisé
 */
router.get("/monthly", statsController.getMonthlyStats);

/**
 * @swagger
 * /api/stats/exercises/frequent:
 *   get:
 *     summary: Récupérer les exercices les plus fréquents
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Nombre d'exercices à retourner
 *     responses:
 *       200:
 *         description: Liste des exercices les plus fréquents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   exercise_id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   count:
 *                     type: integer
 *       401:
 *         description: Non autorisé
 */
router.get("/exercises/frequent", statsController.getMostFrequentExercises);

module.exports = router;
