const express = require('express');
const Router = express.Router();
const fc = require('../libs/functions');
const conn = require('../db');

Router.get('/set-favorite/:id', async (req, res) => {
    const { id } = req.params;
    let isFavorite = await conn.query(`SELECT Favorite FROM pokemons WHERE id=${id}`);
    if (isFavorite[0]['Favorite']) {
        conn.query(`UPDATE pokemons SET Favorite=false WHERE id=${id}`);
        res.send({ok: true, message: "The pokemon is not favorite now."});
    } else {
        conn.query(`UPDATE pokemons SET Favorite=true WHERE id=${id}`);
        res.send({ok: true, message: "The pokemon is favorite now."});
    }
});

Router.get('/isFavorite/:id', async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT Favorite From pokemons WHERE id=${id}`;
    let isFavorite = await conn.query(sql);
    res.send(isFavorite[0]);
});

Router.get('/get-favorites', async (req, res) => {
    let favorites = await conn.query('SELECT id, Name, Types, Photo FROM pokemons WHERE Favorite=1');
    let pokemons = [];
    for (const pokemon of favorites) {
        let pokeResult = {id:"",Name:"",Types:[],Photo:""};
        for (const key in pokemon) {
            if (key === "Types") {
                pokeResult[key] = fc.createArray(pokemon[key]);
            } else {
                pokeResult[key] = pokemon[key];
            }
        }
        pokemons.push(pokeResult);
    }
    res.send(pokemons);
});

module.exports = Router;