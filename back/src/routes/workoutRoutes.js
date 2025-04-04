const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");
const auth = require("../middleware/auth");

// Routes protégées pour les séances
router.post("/", auth, workoutController.createWorkout);
router.get("/", auth, workoutController.getWorkouts);
router.get("/:id", auth, workoutController.getWorkout);
router.put("/:id", auth, workoutController.updateWorkout);
router.delete("/:id", auth, workoutController.deleteWorkout);

// Routes protégées pour les exercices d'une séance
router.post("/:workout_id/exercises", auth, workoutController.addExercise);
router.put(
  "/:workout_id/exercises/:exercise_id",
  auth,
  workoutController.updateExercise
);
router.delete(
  "/:workout_id/exercises/:exercise_id",
  auth,
  workoutController.deleteExercise
);

module.exports = router;
