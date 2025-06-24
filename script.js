const container = document.getElementById('countries-container');
const searchInput = document.getElementById('search');
let countries = [];

async function fetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/independent?status=true');
    const data = await response.json();
    countries = data;
    renderCountries(countries);
  } catch (error) {
    console.error('Erro ao buscar países:', error);
    container.innerHTML = '<p>Erro ao carregar países.</p>';
  }
}

function renderCountries(countriesList) {
  container.innerHTML = '';
  countriesList.forEach(country => {
    const name = country.name.common;
    const population = country.population.toLocaleString();
    const region = country.region;
    const flag = country.flags.png;

    const card = document.createElement('div');
    card.className = 'country';
    card.innerHTML = `
      <img src="${flag}" alt="Bandeira de ${name}" />
      <h3>${name}</h3>
      <p><strong>Continente:</strong> ${region}</p>
      <p><strong>População:</strong> ${population}</p>
    `;
    container.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(value)
  );
  renderCountries(filtered);
});

// Inicializa
fetchCountries();
