class ForecastCards {

    #forecastCardsBlock

    init() {
        this.#forecastCardsBlock = document.querySelector('.weather-app__forecast')

        if (!this.#forecastCardsBlock) {
            const weatherBlock = document.querySelector('.weather-app__block')
            this.#forecastCardsBlock = `<div class="weather-app__forecast"></div>`
            weatherBlock.insertAdjacentHTML('beforeend', this.#forecastCardsBlock)
        }

        return this
    }

    render(weatherData) {
        this.#forecastCardsBlock.replaceChildren()
        for (const [key, value] of Object.entries(weatherData)) {
            if (key !== "id") {
                this.#forecastCardsBlock.insertAdjacentHTML('beforeend',
                    `<div class="forecast-card">
                <h3 class="forecast-card__label">${value.label}</h3>
                <div class="forecast-card__icon ${key === 'wind' ? value.code : key} "></div>
                <div class="forecast-card__value">${value.value} ${value?.unit ? ` ${value.unit}` : ''}</div>
                 ${this.getDetailsMarkup(key, value)}
            </div> `)
            }
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
        <div class="current-weather-details__parameter-img ${this.getHumidityBar(value.value)}"></div>
        <div class="current-weather-details__parameter--percentage-block">
            <p class="current-weather-details__parameter-text">0%</p>
            <p class="current-weather-details__parameter-text">100%</p>
        </div>
      </div>`

            case 'pressure':
                return `
      <div class="current-weather-details">
        <div class="current-weather-details__parameter-img ${this.getPressureClass(value.value)}"></div>
        <div class="current-weather-details__parameter-text">${value?.status}</div>
      </div>`

            case 'visibility':
                return `
      <div class="current-weather-details">
        <div class="current-weather-details__parameter-img ${this.getVisibilityBar(value.value)}"></div>
        <div class="current-weather-details__parameter-text">${value?.status}</div>
      </div>`

            default:
                return `
    <div class="current-weather-details">
      <div class="current-weather-details__parameter current-weather-details__parameter_type_value"></div>
    </div>`
        }
    }

    getHumidityBar(value) {
        if (value === 0) return "weather-details__value--percentage-0";
        if (value > 0 && value <= 25)  return "weather-details__value--percentage-25";
        if (value > 25 && value <= 50)  return "weather-details__value--percentage-50";
        if (value > 50 && value <= 75) return "weather-details__value--percentage-75";
        return "weather-details__value--percentage-100";
    }


    getVisibilityBar(value) {
        if (value < 15) return "weather-details__value--low"
        if (value >= 15 && value < 30) return "weather-details__value--normal"
        return "weather-details__value--high"
    }

    getPressureClass(value) {
        if (value < 750) return "weather-details__value--low"
        if (value > 760) return "weather-details__value--high"
        return "weather-details__value--normal"
    }
}