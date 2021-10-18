// Este objeto contiene en cada propiedad el nombre de la tabla y su columna
// Es para poder hacer el inner join sin tener que hacerlo en un string ya que seria muy extenso
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
        DEF_E: "stadistics.DEF_ESP",
        SPEED: "stadistics.SPEED"
    },
    u: "pokemons.url_photo"
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
        DEF_ESP: 0,
        SPEED: 0
    },
    url_photo: "",
    description: ""
};

module.exports = {_sql, pokemon};