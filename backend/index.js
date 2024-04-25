//express et mongoose
const express = require('express');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/messages-routes');

const app = express();
// chercher les variables d'environnemnt
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/db-deploy';

// section des middlewares

app.use(express.json());
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
