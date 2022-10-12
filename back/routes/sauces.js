const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');

// Création nouvel objet
router.post('/', auth, saucesCtrl.createSauce);

// Modification objet
router.put('/:id', auth, saucesCtrl.modifySauce);

// Suppression objet
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// Récupère un objet
router.get('/:id', auth, saucesCtrl.getOneSauce);

// Récupère tous les objets
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;