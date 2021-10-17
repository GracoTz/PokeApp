const _sql = {
    id: "pokemons.id",
    n: "pokemons.name",
    t: "pokemons.type",
    s: {
        pid: "stadistics.pokemon_id",
        HP: "stadistics.HP",
        ATK: "stadistics.ATK",
        DEF: "stadistics.DEF",
        ATK_E: "stadistics.ATK_ESP",
        DEF_E: "stadistics.DEF_ESP"
    },
    u: "pokemons.url_photo",
    d: "pokemons.description"
};

const pokemon = {
    id: 0,
    name: "",
    type: "",
    stadistics: {
        HP: 0,
        ATK: 0,
        DEF: 0,
        ATK_ESP: 0,
        DEF_ESP: 0
    },
    url_photo: "",
    description: ""
};

module.exports = {_sql, pokemon};