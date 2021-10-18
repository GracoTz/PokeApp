const express = require('express');
const Router = express.Router();
const conn = require('../db').connection;
const fs = require('fs');

// Aqui voy a agregar a la base de datos todos los datos de un archivo json
Router.get('/add-pokemons', (req, res) => {
    fs.readFile('../pokemons.json', 'utf-8', (err, file) => {
        let json = JSON.parse(file);
        let pokemons = json.pokemons;
        let pokemon_data = {id: "", name: "", type: "", url_photo: "", description: ""};
        let stadistics_data = {pokemon_id: "" ,HP: 0, ATK: 0, DEF: 0, ATK_ESP: 0, DEF_ESP: 0, SPEED: 0};
        let sqlP = 'INSERT INTO pokemons SET ?';
        let sqlS = 'INSERT INTO stadistics SET ?';

        for (const pokemon of pokemons) {

            for (const atr in pokemon_data) {
                pokemon_data[atr] = pokemon[atr];
            }

            for (const atr in stadistics_data) {
                stadistics_data[atr] = pokemon.stadistics[atr];
            }

            conn.query(sqlP, pokemon_data);
            conn.query(sqlS, stadistics_data);
        }
        res.status(200).json({message: "Data Inserted correctly"});
    });
});

module.exports = Router;