/* Appel de express */
const express = require('express');

/* Appel middleware d'authentification pour toutes les routes */
const auth = require('../middleware/auth');

/* Création router avec méthode Router() d'express */
const router = express.Router();

/* Appel de Multer pour l'ajout d'images */
const multer = require('../middleware/multer-config');

/* Import logique des routes */
const saucesCtrl = require('../controllers/sauces');

//--------------------------------------------
// Routes SAUCES
//--------------------------------------------
// Récupère tous les objets
router.get('/', auth, saucesCtrl.getAllSauces);

// Création nouvel objet
router.post('/', auth, multer, saucesCtrl.createSauce);

// Récupère un objet
router.get('/:id', auth, saucesCtrl.getOneSauce);

// Modification objet
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

// Suppression objet
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// Like objet
router.post('/:id/like', auth, saucesCtrl.likeSauce);

/* Export router */
module.exports = router;