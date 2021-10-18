const express = require('express');
const Router = express.Router();
const conn = require('./db');
const fs = require('fs');

// Aqui voy a agregar a la base de datos todos los datos de un archivo json
Router.get('/add-pokemons', (req, res) => {
    fs.readFile('data/pokemons.json', 'utf-8', async (err, file) => {
        let json = JSON.parse(file);
        let pokemons = json.pokemons;
        let pokemon_data = {id: "", name: "", type: "", url_photo: ""};
        let stadistics_data = {pokemon_id: "" ,HP: 0, ATK: 0, DEF: 0, ATK_ESP: 0, DEF_ESP: 0, SPEED: 0};
        let descriptions_data = {pokemon_id: "", description: ""};
        let sqlP = 'INSERT INTO pokemons SET ?';
        let sqlS = 'INSERT INTO stadistics SET ?';
        let sqlD = 'INSERT INTO descriptions SET ?';

        for (const pokemon of pokemons) {
            for (const atr in pokemon) {
                if (atr === "stadistics") {
                   for (const key in stadistics_data) {
                        stadistics_data[key] = pokemon[atr][key];
                   }
                } else if (atr === "description") {
                    descriptions_data['pokemon_id'] = pokemon_data['id'];
                    descriptions_data[atr] = pokemon[atr];
                } else {
                    pokemon_data[atr] = pokemon[atr];
                }
            }
            await conn.query(sqlP, pokemon_data);
            await conn.query(sqlS, stadistics_data);
            await conn.query(sqlD, descriptions_data);
        }
        res.status(200).json({message: "Data Inserted correctly"});
    });
});

module.exports = Router;