-- CREATE THE DATABASE
CREATE DATABASE api_pokemon;

-- USE THIS DATABASE
USE api_pokemon;

-- TABLE POKEMONS
CREATE TABLE pokemons (
    `id` INT NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `url_photo` VARCHAR(25) NOT NULL,
    `description` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
);

-- TABLE STADISTICS
CREATE TABLE stadistics (
    pokemon_id INT NOT NULL,
    HP INT(3) NOT NULL,
    ATK INT(3) NOT NULL,
    DEF INT(3) NOT NULL,
    ATK_ESP INT(3) NOT NULL,
    DEF_ESP INT(3) NOT NULL,

    CONSTRAINT pokemon_id_fk FOREIGN KEY (pokemon_id) REFERENCES pokemons (id)
);