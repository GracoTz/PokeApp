const express = require('express');
const Router = express.Router();
const conn = require('./db').connection;
const objP = require('./prototypes/poke_obj');
const fs = require('fs');

// Por aqui va a obtener todos los pokemones
Router.get('/get-all', (req, res) => {
    let _sql = imp._sql;

    let sql = `
    SELECT ${_sql['id']},${_sql['n']},${_sql['t']},${_sql['s']['HP']},${_sql['s']['ATK']},
    ${_sql['s']['DEF']},${_sql['s']['ATK_E']},${_sql['s']['DEF_E']},${_sql['u']},${_sql['d']} 
    FROM pokemons INNER JOIN stadistics ON ${_sql['s']['pid']}=${_sql['id']}`;

    conn.query(sql, (err, results) => {
        if (err) throw err;
        let pokemons = [];
        let pokeResult = objP.pokemon;

        for (const pokemon of results) {
            for (const atr in obj) {
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

// Obtener el pokemon por su nombre
Router.get('/get/:name', (req, res) => {
    // Normalizar el nombre
    let { name } = req.params;
    name = name.toLowerCase();
    name = name.replace(name[0], name[0].toUpperCase());
    
    // Consulta a la base de datos
    const sql = `SELECT * FROM pokemons WHERE name = '${name}'`;
    conn.query(sql, (err, pokemon) => {
        if (err) throw err;
        if (pokemon == '') {
            res.status(404).json({message: "That pokemon is not exists in the database"});
        } else {
            res.status(200).json(pokemon);
        }
    });
});

// Poder ingresar un pokemon a la base de datos
Router.post('/add', (req, res) => {
    const { id, name, photo, description } = req.body;
    const data = {id,name,photo,description};

    const sql = `INSERT INTO pokemons SET ?`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.status(200).json({message: "Pokemon inserted correctly in the database"});
    });
});

// Aqui voy a agregar a la base de datos todos los datos de un archivo json
Router.get('/add-pokemons', (req, res) => {
    fs.readFile('../pokemons.json', 'utf-8', (err, file) => {
        let json = JSON.parse(file);
        let pokemons = json.pokemons;
        let pokemon_data = {id: 0, name: "", type: "", url_photo: "", description: ""};
        let stadistics_data = {pokemon_id: 0 ,HP: 0, ATK: 0, DEF: 0, ATK_ESP: 0, DEF_ESP: 0};
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