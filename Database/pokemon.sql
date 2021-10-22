CREATE DATABASE pokemon;

USE pokemon;

CREATE TABLE pokemons (
	id VARCHAR(3) NOT NULL,
	Name VARCHAR(50) NOT NULL,
	Types VARCHAR(25) NOT NULL,
	Favorite BOOLEAN NOT NULL,
	Photo VARCHAR(25) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE descriptions (
	pokemon_id VARCHAR(3) NOT NULL PRIMARY KEY,
	Description TEXT NOT NULL,
	FOREIGN KEY (pokemon_id) REFERENCES pokemons (id)
);

CREATE TABLE stadistics (
	pokemon_id VARCHAR(3) NOT NULL PRIMARY KEY,
	HP INT(3) NOT NULL,
	ATK INT(3) NOT NULL,
	DEF INT(3) NOT NULL,
	ATK_SP INT(3) NOT NULL,
	DEF_SP INT(3) NOT NULL,
	SPEED INT(3) NOT NULL,
	FOREIGN KEY (pokemon_id) REFERENCES pokemons (id)
);

CREATE TABLE basic_info (
	pokemon_id VARCHAR(3) NOT NULL PRIMARY KEY,
	Species VARCHAR(50) NOT NULL,
	Height VARCHAR(15) NOT NULL,
	Weight VARCHAR(15) NOT NULL,
	Abilities VARCHAR(100) NOT NULL,
	FOREIGN KEY (pokemon_id) REFERENCES pokemons (id)
);

CREATE TABLE evolutions (
	pokemon_id VARCHAR(3) NOT NULL PRIMARY KEY,
	Have_Evolutions BOOLEAN NOT NULL,
	Evolutions VARCHAR(25),
	How_Progress VARCHAR(100),
	FOREIGN KEY (pokemon_id) REFERENCES pokemons (id)
);