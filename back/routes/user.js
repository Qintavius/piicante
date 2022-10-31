/* Appel de Express */
const express = require('express');

/* Définition du express.Router */
const router = express.Router();

/* Importation logique des routes */
const userCtrl = require('../controllers/user');

//--------------------------------------------
// Routes USER
//--------------------------------------------
/* Intercepte requête POST pour inscription */
router.post('/signup', userCtrl.signup);

/* Intercepte requête POST pour authentification */
router.post('/login', userCtrl.login);

/* Exporte router */
module.exports = router;
