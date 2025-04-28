import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Déterminer le chemin correct vers les fichiers statiques
let publicPath = path.join(__dirname, 'public');
// Si nous sommes dans le dossier dist après le build
if (fs.existsSync(path.join(__dirname, '..', 'dist', 'public'))) {
  publicPath = path.join(__dirname, '..', 'dist', 'public');
}

console.log('Serving static files from:', publicPath);

// Servir les fichiers statiques
app.use(express.static(publicPath));

// Route de test distincte pour vérifier le fonctionnement
app.get('/test', (req, res) => {
  res.sendFile(path.join(publicPath, 'test.html'));
});

// Pour toutes les autres routes, renvoyer index.html (pour le routing côté client)
app.get('*', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');
  console.log('Sending index.html from:', indexPath);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Index.html not found at ' + indexPath);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT}`);
});