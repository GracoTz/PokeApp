const express = require('express');
const Router = express.Router();
const conn = require('../db');
const fc = require('../libs/functions');

async function updateFavorite (sql) {
    let result = await conn.query(sql);
    res.status(200).json(result);
}

Router.put('/set-favorite/:id', async (req, res) => {
    const { id } = req.params;
    if (fc.validIdField(id)) {
        let isFavorite = await conn.query(`SELECT favorite FROM pokemons WHERE id=${id}`);
        console.log(isFavorite);
        if (isFavorite) updateFavorite(`UPDATE pokemons SET favorite = 0 WHERE id = ${id}`);
        else updateFavorite(`UPDATE pokemons SET favorite = 1 WHERE id = ${id}`);
    } else {
        res.status(404).send({message: 'That is not a number'});
    } 
});

Router.get('/get-favorites', async (req, res) => {
    let sql = 'SELECT name, type FROM POKEMONS WHERE favorite = 1';
    let result = await conn.query(sql);
    console.log(result);
    res.status(200).json(result);
});

module.exports = Router;