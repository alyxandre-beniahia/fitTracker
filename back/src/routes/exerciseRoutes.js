const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");
const auth = require("../middleware/auth");

// Routes publiques
router.get("/", exerciseController.getAllExercises);
router.get("/search", exerciseController.searchExercises);
router.get("/autocomplete", exerciseController.autocompleteExercises);
router.get("/categories", exerciseController.getExerciseCategories);
router.get("/muscles", exerciseController.getMuscles);
router.get("/equipment", exerciseController.getEquipment);

// Routes protégées
router.get("/:id", auth, exerciseController.getExerciseById);

// Routes protégées par authentification
router.use(auth);

// Routes pour les exercices
router.post("/", exerciseController.createExercise);
router.get("/", exerciseController.getExercises);
router.get("/:id", exerciseController.getExercise);
router.put("/:id", exerciseController.updateExercise);
router.delete("/:id", exerciseController.deleteExercise);

module.exports = router;
