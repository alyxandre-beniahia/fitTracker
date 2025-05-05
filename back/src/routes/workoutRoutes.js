const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       required:
 *         - name
 *         - date
 *       properties:
 *         name:
 *           type: string
 *           description: Nom de la séance d'entraînement
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date et heure de la séance
 *         duration:
 *           type: integer
 *           description: Durée en minutes
 *         notes:
 *           type: string
 *           description: Notes sur la séance
 *         status:
 *           type: string
 *           enum: [planifié, en cours, terminé, annulé]
 *           description: Statut de la séance
 *     WorkoutExercise:
 *       type: object
 *       required:
 *         - exercise_id
 *         - sets
 *         - reps
 *       properties:
 *         exercise_id:
 *           type: string
 *           description: ID de l'exercice
 *         sets:
 *           type: integer
 *           description: Nombre de séries
 *         reps:
 *           type: integer
 *           description: Nombre de répétitions par série
 *         weight:
 *           type: number
 *           description: Poids utilisé (en kg)
 *         rest_time:
 *           type: integer
 *           description: Temps de repos entre les séries (en secondes)
 *         notes:
 *           type: string
 *           description: Notes spécifiques à l'exercice
 */

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Créer une nouvelle séance d'entraînement
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       201:
 *         description: Séance créée avec succès
 *       401:
 *         description: Non autorisé
 */
router.post("/", auth, workoutController.createWorkout);

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Récupérer toutes les séances d'entraînement
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des séances récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 *       401:
 *         description: Non autorisé
 */
router.get("/", auth, workoutController.getWorkouts);

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Récupérer une séance d'entraînement spécifique
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la séance
 *     responses:
 *       200:
 *         description: Séance récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Séance non trouvée
 */
router.get("/:id", auth, workoutController.getWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     summary: Mettre à jour une séance d'entraînement
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la séance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: Séance mise à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Séance non trouvée
 */
router.put("/:id", auth, workoutController.updateWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Supprimer une séance d'entraînement
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la séance
 *     responses:
 *       200:
 *         description: Séance supprimée avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Séance non trouvée
 */
router.delete("/:id", auth, workoutController.deleteWorkout);

/**
 * @swagger
 * /api/workouts/{workout_id}/exercises:
 *   post:
 *     summary: Ajouter un exercice à une séance
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workout_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la séance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutExercise'
 *     responses:
 *       201:
 *         description: Exercice ajouté avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Séance non trouvée
 */
router.post("/:workout_id/exercises", auth, workoutController.addExercise);

/**
 * @swagger
 * /api/workouts/{workout_id}/exercises/{exercise_id}:
 *   put:
 *     summary: Mettre à jour un exercice dans une séance
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workout_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la séance
 *       - in: path
 *         name: exercise_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'exercice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutExercise'
 *     responses:
 *       200:
 *         description: Exercice mis à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Séance ou exercice non trouvé
 */
router.put(
  "/:workout_id/exercises/:exercise_id",
  auth,
  workoutController.updateExercise
);

/**
 * @swagger
 * /api/workouts/{workout_id}/exercises/{exercise_id}:
 *   delete:
 *     summary: Supprimer un exercice d'une séance
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workout_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la séance
 *       - in: path
 *         name: exercise_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'exercice
 *     responses:
 *       200:
 *         description: Exercice supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Séance ou exercice non trouvé
 */
router.delete(
  "/:workout_id/exercises/:exercise_id",
  auth,
  workoutController.deleteExercise
);

module.exports = router;
