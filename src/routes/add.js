const express = require('express');
const Router = express.Router();
const conn = require('../db');
const fs = require('fs');
const interface = require('../libs/objects');

// Aqui voy a agregar a la base de datos todos los datos de un archivo json
Router.get('/add-pokemons', (req, res) => {
    // Leer el archivo
    fs.readFile('../Database/pokemons.json', 'utf-8', async (err, file) => {
        // Verificar error en la lectura y cerrar proceso si hay
        if (err) {
            console.error(err);
            process.exit(1);
        }

        // Parsearlo a json para usarlo
        let pokemonsJSON = JSON.parse(file);

        // Sacar el array del archivo
        let pokemons = pokemonsJSON.pokemons;

        // Crear los objetos de cada tabla de la base de datos
        let pokemons_table     = {id:"",Name:"",Types:"",Favorite:false,Photo:""};
        let descriptions_table = {pokemon_id:"", Description:""};
        let stadistics_table   = {pokemon_id:"",HP:0,ATK:0,DEF:0,ATK_SP:0,DEF_SP:0,SPEED:0};
        let basic_info_table   = {pokemon_id:"",Species:"",Height:"",Weight:"",Abilities:""};
        let evolutions_table   = {pokemon_id:"",Have_Evolutions:0,Evolutions:"",How_Progress:""};
        let pokeInterface = interface.pokemon;

        try {
            // Iterar por cada pokemon
            for (const pokemon of pokemons) {
                for (const key in pokeInterface) {

                    if (key === "Description") {
                        descriptions_table['pokemon_id'] = pokemon['id'];
                        descriptions_table['Description'] = pokemon[key];

                    } else if (key === "Stadistics") {
                        for (const _key in stadistics_table) {
                            if (_key === "pokemon_id") {
                                stadistics_table[_key] = pokemon['id'];
                            } else {
                                stadistics_table[_key] = pokemon[key][_key];
                            }
                        }

                    } else if (key === "Basic_Info") {
                        for (const _key in basic_info_table) {
                            if (_key === "pokemon_id") {
                                basic_info_table['pokemon_id'] = pokemon['id'];
                            } else {
                                basic_info_table[_key] = pokemon[key][_key];
                            }
                        }

                    } else if (key === "Evolutions") {
                        for (const _key in evolutions_table) {
                            if (_key === "pokemon_id") {
                                evolutions_table['pokemon_id'] = pokemon['id'];
                            } else {
                                evolutions_table[_key] = pokemon[key][_key];
                            }
                        } 

                    } else {
                        pokemons_table[key] = pokemon[key];
                    }
                }

                // Consulta para insertar los datos de los objetos de arriba en las tablas correspondientes
                await conn.query('INSERT INTO pokemons SET ?',     pokemons_table);
                await conn.query('INSERT INTO descriptions SET ?', descriptions_table);
                await conn.query('INSERT INTO stadistics SET ?',   stadistics_table);
                await conn.query('INSERT INTO basic_info SET ?',   basic_info_table);
                await conn.query('INSERT INTO evolutions SET ?',   evolutions_table);
            }

            // Si todos sale bien enviar mensaje de todo ok
            res.json({message: "All data introduced in the database"});

        } catch (err) {
            res.status(404).json({message: err.message});
        }
    });
});

module.exports = Router;