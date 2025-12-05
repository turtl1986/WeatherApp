import {createElement} from "../utils/common.js";
import {DateTimeUtils} from "../utils/dateTimeUtils.js";
import {weatherIcons} from "../services/weatherIcons.js";

export class CityCard {

    #cityCardBlock;

    init() {
        this.#cityCardBlock = document.querySelector('.weather-app__current')

        if (!this.#cityCardBlock) {
            const weatherBlock = document.querySelector('.weather-app__block')
            this.#cityCardBlock = createElement("div", "weather-app__current")
            weatherBlock.appendChild(this.#cityCardBlock)
        }

        return this
    }

    render(cityData) {
        this.#cityCardBlock.innerHTML = ''

        const cityLocalDateTime = DateTimeUtils.getCityLocalDateTime(cityData)
        const cityEl = createElement('h2', 'weather-app__city', cityData.cityRu)
        const dateEl = this.#createDateTimeBlock(cityLocalDateTime)
        const tempEl = createElement('div', 'weather-app__temperature', `${cityData.temperature}°`)
        const conditionEl = this.#createWeatherCondition(cityData, cityLocalDateTime)
        const feelsEl = createElement('p', 'weather-app__feels', `Ощущается как ${cityData.feelsLike}°`)

        this.#cityCardBlock.append(cityEl, dateEl, tempEl, conditionEl, feelsEl)
    }

    #createWeatherCondition(cityData, cityLocalDateTime) {
        const conditionEl = createElement('div', 'weather-app__condition');

        const imgEl = createElement('img', 'weather-app__condition-img', null,
            {src: this.getPathImg(cityData, cityLocalDateTime.time), width: 24, height: 24, alt: cityData.statusRu})

        const conditionTextEl = createElement('p', 'weather-app__condition-text', cityData.statusRu);

        conditionEl.append(imgEl, conditionTextEl);
        return conditionEl;
    }

    #createDateTimeBlock(cityLocalDateTime) {
        const dateEl = createElement('p', 'weather-app__date')

        const dateTimeEl = createElement('time', null, cityLocalDateTime.date, { datetime: cityLocalDateTime.date })
        const timeEl = createElement('time', null, cityLocalDateTime.time, { datetime: cityLocalDateTime.time })

        dateEl.append(dateTimeEl, timeEl)
        return dateEl
    }

    getPathImg(cityData, time) {
        let period = DateTimeUtils.getDayPeriod(cityData,time)
        return `src/assets/images/content/weatherIcons/${weatherIcons[cityData.status]?.[period]}`
    }

}