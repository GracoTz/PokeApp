'use strict';

const btnRandom = document.querySelector('#btn-random');
const pokeName = document.querySelector('#name');
const pokeId = document.querySelector('#id');
const pokeImg = document.querySelector('#img');

const getBasicInfo = async () => {
	let res = await fetch('/getAmount');
	res = await res.json();
    let randomId = Math.floor(Math.random() * res['Amount'] + 1);
    let pokemon = await fetch(`/getRandom/${randomId}`);
    pokemon = await pokemon.json();
    pokeId.textContent = "#".concat(pokemon['id']);
    pokeName.innerHTML = pokemon['Name'];
    pokeImg.src = `../images/pokemons/${pokemon['Photo']}`;
}

btnRandom.addEventListener('click', () => {
    getBasicInfo();
});