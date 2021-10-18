const express = require('express');
const Router = express.Router();
const conn = require('../db');
const objP = require('../libs/poke_obj');
const fc = require('../libs/functions');

// Por aqui va a obtener todos los pokemones
Router.get('/get-all', async (req, res) => {
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
Router.get('/getById/:id', async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
        res.status(200).json({message: "That's not a number"});
    } else {
        let _id = id.padStart(3, '0');
        const sql = `SELECT name, url_photo FROM pokemons WHERE id='${_id}'`;
        let pokemon = await conn.query(sql);
        if (pokemon.length !== 0) {
            res.status(200).json(pokemon[0]);
        } else {
            res.status(200).json({message: `The pokemon ${_id} isn't exists`});
        }
    }
});

// Obtener el pokemon por su nombre
Router.get('/getByName/:name', fc.inputNameValid, async (req, res) => {
    // Normalizar el nombre
    let { name } = req.params;
    name = name.toLowerCase();
    name = name.replace(name[0], name[0].toUpperCase());

    const _sql = objP._sql;

    const sql = `
    SELECT ${_sql['id']},${_sql['n']},${_sql['t']},${_sql['s']['HP']},${_sql['s']['ATK']},
    ${_sql['s']['DEF']},${_sql['s']['ATK_E']},${_sql['s']['DEF_E']},${_sql['s']['SPEED']},
    ${_sql['u']} FROM pokemons INNER JOIN stadistics ON ${_sql['s']['pid']}=
    ${_sql['id']} WHERE name='${name}'`;

    let pokemon = await conn.query(sql);
    let pokeResult = objP.pokemon;
    pokemon = pokemon[0];

    if (pokemon === undefined) {
        res.status(200).json({message: 'That pokemon is dont exists'});
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
            } else if (key === "description") {
                let sqlD = `SELECT description FROM descriptions WHERE pokemon_id=${pokemon['id']}`;
                let description = await conn.query(sqlD);
                pokeResult[key] = description[0][key];
            } else {
                pokeResult[key] = pokemon[key];
            }
        }
        res.status(200).json(pokeResult);
    }
});

module.exports = Router;