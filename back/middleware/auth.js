/* Appel jsonwebtoken pour le middleware d'authentification, permet l'échange sécurisé de token(jeton) */
const jwt = require('jsonwebtoken');

/* Export de la requète */
module.exports = (req, res, next) => {
    try {
        /* HEADER authorization de la requete, et récupération de l'élément à l'indice 1 (Bearer token) */
        const token = req.headers.authorization.split(' ')[1];
        /* Vérification token correspondance clef secrète */
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        /* Récupération du user ID décodé */
        const userId = decodedToken.userId;
        /* Réquète envoyé: si correspondance on passe au suivant */
        req.auth = {
            userId: userId
        };
    next();
    /* Si pas de correspondance: retourne une erreur 401 */
    } catch(error) {
        res.status(401).json({ error });
    }
};