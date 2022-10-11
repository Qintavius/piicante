const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauce = require('./models/sauces');
const sauces = require('./models/sauces');

const app = express();

mongoose.connect('mongodb+srv://user-01-test:gafhHIXv9mDwpsrK@cluster0.te7xzeo.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connection to MongoDB success !'))
    .catch(() => console.log('Connection to MongoDB failed !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Création nouvel objet
app.post('/api/sauce', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Object saved !'}))
    .catch(error => res.status(400).json({ error }));
});

// Modification objet
app.put('/api/sauce/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Object modified !'}))
    .catch(error => res.status(400).json({ error }));
});

// Suppression objet
app.delete('/api/sauce/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Object suppressed !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauce/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/sauce', (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;