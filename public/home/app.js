'use strict';

const btnRandom = document.querySelector('#btn-random');
const btnPokeInfo = document.querySelector('#btn-see');
let pokemonSelected = "";

const getBasicInfo = async () => {
    const name = document.querySelector('#name');
    const id = document.querySelector('#id');
    const img = document.querySelector('#img');
    let randomId = Math.floor(Math.random()*50+1);
    pokemonSelected = randomId;
    let pokemon = await fetch(`/getRandom/${randomId}`);
    pokemon = await pokemon.json();
    id.textContent = "#".concat(pokemon.id);
    name.innerHTML = pokemon.Name;
    img.src = `../images/pokemons/${pokemon.Photo}`;
}

btnRandom.addEventListener('click', () => {
    getBasicInfo();
});

btnPokeInfo.addEventListener('click', () => {
    pokemonSelected = pokemonSelected.toString().padStart(3, '0');
    console.log(pokemonSelected);
    window.location.assign(`/pokemon/${pokemonSelected}`);
});