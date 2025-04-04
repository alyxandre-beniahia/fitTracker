const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const auth = require("../middleware/auth");

// Toutes les routes sont protégées
router.use(auth);

// Routes pour les objectifs
router.post("/", goalController.createGoal);
router.get("/", goalController.getGoals);
router.get("/:id", goalController.getGoal);
router.put("/:id", goalController.updateGoal);
router.delete("/:id", goalController.deleteGoal);

module.exports = router;
