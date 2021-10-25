'use strict';

const goBack = document.querySelector('#go-back');
// Elemento estrella de favorito y la foto
const btnFavorite = document.querySelector('#btn-favorite');
const starFavorite = document.querySelector('#star-favorite');
// Elementos html a renderizar
const pokemonName = document.querySelector('#pokemon-name');
const pokemonID = document.querySelector('#pokemon-id');
const pokemonPhoto = document.querySelector('#pokemon-photo');
// Elementos de la info basica
const pokemonSpecie = document.querySelector('#pokemon-species');
const pokemonType = document.querySelector('#pokemon-type');
const pokemonHeight = document.querySelector('#pokemon-height');
const pokemonWeight = document.querySelector('#pokemon-weight');
const pokemonAbilities = document.querySelector('#pokemon-abilities');
// Elemento de descripcion
const pokemonDescription = document.querySelector('#pokemon-description');
// Elementos de las estadisticas
const pokemonHP = document.querySelector('#pokemon-hp');
const pokemonATK = document.querySelector('#pokemon-atk');
const pokemonDEF = document.querySelector('#pokemon-def');
const pokemonATKS = document.querySelector('#pokemon-atkS');
const pokemonDEFS = document.querySelector('#pokemon-defS');
const pokemonSPEED = document.querySelector('#pokemon-speed');
// Numeros de las estadisticas
const pokemonHPData = document.querySelector('#pokemon-hp-data');
const pokemonATKData = document.querySelector('#pokemon-atk-data');
const pokemonDEFData = document.querySelector('#pokemon-def-data');
const pokemonATKSData = document.querySelector('#pokemon-atkS-data');
const pokemonDEFSData = document.querySelector('#pokemon-defS-data');
const pokemonSPEEDData = document.querySelector('#pokemon-speed-data');
// Elementos de las Evoluciones
const evolutionsContainer = document.querySelector('#space-container');

goBack.addEventListener('click', () => {
    history.back();
});

async function pokemonData () {
    let pokemon = await fetch('/getFullPokemon');
    pokemon = await pokemon.json();
    return pokemon;
}

async function printHeader () {
    // Pokemon data
    let pokemon = await pokemonData();

    // Elementos de entrada
    pokemonName.innerHTML = pokemon['Name'];
    pokemonID.innerHTML = `#${pokemon['id']}`;
    pokemonPhoto.src = `../images/pokemons/${pokemon['Photo']}`;
}

async function printBasicInfo () {
    // Pokemon data
    let pokemon = await pokemonData();

    // Informacion Basica
    pokemonSpecie.innerHTML = pokemon['Basic_Info']['Species'];
    pokemonType.innerHTML = pokemon['Types'];
    pokemonHeight.innerHTML = pokemon['Basic_Info']['Height'];
    pokemonWeight.innerHTML = pokemon['Basic_Info']['Weight'];
    pokemonAbilities.innerHTML = pokemon['Basic_Info']['Abilities'];

    // Descripcion del pokemon
    pokemonDescription.innerHTML = pokemon['Description'];
}

async function printStadistics () {
    // Pokemon data
    let pokemon = await pokemonData();

    // Styles de las barras de progreso
    pokemonHP.style.width = `${calcBarProgress(pokemon['Stadistics']['HP'])}%`;
    pokemonATK.style.width = `${calcBarProgress(pokemon['Stadistics']['ATK'])}%`;
    pokemonDEF.style.width = `${calcBarProgress(pokemon['Stadistics']['DEF'])}%`;
    pokemonATKS.style.width = `${calcBarProgress(pokemon['Stadistics']['ATK_SP'])}%`;
    pokemonDEFS.style.width = `${calcBarProgress(pokemon['Stadistics']['DEF_SP'])}%`;
    pokemonSPEED.style.width = `${calcBarProgress(pokemon['Stadistics']['SPEED'])}%`;

    // Seccion de Estadisticas del pokemon
    pokemonHPData.innerHTML = pokemon['Stadistics']['HP'];
    pokemonATKData.innerHTML = pokemon['Stadistics']['ATK'];
    pokemonDEFData.innerHTML = pokemon['Stadistics']['DEF'];
    pokemonATKSData.innerHTML = pokemon['Stadistics']['ATK_SP'];
    pokemonDEFSData.innerHTML = pokemon['Stadistics']['DEF_SP'];
    pokemonSPEEDData.innerHTML = pokemon['Stadistics']['SPEED'];
}

async function printEvolutions () {
    // Pokemon data
    let pokemon = await pokemonData();

    // Trabajar en mostrar las evoluciones
    const Evolution = pokemon['Evolutions'];
    const evolutionArray = Evolution['Evolutions'];
    const evolutionHowArray = Evolution['How_Progress'];
    const amountEvolutions = evolutionArray.length;

    if (Evolution['Have_Evolutions'] == 1) {
        let html = '';
        for (let i = 0; i < amountEvolutions; i++) {
            let htmlCode = `
        <div class="poke-ev" data-id="${evolutionArray[i]['id']}" title="${evolutionArray[i]['Name']}" class="w3-container" style="cursor: pointer; margin: auto; height: 100px; position: relative;">
            <div class="w3-container" style="width: 25%; height: 100%; margin-left: -20px; display: inline-block;">
                <img src="../images/pokemons/${evolutionArray[i]['Photo']}" class="w3-image" style="width: 100%; height: 100%;">
            </div>
            <div class="w3-container" style="width: 85%; text-align: center;">
                <span style="position: absolute; top: 10px; font-size: 20px;">${evolutionArray[i]['Name']}</span>
                <span style="position: absolute; bottom: 10px;">${evolutionHowArray[i]}</span>
            </div>
        </div>`;
            html += htmlCode;
        }

        // Agregar el html de arriba al contenerdor
        evolutionsContainer.innerHTML = html;

        // Agarrar a los pokemones evoluciones y darles el evento de si los tocan que los busque
        const pokemonsEv = document.querySelectorAll(".poke-ev");
        pokemonsEv.forEach(pokemon => {
            pokemon.addEventListener('click', function () {
                const id = this.dataset.id;
                window.location.assign(`/pokemon/${id}`);
            });
        });
    }
}

async function printStar () {
    // Pokemon data
    let pokemon = await pokemonData();

    if (pokemon['Favorite'] == 0) {
        starFavorite.src = "img/star_off.jpg";
        btnFavorite.setAttribute('title', 'Click for add to favorite');
    } else {
        starFavorite.src = "img/star_on.jpg";
        btnFavorite.setAttribute('title', 'Click for quit of favorite');
    }

    btnFavorite.addEventListener('click', () => {
        setFavorite(pokemon['id']);
    });
}

async function setFavorite (id) {
    let res = await fetch(`/set-favorite/${id}`);
    res = await res.json();
    if (res['ok']) {
        let isFavorite = await fetch(`/isFavorite/${id}`);
        isFavorite = await isFavorite.json();
        if (isFavorite['Favorite']) {
            starFavorite.src = "img/star_on.jpg";
            btnFavorite.setAttribute('title', 'Click for quit of favorite');
        } else {
            starFavorite.src = "img/star_off.jpg";
            btnFavorite.setAttribute('title', 'Click for add to favorite');
        }
    }
}

function calcBarProgress (p) {
    let res = (p / (200 * 0.8) * 100);
    return res.toPrecision(3);
}

async function loadPageContent () {
    printStar();
    printHeader();
    printBasicInfo();
    printStadistics();
    printEvolutions();
}

loadPageContent();