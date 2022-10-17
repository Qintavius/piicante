const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

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

module.exports = router;