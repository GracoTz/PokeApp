const express = require('express');
const Router = express.Router();
const conn = require('../db');

// Por aqui va a obtener todos los pokemones
Router.get('/get-all', async (req, res) => {
    // Devolver todos los pokemones pero solo algunas propiedades
});

// Devolver al pokemon solo con los datos solicitados
Router.get('/getRandom/:id', async (req, res) => {
    let { id } = req.params;
    if (!isNaN(Number(id))) {
        id = id.padStart(3, '0');
        const sql = `SELECT id, Name, Photo FROM pokemons WHERE id='${id}'`;
        let pokemon = await conn.query(sql);
        if (pokemon.length !== 0) {
            res.json(pokemon[0]);
        } else {
            res.json({message: `The pokemon ${id} isn't exists`});
        }
    } else {
        res.status(404).json({message: "Failed Request"});
    }
});

// Devolver al pokemon con todos sus datos
Router.get('/getFullPokemon/:id', async (req, res) => {
    // Enviar al pokemon solicitado con todos sus datos
});

module.exports = Router;