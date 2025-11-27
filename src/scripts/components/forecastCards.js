class ForecastCards {

    #forecastCardsBlock
    #weatherData

    constructor(weatherData) {
        this.#weatherData = weatherData
    }

    init() {
        this.#forecastCardsBlock = document.querySelector('.weather-app__forecast')

        if (!this.#forecastCardsBlock) {
            const weatherBlock = document.querySelector('.weather-app__block')
            this.#forecastCardsBlock = `<div class="weather-app__forecast"></div>`
            weatherBlock.insertAdjacentHTML('beforeend', this.#forecastCardsBlock)
        }

        return this
    }

    create() {
        for (const [key, value] of Object.entries(this.#weatherData)) {
            this.#forecastCardsBlock.insertAdjacentHTML('beforeend',
                `<div class="forecast-card">
                <h3 class="forecast-card__label">${value.label}</h3>
                <div class="forecast-card__icon ${key === 'wind' ? value.code : key} "></div>
                <div class="forecast-card__value">${value.value} ${value?.unit ? ` ${value.unit}` : ''}</div>
                 ${this.getDetailsMarkup(key, value)}
            </div> `);
        }

        return this
    }

    getDetailsMarkup(key, value) {
        switch (key) {
            case 'sunrise':
                return `
      <div class="current-weather-details">
        <div class="current-weather-details__parameter current-weather-details__parameter-text">Прошло: ${value?.since}</div>
      </div>`

            case 'sunset':
                return `
      <div class="current-weather-details">
        <div class="current-weather-details__parameter current-weather-details__parameter-text">Осталось: ${value?.remaining}</div>
      </div>`

            case 'wind':
                return `
      <div class="current-weather-details">
        <div class="current-weather-details__parameter current-weather-details__parameter-text">${value?.description}</div>
      </div>`

            case 'humidity':
                return `
      <div class="current-weather-details">
        <div class="current-weather-details__parameter-img weather-details__value--percentage-seventy-five"></div>
        <div class="current-weather-details__parameter--percentage-block">
            <p class="current-weather-details__parameter-text">0%</p>
            <p class="current-weather-details__parameter-text">100%</p>
        </div>
      </div>`

            case 'pressure':
                return `
      <div class="current-weather-details">
        <div class="current-weather-details__parameter-img weather-details__value--max"></div>
        <div class="current-weather-details__parameter-text">${value?.status}</div>
      </div>`

            case 'visibility':
                return `
      <div class="current-weather-details">
        <div class="current-weather-details__parameter-img weather-details__value--max"></div>
        <div class="current-weather-details__parameter-text">${value?.status}</div>
      </div>`

            default:
                return `
    <div class="current-weather-details">
      <div class="current-weather-details__parameter current-weather-details__parameter_type_value"></div>
    </div>`
        }
    }
}