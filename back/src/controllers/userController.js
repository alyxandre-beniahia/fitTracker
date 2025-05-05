const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateTokens = async (userId) => {
  // Générer l'access token (15 minutes)
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  // Générer le refresh token (7 jours)
  const refreshToken = crypto.randomBytes(40).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // Sauvegarder le refresh token
  await db.query(
    "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
    [userId, refreshToken, expiresAt]
  );

  return { accessToken, refreshToken };
};

const setTokenCookies = (res, accessToken, refreshToken) => {
  // Access Token Cookie (15 minutes)
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  // Refresh Token Cookie (7 jours)
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
  });
};

const userController = {
  // Inscription d'un nouvel utilisateur
  register: async (req, res) => {
    try {
      const { username, email, password, first_name, last_name } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const userExists = await db.query(
        "SELECT * FROM users WHERE email = $1 OR username = $2",
        [email, username]
      );

      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: "Utilisateur déjà existant" });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer l'utilisateur
      const result = await db.query(
        `INSERT INTO users (username, email, password, first_name, last_name)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, username, email, first_name, last_name`,
        [username, email, hashedPassword, first_name, last_name]
      );

      // Générer les tokens
      const { accessToken, refreshToken } = await generateTokens(
        result.rows[0].id
      );

      // Définir les cookies
      setTokenCookies(res, accessToken, refreshToken);

      res.status(201).json({
        message: "Utilisateur créé avec succès",
        user: result.rows[0],
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Création du profil utilisateur
  createProfile: async (req, res) => {
    try {
      const { age, height, weight } = req.body;
      const userId = req.user.id;

      // Vérifier si l'utilisateur existe
      const userExists = await db.query("SELECT * FROM users WHERE id = $1", [
        userId,
      ]);

      if (userExists.rows.length === 0) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Mettre à jour le profil de l'utilisateur
      const result = await db.query(
        `UPDATE users 
         SET age = $1, height = $2, weight = $3, updated_at = CURRENT_TIMESTAMP
         WHERE id = $4
         RETURNING id, username, email, first_name, last_name, age, height, weight`,
        [age, height, weight, userId]
      );

      res.status(200).json({
        message: "Profil créé avec succès",
        user: result.rows[0],
      });
    } catch (error) {
      console.error("Erreur lors de la création du profil:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Connexion utilisateur
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Vérifier si l'utilisateur existe
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (result.rows.length === 0) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      const user = result.rows[0];

      // Vérifier le mot de passe
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      // Générer les tokens
      const { accessToken, refreshToken } = await generateTokens(user.id);

      // Définir les cookies
      setTokenCookies(res, accessToken, refreshToken);

      res.json({
        message: "Connexion réussie",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Obtenir le profil de l'utilisateur
  getProfile: async (req, res) => {
    try {
      const result = await db.query(
        "SELECT id, username, email, first_name, last_name, age, height, weight FROM users WHERE id = $1",
        [req.user.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Mettre à jour le profil
  updateProfile: async (req, res) => {
    try {
      const { first_name, last_name, age, height, weight } = req.body;

      const result = await db.query(
        `UPDATE users 
         SET first_name = $1, last_name = $2, age = $3, height = $4, weight = $5, updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING id, username, email, first_name, last_name, age, height, weight`,
        [first_name, last_name, age, height, weight, req.user.id]
      );

      res.json({
        message: "Profil mis à jour avec succès",
        user: result.rows[0],
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Rafraîchir le token
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token manquant" });
      }

      // Vérifier si le refresh token existe et n'a pas été utilisé
      const result = await db.query(
        `SELECT rt.*, u.id as user_id 
         FROM refresh_tokens rt 
         JOIN users u ON rt.user_id = u.id 
         WHERE rt.token = $1 AND rt.used = false AND rt.expires_at > NOW()`,
        [refreshToken]
      );

      if (result.rows.length === 0) {
        return res
          .status(401)
          .json({ message: "Refresh token invalide ou expiré" });
      }

      // Marquer le refresh token comme utilisé
      await db.query("UPDATE refresh_tokens SET used = true WHERE token = $1", [
        refreshToken,
      ]);

      // Générer de nouveaux tokens
      const { accessToken, refreshToken: newRefreshToken } =
        await generateTokens(result.rows[0].user_id);

      // Définir les nouveaux cookies
      setTokenCookies(res, accessToken, newRefreshToken);

      res.json({ message: "Tokens rafraîchis avec succès" });
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Déconnexion
  logout: async (req, res) => {
    try {
      // Supprimer les cookies
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      res.json({ message: "Déconnexion réussie" });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};

module.exports = userController;
