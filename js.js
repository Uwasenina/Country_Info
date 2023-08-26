const countriesContainer = document.getElementById('countriesContainer');
const filterSpan = document.querySelector('.filter');
const regionsDiv = document.querySelector('.regions');
const body = document.body;
const header = document.querySelector('.header');
const searchCountry = document.querySelector('.search-country');
const filterRegion=document.querySelector(".filter");
const countrySelection=document.querySelector(".regions");

filterSpan.addEventListener('click', function() {
  if (regionsDiv.style.display === 'none') {
      regionsDiv.style.display = 'block';
  } else {
      regionsDiv.style.display = 'none';
  }
});


// Function to fetch countries from the API
async function fetchCountries() {
  try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching countries:', error);
  }
}

// Call the fetchCountries function and use the data to populate your webpage
async function populateCountries() {
  const countries = await fetchCountries();

}

// Call the populateCountries function to fetch and display the countries
populateCountries();

async function populateCountries() {
  const countries = await fetchCountries();
  const countriesContainer = document.querySelector('.countries-container');

  countries.forEach(country => {
      const countryCard = document.createElement('div');
      countryCard.classList.add('country-card');
      countryCard.innerHTML = `
          <img src="${country.flags.png}" alt="${country.name.common} Flag">
          <h2>${country.name.common}</h2>
          <p><span>Population:</span> ${country.population}</p>
          <p><span>Region:</span> ${country.region}</p>
          <p><span>Capital:</span> ${country.capital}</p>
          <p><span>Languages:</span> ${Object.values(country.languages).join(', ')}</p>
      `;

      countriesContainer.appendChild(countryCard);
  });
}

// search country by input

const searchInput = document.getElementById('search-input');
const searchTrigger = document.getElementById('search-trigger');

searchTrigger.addEventListener('click', function () {
    const searchValue = searchInput.value.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card');

    countryCards.forEach(card => {
        const countryName = card.querySelector('h2').textContent.toLowerCase();
        if (countryName.includes(searchValue)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

//filtering functionality
const regionFilter = document.querySelector('.regions');
regionFilter.addEventListener('click', function (event) {
  if (event.target.tagName === 'P') { 
      const selectedRegion = event.target.textContent.toLowerCase();
      const countryCards = document.querySelectorAll('.country-card');

      countryCards.forEach(card => {
          const countryRegion = card.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
          if (selectedRegion === 'all regions' || countryRegion.includes(selectedRegion)) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  }
})

















