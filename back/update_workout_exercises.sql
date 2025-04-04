-- Ajouter la colonne calories_burned à la table workout_exercises
ALTER TABLE workout_exercises ADD COLUMN IF NOT EXISTS calories_burned INTEGER DEFAULT 0;

-- Ajouter la colonne duration à la table workout_exercises
ALTER TABLE workout_exercises ADD COLUMN IF NOT EXISTS duration INTEGER DEFAULT 0; 