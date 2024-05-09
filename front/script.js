async function searchCharacter() {
  const name = document.getElementById("buscador").value.toLowerCase();
  try {
    const response = await fetch(`http://localhost:3000/characters/${name}`);
    const data = await response.json();

    const characterInfo = `
            <h2>${data.name}</h2>
            <p><strong>Estatus:</strong> ${data.status}</p>
            <p><strong>Especie:</strong> ${data.species}</p>
            <p><strong>Genero:</strong> ${data.gender}</p>
            <p><strong>Origen:</strong> ${data.origin}</p>
            <img src="${data.image}" alt="${data.name}">
        `;
    document.getElementById("characterInfo").innerHTML = characterInfo;
  } catch (error) {
    document.getElementById("characterInfo").innerHTML =
      "<p>Character not found</p>";
  }
}
