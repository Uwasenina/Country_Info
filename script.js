const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

async function fetchCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  return data;
}
async function fetchCountries2(searchTerm) {
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
      const countryFlag = country.flags.png;
      const continent = country.region;
      const population = country.population.toLocaleString();
      const area = country.area.toLocaleString();
      const languages = Object.values(country.languages).join(', ');
  
      countryDiv.innerHTML = `
        <h2>${countryName}</h2>
        <img src="${countryFlag}" alt="${countryName} Flag" class="flag">
      `;
  
      countryDiv.addEventListener('click', () => {
        openModal(countryName, continent, population, area, languages);
      });
  
      countriesList.appendChild(countryDiv);
    });
  }
  
  // Function to open the modal with country information
  function openModal(countryName, continent, population, area, languages) {
    const modal = document.getElementById('modal');
    const modalCountryName = document.getElementById('modalCountryName');
    const modalContinent = document.getElementById('modalContinent');
    const modalPopulation = document.getElementById('modalPopulation');
    const modalArea = document.getElementById('modalArea');
    const modalLanguages = document.getElementById('modalLanguages');
  
    modalCountryName.textContent = countryName;
    modalContinent.textContent = `Continent: ${continent}`;
    modalPopulation.textContent = `Population: ${population}`;
    modalArea.textContent = `Area: ${area} km²`;
    modalLanguages.textContent = `Languages: ${languages}`;
  
    modal.style.display = 'block';
  
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  
    window.addEventListener('click', event => {
      if (event.target === modal) {
        modal.style.display = 'flex';
      }
    });
  }
  
  // ... (remaining code)
  

function displayCountry(country) {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country-card');
  
    const countryName = country.name.common;
    const countryFlag = country.flags.png;
  
    countryDiv.innerHTML = `
      <h2>${countryName}</h2>
      <img src="${countryFlag}" alt="${countryName} Flag" class="flag">
    `;
  
    countryDiv.addEventListener('click', () => {
      // Handle click event here (e.g., display more information)
      openModal(countryName, continent, population, area, languages);
      alert(`Clicked on ${countryName}`);
    });
  
    countriesList.innerHTML = '';
    countriesList.appendChild(countryDiv)
  }


  function searchCountry(searchTerm) {
    const matchingCountries = [];
  
    fetchCountries2(searchTerm)
      .then(data => {
        data.forEach(country => {
          const countryName = country.name.common;
          if (countryName.toLowerCase().includes(searchTerm.toLowerCase())) {
            matchingCountries.push(country);
          }
        });
  
        if (matchingCountries.length > 0) {
          displayCountries(matchingCountries);
        } else {
          countriesList.innerHTML = '<p>No results found.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }
  
  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm.length >= 3) {
      searchCountry(searchTerm);
    }
  });


async function initialize() {
  const countries = await fetchCountries();
  displayCountries(countries);
}

initialize();
