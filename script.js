const searchInput = document.getElementById('searchInput');
const countriesList = document.getElementById('countriesList');

async function fetchCountries(searchTerm) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
  const data = await response.json();
  return data;
}
function displayCountries(countries) {
  countriesList.innerHTML = '';

  countries.forEach(country => {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country-card');

    const countryName = country.name.common;
    const countryCapital = country.capital;
    const countryPopulation = country.population.toLocaleString();

    countryDiv.innerHTML = `
      <h2>${countryName}</h2>
      <p>Capital: ${countryCapital}</p>
      <p>Population: ${countryPopulation}</p>
    `;

    countriesList.appendChild(countryDiv);
  });
}

searchInput.addEventListener('input', async () => {
  const searchTerm = searchInput.value;
  if (searchTerm.length >= 3) {
    const countries = await fetchCountries(searchTerm);
    displayCountries(countries);
  }
});

function displayCountries(countries) {
    countriesList.innerHTML = '';
  
    countries.forEach(country => {
      const countryDiv = document.createElement('div');
      countryDiv.classList.add('country-card');
  
      const countryName = country.name.common;
      const countryCapital = country.capital;
      const countryPopulation = country.population.toLocaleString();
      const countryFlag = country.flags.png;
  
      countryDiv.innerHTML = `
        <h2>${countryName}</h2>
        <img src="${countryFlag}" alt="${countryName} Flag" class="flag">
        <p>Capital: ${countryCapital}</p>
        <p>Population: ${countryPopulation}</p>
      `;
  
      countriesList.appendChild(countryDiv);
    });
  }  
