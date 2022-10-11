const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauce = require('./models/sauces');

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

app.post('/api/sauce', (req, res, next) => {
    delete req.body._id;
    const sauce = new sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Object saved !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauce', (req, res, next) => {
    const sauce = [
        {
            _id: 'sdfsdf',
            name: 'Ma sauce 01',
            manufacturer: 'Le sauceur',
            description: 'La bonne sauce',
            mainPepper: 'Piments',
            imageUrl: '',
            heat: 8,
            likes: 10,
            dislikes: 3,
            userLiked: 10,
            userDisliked: 3,
            userId: 'oihjqdfio',
        },
        {
            _id: 'qsdqsd',
            name: 'Ma sauce 02',
            manufacturer: 'El sosado',
            description: 'La sosado del rei',
            mainPepper: 'Piments',
            imageUrl: '',
            heat: 10,
            likes: 21,
            dislikes: 6,
            userLiked: 21,
            userDisliked: 6,
            userId: 'hjkyhg',
        },
    ];
    res.status(200).json(sauce);
});

module.exports = app;