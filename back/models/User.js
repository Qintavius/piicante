/* Appel de mongoose */
const mongoose= require('mongoose');
/* Appel de mongoose-unique-validator */
const uniqueValidator = require('mongoose-unique-validator');

/* Création d'un schéma unique de connection user */
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

/* utilisation du schéma via le plugin unique-validator */
userSchema.plugin(uniqueValidator);

/* Exportation du model schéma */
module.exports = mongoose.model('User', userSchema);