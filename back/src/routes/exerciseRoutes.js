const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - muscle
 *       properties:
 *         name:
 *           type: string
 *           description: Nom de l'exercice
 *         description:
 *           type: string
 *           description: Description de l'exercice
 *         category:
 *           type: string
 *           description: Catégorie de l'exercice
 *         muscle:
 *           type: string
 *           description: Muscle principal sollicité
 *         equipment:
 *           type: string
 *           description: Équipement nécessaire
 *         difficulty:
 *           type: string
 *           enum: [débutant, intermédiaire, avancé]
 *           description: Niveau de difficulté
 *         instructions:
 *           type: array
 *           items:
 *             type: string
 *           description: Instructions pour réaliser l'exercice
 */

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Récupérer tous les exercices
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: Liste des exercices récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */
router.get("/", exerciseController.getAllExercises);

/**
 * @swagger
 * /api/exercises/search:
 *   get:
 *     summary: Rechercher des exercices
 *     tags: [Exercises]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Terme de recherche
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */
router.get("/search", exerciseController.searchExercises);

/**
 * @swagger
 * /api/exercises/autocomplete:
 *   get:
 *     summary: Autocomplétion des noms d'exercices
 *     tags: [Exercises]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Terme de recherche pour l'autocomplétion
 *     responses:
 *       200:
 *         description: Suggestions d'exercices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/autocomplete", exerciseController.autocompleteExercises);

/**
 * @swagger
 * /api/exercises/categories:
 *   get:
 *     summary: Récupérer toutes les catégories d'exercices
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/categories", exerciseController.getExerciseCategories);

/**
 * @swagger
 * /api/exercises/muscles:
 *   get:
 *     summary: Récupérer tous les muscles
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: Liste des muscles récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/muscles", exerciseController.getMuscles);

/**
 * @swagger
 * /api/exercises/equipment:
 *   get:
 *     summary: Récupérer tous les équipements
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: Liste des équipements récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/equipment", exerciseController.getEquipment);

/**
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     summary: Récupérer un exercice par son ID
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'exercice
 *     responses:
 *       200:
 *         description: Exercice récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Exercice non trouvé
 */
router.get("/:id", auth, exerciseController.getExerciseById);

// Routes protégées par authentification
router.use(auth);

/**
 * @swagger
 * /api/exercises:
 *   post:
 *     summary: Créer un nouvel exercice
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       201:
 *         description: Exercice créé avec succès
 *       401:
 *         description: Non autorisé
 */
router.post("/", exerciseController.createExercise);

/**
 * @swagger
 * /api/exercises/{id}:
 *   put:
 *     summary: Mettre à jour un exercice
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'exercice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       200:
 *         description: Exercice mis à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Exercice non trouvé
 */
router.put("/:id", exerciseController.updateExercise);

/**
 * @swagger
 * /api/exercises/{id}:
 *   delete:
 *     summary: Supprimer un exercice
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: Exercice non trouvé
 */
router.delete("/:id", exerciseController.deleteExercise);

module.exports = router;
