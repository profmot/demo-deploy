//express et mongoose
const express = require('express');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/messages-routes');

const app = express();
// chercher les variables d'environnemnt
const PORT = 5000;
const MONGODB_URI = 'mongodb://localhost:27017/db-deploy';

// section des middlewares

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // header et value * quels domaines peuvent acceder a notre serveur
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  ); //quel header sont autorisés ( pourait etre * pour tout)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); // quelles methodes HTTP sont autorisées
  next();
});

app.use('/api/messages', messageRoutes);

//connexion BD + demarrage serveur web
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
