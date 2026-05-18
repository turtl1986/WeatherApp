import {createElement} from "../utils/common.js";
import DateTimeUtils from "../utils/dateTimeUtils.js";

export default class CityCard {

    #cityCardBlock;
    #weatherIcons;

    init(cityCardBlock,weatherIcons) {
        this.#cityCardBlock=cityCardBlock
        this.#weatherIcons = weatherIcons
        return this
    }

    render(cityData) {
        this.#cityCardBlock.innerHTML = ''

        const cityLocalDateTime = DateTimeUtils.getCityLocalDateTime(cityData)
        const cityEl = createElement('h2', 'weather-app__city', cityData.cityRu)
        const dateEl = this.#createDateTimeBlock(cityLocalDateTime)
        const tempEl = createElement('p', 'weather-app__temperature', `${cityData.temperature}°`)
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
        const dateEl = createElement('p', 'weather-app__datetime')

        const dateTimeEl = createElement('time', 'weather-app__date', cityLocalDateTime.date, { datetime: cityLocalDateTime.date })
        const timeEl = createElement('time', 'weather-app__time', cityLocalDateTime.time, { datetime: cityLocalDateTime.time })

        dateEl.append(dateTimeEl, timeEl)
        return dateEl
    }

    getPathImg(cityData, time) {
        let period = DateTimeUtils.getDayPeriod(cityData,time)
        return `src/assets/images/content/weatherIcons/${this.#weatherIcons[cityData.status]?.[period]}`
    }

}