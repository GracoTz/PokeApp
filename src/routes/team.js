const express = require('express');
const Router = express.Router();
const fc = require('../libs/functions');
const conn = require('../db');

Router.get('/getTeams', async (req, res) => {
    let sqlGT = `SELECT * FROM teams`;
    let teams = await conn.query(sqlGT);
    let Response = [];
    for (const team of teams) {
        let proto = {id:0,Name:"",Pokemons:[]};
        for (const key in proto) {
            if (key === 'Pokemons') {
                if (team['pokemons_id'] !== null) {
                    let arrayIDs = fc.createArray(team['pokemons_id']);
                    for (const id of arrayIDs) {
                        let res = await conn.query(`SELECT Name, Photo FROM pokemons WHERE id=${id}`);
                        proto['Pokemons'].push(res[0]);
                    }
                } else {
                    proto['Pokemons'] = [];
                }
            } else {
                proto[key] = team[key];
            }
        }
        Response.push(proto);
    }
    res.send(Response);
});

Router.post('/createTeam', async (req, res) => {
    const { name } = req.body;
    let getName = await conn.query(`SELECT * FROM teams WHERE Name = '${name}'`);
    if (getName.length !== 0) {
        res.send({ok: false, message: 'This team name is already exists'});
    } else {
        const sql = `INSERT INTO teams SET Name='${name}'`;
        let result = await conn.query(sql);
        res.send({ok: true, id: result.insertId});
    }
});

Router.delete('/deleteTeam/:id', async (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM teams WHERE id=${id}`;
    conn.query(sql);
    res.end();
});

Router.get('/getTeamsNames', async (req, res) => {
    let getNames = await conn.query(`SELECT Name FROM teams`);
    if (getNames.length === 0) {
        res.send({ok: false, message: 'Please create a team to add a pokemon'});
    } else {
        let response = [];
        for (const obj of getNames) {
            response.push(obj['Name']);
        }
        res.send(response);
    }
});

Router.patch('/addPokemon/:name/:id', async (req, res) => {
    const { name, id } = req.params;
    let sqlN = `SELECT pokemons_id FROM teams WHERE Name = '${name}'`;
    let elements = await conn.query(sqlN);
    if (elements[0].pokemons_id === null) {
        conn.query(`UPDATE teams SET pokemons_id = '${id}' WHERE Name = '${name}'`);
        res.send({ok: true});
    } else {
        let pokemons = fc.createArray(elements[0].pokemons_id);
        if (pokemons.length === 6) {
            res.send({ok: false, message: `The ${name} Team is full`});
        } else {
            pokemons.push(id);
            pokemons = pokemons.join(',');
            conn.query(`UPDATE teams SET pokemons_id = '${pokemons}' WHERE Name = '${name}'`);
            res.send({ok: true});
        }
    }
});

module.exports = Router;