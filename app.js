const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonClear = document.getElementById('clearPokemon');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , insertPokemon);
buttonPokemon.addEventListener('touchstart' , insertPokemon); //*For mobile devices

buttonClear.addEventListener('click' , deletePokemons);
buttonClear.addEventListener('touchstart' , deletePokemons); //* For mobile devices

async function insertPokemon() {
  try {
    const res = await fetch(`${baseUrl}${pokemon.value.toLocaleLowerCase()}`)
    const pokemonDataJSON = await res.json()

    const allItems = [];
    const result = []; //*Guardaremos la respuesta en el array

    for (let pokemonInfo in pokemonDataJSON) { //*Convertimos el objeto JSON a array
      result.push([pokemonInfo , pokemonDataJSON[pokemonInfo]]);
    }

    console.table(result); //! only for development

    //* Información de en frente

    //*Crear imagen
    const pokemonImage = document.createElement('img');
    pokemonImage.src = result[14][1].front_default; 

    //*Nombre de pokemon e ID
    const pokemonName = document.createElement('h2');
    pokemonName.innerText = `Nombre: ${result[10][1]} - ID: ${result[6][1]}`; 

    //*Tipo de pokemon
    const pokemonType = document.createElement('h2');
    pokemonType.innerText = `Tipo: ${result[16][1][0].type.name}`; 

    //* Pokemon HP
    const hp = document.createElement('p');
    hp.innerText = `HP: ${result[15][1][0].base_stat}`; 

    //* Ataque
    const attack = document.createElement('p');
    attack.innerText = `Ataque: ${result[15][1][1].base_stat}`; 
    attack.classList.add('pokemonStats');

    //* Defensa
    const defense = document.createElement('p');
    defense.innerText = `Defensa: ${result[15][1][2].base_stat}`; 
    defense.classList.add('pokemonStats');

    //* Ataque especial
    const specialAttack = document.createElement('p');
    specialAttack.innerText = `Ataque Especial: ${result[15][1][3].base_stat}`; 
    specialAttack.classList.add('pokemonStats');

    //* Defensa Especial
    const specialDefense = document.createElement('p');
    specialDefense.innerText = `Defensa Especial: ${result[15][1][4].base_stat}`; 
    specialDefense.classList.add('pokemonStats');

    //* Velocidad
    const speed = document.createElement('p');
    speed.innerText = `Velocidad: ${result[15][1][5].base_stat}`; //* 
    speed.classList.add('pokemonStats');

    //* Contenerdor de stats
    const stats = document.createElement('div');
    stats.append(hp, attack, defense, specialAttack, specialDefense, speed);
    stats.classList.add('pokemonStatsContainer');

    //*Crear contenedor
    const container = document.createElement('div');
    container.append(pokemonImage , pokemonName ,pokemonType, stats);
    container.classList.add('container');

    allItems.push(container);

    appNode.append(...allItems);

  } catch (error) {
    alert("That pokemon isn't available. Try againt with another one!");
  }
}

function deletePokemons() {
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
}
