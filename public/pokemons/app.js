'use strict';

const pokemonsContainer = document.querySelector('#pokemons-container');
const barSearch = document.querySelector('#bar-search');

barSearch.addEventListener('keyup', () => {
    let characters = barSearch.value;
    if (characters === '') loadContent();
    else printPokemons(`/getPokemonsByChars/${characters}`);
});

async function pokemonsData (url) {
    let pokemons = await fetch(url);
    pokemons = await pokemons.json();
    return pokemons;
}

async function printPokemons (url) {
    let pokemons = await pokemonsData(url);
    let html = '';

    for (const pokemon of pokemons) {
        let htmlCode = `
        <div class="w3-container pokemon-favorite" title="${pokemon['Name']}" data-id="${pokemon['id']}" style="cursor: pointer; border-bottom: 1px solid #ccc; position: relative;">
            <div style="width: 100px; height: 100%; position: relative; left: 0; display: inline-block;">
                <img src="../images/pokemons/${pokemon['Photo']}" alt="Foto de algun pokemon" class="w3-image">
            </div>
            <div style="position: relative; bottom: 10px; display: inline-block; width: 50%; height: 100%; text-align: start;">
                <h3 style="margin-left: 5px;">${pokemon['Name']}</h3>
                <h6 style="margin-left: 5px; color: #666;">#${pokemon['id']}</h6>
            </div>
            <div id="types-container" style="position: absolute; right: 0; bottom: 8px; display: inline-block; width: 30%; min-width: 200px; height: 25px; text-align: center;">`;
        let closes = `</div></div>`;
        let typeshtml = '';
        
        for (const type of pokemon['Types']) {
            let span = `<span class="${type}">${type}</span>`;
            typeshtml += span;
        }

        htmlCode += typeshtml;
        htmlCode += closes;
        html += htmlCode;
    }
    pokemonsContainer.innerHTML = html;

    const pokemonsFavorites = document.querySelectorAll('.pokemon-favorite');
    pokemonsFavorites.forEach(pokemon => {
        pokemon.addEventListener('click', function () {
            const id = this.dataset.id;
            window.location.assign(`/pokemon/${id}`);
        });
    });
}

async function loadContent () {
    printPokemons('/getPokemons');
}

loadContent();