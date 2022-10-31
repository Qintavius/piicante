/* importation de multer pour la gestion de fichiers entrant dans les requêtes HTTP */
const multer = require('multer');


/* Définition des formats de fichiers images */
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

/* Enregistre sur le disque + path de destination */
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        /* Création d'une convention de nommage des fichiers images (espace => underscore, correspondance MIMETYPE, ajout date au nom du fichier) */
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

/* Export du fichier de façon unique via multer */
module.exports = multer({storage: storage}).single('image');