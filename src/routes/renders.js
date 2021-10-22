const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.redirect('/Home');
});

Router.get('/pokemons', (req, res) => {
    res.redirect('/pokemons');
});

Router.get('/favorites', (req, res) => {
    res.redirect('/favorites');
});

Router.get('/teams', (req, res) => {
    res.redirect('/team');
});

module.exports = Router;