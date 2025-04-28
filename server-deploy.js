// Import des modules nécessaires
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration du chemin __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Création de l'application Express
const app = express();

// Définition du dossier contenant les fichiers statiques
const staticDir = path.join(__dirname, 'dist', 'public');
console.log('Serving static files from:', staticDir);

// Middleware pour servir les fichiers statiques
app.use(express.static(staticDir));

// Middlewares pour le logging des requêtes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Une route simple pour tester si le serveur répond
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Important: Pour toute autre route, renvoyer index.html (SPA routing)
app.get('*', (req, res) => {
  console.log(`Fallback route called for: ${req.url}`);
  res.sendFile(path.join(staticDir, 'index.html'));
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});