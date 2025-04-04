#!/bin/bash

# Vérifier si la base de données existe déjà
if psql -lqt | cut -d \| -f 1 | grep -qw fittracker; then
    echo "La base de données fittracker existe déjà"
else
    echo "Création de la base de données fittracker..."
    createdb fittracker
fi

# Exécuter le script SQL
echo "Création des tables..."
psql -d fittracker -f src/config/init.sql

echo "Configuration terminée !" 