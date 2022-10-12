const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// Création nouvel objet
router.post('/', stuffCtrl.createSauce);

// Modification objet
router.put('/:id', stuffCtrl.modifySauce);

// Suppression objet
router.delete('/:id', stuffCtrl.deleteSauce);

// Récupère un objet
router.get('/:id', stuffCtrl.getOneSauce);

// Récupère tous les objets
router.get('/', stuffCtrl.getAllSauces);

module.exports = router;