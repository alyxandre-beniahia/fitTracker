const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const auth = require("../middleware/auth");

// Routes protégées par authentification
router.use(auth);

// Routes pour les statistiques
router.get("/workouts", statsController.getWorkoutStats);
router.get(
  "/exercises/:exercise_id/history",
  statsController.getExerciseHistory
);
router.get("/monthly", statsController.getMonthlyStats);
router.get("/exercises/frequent", statsController.getMostFrequentExercises);

module.exports = router;
