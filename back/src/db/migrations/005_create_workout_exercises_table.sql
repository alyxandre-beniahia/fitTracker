CREATE TABLE IF NOT EXISTS workout_exercises (
    id SERIAL PRIMARY KEY,
    workout_id INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id INTEGER NOT NULL, -- ID de l'exercice de wger
    name VARCHAR(255) NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER,
    duration INTEGER, -- durée en secondes
    weight DECIMAL(5,2), -- poids en kg
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 