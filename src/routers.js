const express = require('express');
const Router = express.Router();
const conn = require('./db').connection;
const objP = require('./libs/poke_obj');
const fc = require('./libs/functions');
const fs = require('fs');

// Por aqui va a obtener todos los pokemones
Router.get('/get-all', (req, res) => {
    let _sql = objP._sql;

    let sql = `
    SELECT ${_sql['id']},${_sql['n']},${_sql['t']},${_sql['s']['HP']},${_sql['s']['ATK']},
    ${_sql['s']['DEF']},${_sql['s']['ATK_E']},${_sql['s']['DEF_E']},${_sql['u']},${_sql['d']} 
    FROM pokemons INNER JOIN stadistics ON ${_sql['s']['pid']}=${_sql['id']}`;

    conn.query(sql, (err, results) => {
        if (err) throw err;
        let pokemons = [];
        let pokeResult = objP.pokemon;

        for (const pokemon of results) {
            for (const atr in pokeResult) {
                if (atr === "stadistics") {
                    pokeResult['stadistics']['HP'] = pokemon['HP'];
                    pokeResult['stadistics']['ATK'] = pokemon['ATK'];
                    pokeResult['stadistics']['DEF'] = pokemon['DEF'];
                    pokeResult['stadistics']['ATK_ESP'] = pokemon['ATK_ESP'];
                    pokeResult['stadistics']['DEF_ESP'] = pokemon['DEF_ESP'];
                } else {
                    pokeResult[atr] = pokemon[atr];
                }
            }
            pokemons.push(pokeResult);
        }
        res.status(200).json(pokemons);
    });
});

// Obtener un pokemon a partir de su id
Router.get('/getById/:id', (req, res) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
        res.status(404).send("That's not a number");
    } else {
        const sql = `SELECT id, name, url_photo, description FROM pokemons WHERE id='${id}'`;
        conn.query(sql, (err, pokemon) => {
            if (err) throw err;
            if (pokemon.length !== 0) {
                res.status(200).json(pokemon[0]);
            } else {
                res.status(200).send('That id is dont exists');
            }
        });
    }
});

// Obtener el pokemon por su nombre
Router.get('/getByName/:name', fc.inputNameValid, (req, res) => {
    // Normalizar el nombre
    let { name } = req.params;
    name = name.toLowerCase();
    name = name.replace(name[0], name[0].toUpperCase());

    const _sql = objP._sql;

    const sql = `
    SELECT ${_sql['id']},${_sql['n']},${_sql['t']},${_sql['s']['HP']},${_sql['s']['ATK']},
    ${_sql['s']['DEF']},${_sql['s']['ATK_E']},${_sql['s']['DEF_E']},${_sql['u']},${_sql['d']} 
    FROM pokemons INNER JOIN stadistics ON ${_sql['s']['pid']}=${_sql['id']} WHERE name='${name}'`;

    conn.query(sql, (err, pokemon) => {
        if (err) throw err;
        let pokeResult = objP.pokemon;
        pokemon = pokemon[0];

        if (pokemon === undefined) {
            res.status(404).send('This pokemon is dont exists');
        } else {
            for (const key in pokeResult) {
                if (key === "stadistics") {
                    for (const _key in pokeResult[key]) {
                        pokeResult[key][_key] = pokemon[_key];
                    }
                } else if (key === "type") {
                    let haveTwoTypes = pokemon[key].indexOf(',');
                    if (haveTwoTypes !== -1) {
                        let types = pokemon[key].split(',');
                        pokeResult[key] = types;
                    } else {
                        pokeResult[key] = pokemon[key];
                    }
                } else {
                    pokeResult[key] = pokemon[key];
                }
            }
            res.status(200).json(pokeResult);
        }
    });
});

// Aqui voy a agregar a la base de datos todos los datos de un archivo json
Router.get('/add-pokemons', (req, res) => {
    fs.readFile('../pokemons.json', 'utf-8', (err, file) => {
        let json = JSON.parse(file);
        let pokemons = json.pokemons;
        let pokemon_data = {id: 0, name: "", type: "", url_photo: "", description: ""};
        let stadistics_data = {pokemon_id: 0 ,HP: 0, ATK: 0, DEF: 0, ATK_ESP: 0, DEF_ESP: 0, SPEED: 0};
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