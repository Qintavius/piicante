/* Appel du model User */
const User = require('../models/User');

/* Appel de bcrypt pour le hashage */
const bcrypt = require('bcrypt');

/* Appel de jsonwebtoken */
const jwt = require('jsonwebtoken');

//--------------------------------------------
// SIGN UP
//--------------------------------------------
exports.signup = (req, res, next) => {
    /* hashage du MDP en 10 tours */
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        /* Création model user + mdp hashé */
        const user = new User({
            email: req.body.email,
            password: hash
        });
        /* Sauvegarde du user dans la BDD */
        user.save()
        .then(() => res.status(201).json({ message: 'User created !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//--------------------------------------------
// LOGIN
//--------------------------------------------
exports.login = (req, res, next) => {
    /* Recherche du user par email */
    User.findOne({ email: req.body.email })
    .then(user => {
        if(user === null) {
            /* Si pas de correspondance = message d'info retourné */
            res.status(401).json({ message: 'Identifiant ou mot de passe est incorrecte'});
        } else {
            /* Si OK, bcrypt compare le MDP en requête avec celui enregistré */
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    res.status(401).json({ message: 'Identifiant ou mot de passe est incorrecte' });
                } else {
                    /* Si OK renvoie un token encodé avec un TTL de 24H */
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({
                            userId: user._id
                        },
                        'RANDOM_TOKEN_SECRET',
                        {
                            expiresIn: '24h'
                        })
                    });
                }
            })
            .catch(error => {
                res.status(500).json({ error });
            })
        }
    })
    .catch(error => {
        res.status(500).json( {error} );
    })
};