/* Appel du middleware d'authentification */
const auth = require('../middleware/auth');

/* Appel du model sauce */
const Sauce = require('../models/Sauce');

/* Appel de fs (File System) pour aller dans l'explorateur de fichiers */
const fs = require('fs');


//--------------------------------------------
// Création Sauce
//--------------------------------------------
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;

    const sauceLike = {
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    }

    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        ...sauceLike
    });

    sauce.save()
    .then(() => { res.status(201).json({ message: 'Object registered !'})})
    .catch(error => { res.status(400).json( {error} )});
};

//--------------------------------------------
// Modification Sauce
//--------------------------------------------
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if(sauce.userId != req.auth.userId) {
            res.status(401).json({ message: 'Unauthorized !' })
        } else {
            Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Object modified !'}))
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch( (error) => {
        res.status(400).json( {error} );
    });
};

//--------------------------------------------
// Suppression Sauce
//--------------------------------------------
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        if(sauce.userId != req.auth.userId) {
            res.status(401).json({ message: 'Unauthorized' });
        } else {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Object suppressed' })})
                    .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

//--------------------------------------------
// Logique LIKE / DISLIKE
//--------------------------------------------
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        let likeValue;
        let user = req.body.userId;
        let liked = sauce.usersLiked;
        let unliked = sauce.usersDisliked;

        // Catégorise l'utilisateur dans un tableau
        let like = liked.includes(user);
        let unlike = unliked.includes(user);

        // Compare et attribue une valeur en fonction du tableau correspondant au vote de l'utilisateur
        if(like === true) {
            likeValue = 1;
        } else if (unlike === true) {
            likeValue = -1;
        } else {
            likeValue = 0;
        }
        // Détermine le choix de l'utilisateur par rapport à son choix
        // Si pas de like avant et like la sauce
        if(likeValue === 0 && req.body.like === 1) {
            sauce.likes += 1;
            sauce.usersLiked.push(user); //retourne l'id de l'utilisateur qui a liker

        // Si user passe de like à dislike 
        } else if(likeValue === 1 && req.body.like === 0) {
            sauce.likes -= 1;
            // Filtrage du tableau
            const changeLike = liked.filter((c) => c != user);
            sauce.usersLiked = changeLike;

        // Si user passe de dislike à like    
        } else if(likeValue === -1 && req.body.like === 0) {
            sauce.dislikes -= 1;
            const changeDislike = unliked.filter((c) => c != user);
            sauce.usersDisliked = changeDislike;
        } else if(likeValue === 0 && req.body.like === -1) {
            sauce.dislikes += 1;
            sauce.usersDisliked.push(user);
        } else {
            console.log("Unauthorized modification !");
        }

        Sauce.updateOne(
            { _id: req.params.id },
            {
                likes: sauce.likes,
                dislikes: sauce.dislikes,
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
            }
        )
        .then(() => res.status(201).json({ message: "Thanks for your opinion !"}))
        .catch((error) => { console.log(error) });
    })
    .catch((error) => res.status(404).json({ error }));
};