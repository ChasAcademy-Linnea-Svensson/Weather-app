const searchBtn = document.querySelector('.search-btn'),
      addBtn = document.querySelector('.add-btn'),
      input = document.querySelector('#city-input'),
      cardContainer = document.querySelector('.card-container'),
      key = 'f31eace19947611ecaf5bd6090267639';

class WeatherCard {
  constructor(city){
    this.city = city;
  }

  static createCard(name, country, temp, weather, desc) {
    let icon = '';
    switch(weather){
      case 'Clouds': 
        icon = '<i class="fa-solid fa-cloud"></i>';
        break;
      case 'Clear': 
        icon = '<i class="fa-solid fa-sun"></i>';
        break;
      case 'Snow': 
        icon = '<i class="fa-solid fa-snowflake"></i>';
        break;
      case 'Fog': 
        icon = '<i class="fa-solid fa-smog"></i>';
        break;
      case 'Rain': 
        icon = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
        break;
    }

    document.body.style.background = `url('img/${weather}.jpg') no-repeat center center/cover`;

    const card = `
    <div class="card">
      <div class="city-name">${name} [${country}]</div>
      <div class="city-temp">${temp}°C</div>
      <div class="city-icon">${icon}</div>
      <div class="city-description">${desc}</div>
    </div>
    `;

    return card;
  }

  static printCard(card) {
    cardContainer.innerHTML = card;
  }

  static addCard(card) {
    cardContainer.innerHTML += card;
  }

  async fetchApi() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${key}&units=metric`);
    const data = response.json();
    return data;
  }
}

searchBtn.addEventListener('click', () => {
  const city = input.value,
        weatherCard = new WeatherCard(city);

  weatherCard.fetchApi().then((json) => {
    WeatherCard.printCard(WeatherCard.createCard(json.name, json.sys.country,Math.ceil(json.main.temp), json.weather[0].main, json.weather[0].description));
  })

  input.value = '';
})

addBtn.addEventListener('click', () => {
  const city = input.value,
        weatherCard = new WeatherCard(city);

  weatherCard.fetchApi().then((json) => {
    WeatherCard.addCard(WeatherCard.createCard(json.name, json.sys.country,Math.ceil(json.main.temp), json.weather[0].main, json.weather[0].description));
  })

  input.value = '';
})

