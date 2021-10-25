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
        <div class="w3-container poke-fav" title="${pokemon['Name']}" data-id="${pokemon['id']}">
            <div class="poke-fav-photo">
                <img src="../images/pokemons/${pokemon['Photo']}" alt="Foto de algun pokemon" class="w3-image">
            </div>
            <div class="poke-fav-name-id">
                <h3 class="poke-name-id">${pokemon['Name']}</h3>
                <h6 class="poke-name-id">#${pokemon['id']}</h6>
            </div>
            <div id="types-container">`;
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

    const pokemonsFavorites = document.querySelectorAll('.poke-fav');
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