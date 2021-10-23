const express = require('express');
const Router = express.Router();
const conn = require('../db');

Router.get('/set-favorite/:id', async (req, res) => {
    const { id } = req.params;
    let isFavorite = await conn.query(`SELECT Favorite FROM pokemons WHERE id=${id}`);
    if (isFavorite[0]['Favorite']) {
        await conn.query(`UPDATE pokemons SET Favorite=false WHERE id=${id}`);
        res.json({ok: true, message: "The pokemon is not favorite now."});
    } else {
        await conn.query(`UPDATE pokemons SET Favorite=true WHERE id=${id}`);
        res.json({ok: true, message: "The pokemon is favorite now."});
    }
});

Router.get('/isFavorite/:id', async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT Favorite From pokemons WHERE id=${id}`;
    let isFavorite = await conn.query(sql);
    res.json(isFavorite[0]);
});

Router.get('/get-favorites', async (req, res) => {
    // Obtener todos los pokemones favoritos
});

module.exports = Router;