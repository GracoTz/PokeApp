const express = require('express');
const Router = express.Router();
const conn = require('../db');
const fc = require('../libs/functions');
let pokemonSelected = "";

// Por aqui va a obtener todos los pokemones
Router.get('/getPokemons', async (req, res) => {
    let pokeData = await conn.query('SELECT id, Name, Types, Photo FROM pokemons');
    let pokemons = [];
    for (const pokemon of pokeData) {
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
    res.json(pokemons);
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

Router.get('/pokemon/:id', (req, res) => {
    const { id } = req.params;
    if (id === '000' || id === "") res.redirect('/home');
    else {
        pokemonSelected = req.params.id;
        res.redirect('/pokemon');
    }
});

// Devolver al pokemon con todos sus datos
Router.get('/getFullPokemon', async (req, res) => {
    // Enviar al pokemon solicitado con todos sus datos
    const interface = require('../libs/objects');
    const id = pokemonSelected;
    if (id === "") {
        res.redirect('/home');
    } else {

        // Sacar la info de las tablas y guardar en variables
        const pokemon_data     = await conn.query(`SELECT * FROM pokemons WHERE id='${id}'`);
        const description_data = await conn.query(`SELECT * FROM descriptions WHERE pokemon_id='${id}'`);
        const stadistics_data  = await conn.query(`SELECT * FROM stadistics WHERE pokemon_id='${id}'`);
        const basic_info_data  = await conn.query(`SELECT * FROM basic_info WHERE pokemon_id='${id}'`);
        const evolutions_data  = await conn.query(`SELECT * FROM evolutions WHERE pokemon_id='${id}'`);
    
        // Crear obj de respuesta
        let pokeResult = interface.pokemon;
    
        // Iterar por el obj a devolver e ir rellenando
        for (const key in pokeResult) {
            if (key === "Description") {
                pokeResult[key] = description_data[0][key];
    
            } else if (key === "Stadistics") {
                for (const _key in pokeResult[key]) {
                    pokeResult[key][_key] = stadistics_data[0][_key];
                }
    
            } else if (key === "Basic_Info") {
                for (const _key in pokeResult[key]) {
                    pokeResult[key][_key] = basic_info_data[0][_key];
                }
    
            } else if (key === "Evolutions") {
                for (const _key in pokeResult[key]) {
                    if (_key === "Evolutions") {
                        let arrayObjs = [];
                        let arrayIDs = fc.createArray(evolutions_data[0][_key]);
                        for (const ID of arrayIDs) {
                            let sql = `SELECT id, Name, Photo FROM pokemons WHERE id=${ID}`;
                            let data = await conn.query(sql);
                            arrayObjs.push(data[0]);
                        }
                        pokeResult[key][_key] = arrayObjs;
    
                    } else if (_key === "How_Progress") {
                        pokeResult[key][_key] = fc.createArray(evolutions_data[0][_key]);
    
                    } else {
                        pokeResult[key][_key] = evolutions_data[0][_key];
                    }
                }
    
            } else if (key === "Types") {
                pokeResult[key] = fc.createArray(pokemon_data[0][key]);
    
            }else {
                pokeResult[key] = pokemon_data[0][key];
            }
        }
        res.json(pokeResult);
    }
});

Router.get('/getPokemonsByChars/:character', async (req, res) => {
    let { character } = req.params;
    let pokeData;

    if (isNaN(Number(character))) {
        pokeData = await conn.query(`SELECT id, Name, Types, Photo FROM pokemons WHERE Name LIKE "%${character}%"`);
    } else {
        character = character.padStart(3, '0');
        pokeData = await conn.query(`SELECT id, Name, Types, Photo FROM pokemons WHERE id LIKE "%${character}"`);
    }
    
    let pokemons = [];
    for (const pokemon of pokeData) {
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
    res.json(pokemons);
});

module.exports = Router;