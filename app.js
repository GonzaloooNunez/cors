const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(cors());

app.get(`/characters`, async (req, res) => {
  try {
    let allCharacters = [];
    let nextPage = `https://rickandmortyapi.com/api/character`;

    while (nextPage) {
      const response = await axios.get(nextPage);
      const characters = response.data.results.map((character) => ({
        nombre: character.name,
        status: character.status,
        especie: character.species,
        genero: character.gender,
        origen: character.origin.name,
        imagen: character.image,
      }));
      allCharacters.push(...characters);
      nextPage = response.data.info.next;
    }

    res.json(allCharacters);
  } catch (error) {
    res.status(404).json({ error: "No se pudieron obtener los personajes" });
  }
});

app.get(`/characters/:name`, async (req, res) => {
  try {
    const characterName = req.params.name.toLowerCase();
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${characterName}`
    );
    const character = response.data.results[0];
    if (!character) throw new Error("Personaje no encontrado");
    const characterInfo = {
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      origin: character.origin.name,
      image: character.image,
    };
    res.json(characterInfo);
  } catch (error) {
    res.status(404).json({ error: "No se pudo obtener el personaje" });
  }
});

app.listen(3000, () => {
  console.log("Express está escuchando en el puerto http://localhost:3000");
});
