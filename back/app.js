//------------------------------------------
// Importation des modules 
//------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const saucesRoutes = require('./routes/sauces');
const userRoutes= require('./routes/user');


//------------------------------------------
// CORS (partage de ressources entre origines multiples)
//------------------------------------------

/* connection à mongo DB */
mongoose.connect('mongodb+srv://user-01-test:gafhHIXv9mDwpsrK@cluster0.te7xzeo.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connection to MongoDB success !'))
    .catch(() => console.log('Connection to MongoDB failed !'));

    const app = express();

app.use((req, res, next) => {
    /* Droit d'accés => tout le monde */
    res.setHeader('Access-Control-Allow-Origin', '*');
    /* Type de 'HEADERS' acceptés (en-tête) */
    res.setHeader('Access-Control-Allow-Headers', 'Origin,, X-Requested-With, Content, Accept, Content-Type, Authorization');
    /* Méthodes de requêtes acceptées */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/* Intercepte la requête et la transforme au bon format */
app.use(bodyParser.json());

//--------------------------------------------
//--------------------------------------------
/* Utilidation du router de saucesRoutes */
app.use('/api/sauces', saucesRoutes);

/* ... router de userRoutes */
app.use('/api/auth', userRoutes);

/* Utilisation du fichier statique pour cette route */
app.use('/images', express.static(path.join(__dirname, 'images')));

/* Export du cfichier pour accés depuis les autres fichiers */
module.exports = app;