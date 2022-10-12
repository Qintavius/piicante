const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');

// Création nouvel objet
router.post('/', saucesCtrl.createSauce);

// Modification objet
router.put('/:id', saucesCtrl.modifySauce);

// Suppression objet
router.delete('/:id', saucesCtrl.deleteSauce);

// Récupère un objet
router.get('/:id', saucesCtrl.getOneSauce);

// Récupère tous les objets
router.get('/', saucesCtrl.getAllSauces);

module.exports = router;