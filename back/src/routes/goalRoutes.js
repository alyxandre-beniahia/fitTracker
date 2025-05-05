const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     Goal:
 *       type: object
 *       required:
 *         - title
 *         - targetDate
 *         - type
 *       properties:
 *         title:
 *           type: string
 *           description: Titre de l'objectif
 *         description:
 *           type: string
 *           description: Description détaillée de l'objectif
 *         type:
 *           type: string
 *           enum: [poids, performance, endurance, force]
 *           description: Type d'objectif
 *         targetDate:
 *           type: string
 *           format: date
 *           description: Date cible pour atteindre l'objectif
 *         targetValue:
 *           type: number
 *           description: Valeur cible à atteindre
 *         currentValue:
 *           type: number
 *           description: Valeur actuelle
 *         status:
 *           type: string
 *           enum: [en cours, atteint, abandonné]
 *           description: Statut de l'objectif
 */

// Toutes les routes sont protégées
router.use(auth);

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Créer un nouvel objectif
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       201:
 *         description: Objectif créé avec succès
 *       401:
 *         description: Non autorisé
 */
router.post("/", goalController.createGoal);

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Récupérer tous les objectifs de l'utilisateur
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des objectifs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 *       401:
 *         description: Non autorisé
 */
router.get("/", goalController.getGoals);

/**
 * @swagger
 * /api/goals/{id}:
 *   get:
 *     summary: Récupérer un objectif spécifique
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'objectif
 *     responses:
 *       200:
 *         description: Objectif récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Objectif non trouvé
 */
router.get("/:id", goalController.getGoal);

/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     summary: Mettre à jour un objectif
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'objectif
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       200:
 *         description: Objectif mis à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Objectif non trouvé
 */
router.put("/:id", goalController.updateGoal);

/**
 * @swagger
 * /api/goals/{id}:
 *   delete:
 *     summary: Supprimer un objectif
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'objectif
 *     responses:
 *       200:
 *         description: Objectif supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Objectif non trouvé
 */
router.delete("/:id", goalController.deleteGoal);

module.exports = router;
