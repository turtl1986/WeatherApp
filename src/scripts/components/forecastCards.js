import {createElement} from "../utils/common.js";
import {DateTimeUtils} from "../utils/dateTimeUtils.js";

export class ForecastCards {

    #forecastCardsBlock

    init() {
        this.#forecastCardsBlock = document.querySelector('.weather-app__forecast')

        if (!this.#forecastCardsBlock) {
            const weatherBlock = document.querySelector('.weather-app__block')
            this.#forecastCardsBlock = createElement("div", "weather-app__forecast")
            weatherBlock.appendChild(this.#forecastCardsBlock)
        }

        return this
    }

    render(weatherData,cityData) {
        this.#forecastCardsBlock.innerHTML = ''

        Object.entries(weatherData)
            .filter(([key, val]) => key !== "id")
            .forEach(([key, value]) => this.#createForecastCard(key, value, cityData))

        return this
    }

    #createForecastCard(key, value, cityData){
        const cardEl = createElement('div', 'forecast-card')
        const labelEl = createElement('h3', 'forecast-card__label', value.label)
        const iconClass = key === 'wind' ? value.code : key
        const iconEl = createElement('div', `forecast-card__icon ${iconClass}`)
        const valueText = value?.unit ? `${value.value} ${value.unit}` : `${value.value}`
        const valueEl = createElement('div', 'forecast-card__value', valueText)
        const detailsEl = this.getDetailsMarkup(key, value, cityData)
        cardEl.append(labelEl, iconEl, valueEl, detailsEl)
        this.#forecastCardsBlock.append(cardEl)
    }

    getDetailsMarkup(key, value, cityData) {
        const detailsEl = createElement('div', 'current-weather-details');

        if (key === 'sunrise' || key === 'sunset' || key === 'wind') {
            const paramEl = this.#createTextDetail('current-weather-details__parameter current-weather-details__parameter-text',
                this.#getTextComponent(key, value, cityData))
            detailsEl.append(paramEl)
        } else if (key === 'humidity') {
            const barEl = createElement('div', `current-weather-details__parameter-img ${this.getHumidityBar(value.value)}`)
            const percentBlockEl = this.#createPercentageBlock()
            detailsEl.append(barEl, percentBlockEl)
        } else if (key === 'pressure' || key === 'visibility') {
            const barEl = createElement('div', `current-weather-details__parameter-img ${this.#getClassComponent(key,value)}`)
            const textEl = this.#createTextDetail('current-weather-details__parameter-text', value?.status)
            detailsEl.append(barEl, textEl)
        }

        return detailsEl
    }

    #createTextDetail(cl,text) {
        return createElement('div', 'current-weather-details__parameter current-weather-details__parameter-text', text)
    }

    #createPercentageBlock() {
        const percentBlock = createElement('div', 'current-weather-details__parameter--percentage-block')
        percentBlock.append(
            createElement('p', 'current-weather-details__parameter-text', '0%'),
            createElement('p', 'current-weather-details__parameter-text', '100%')
        )
        return percentBlock;
    }

    getHumidityBar(value) {
        if (value === 0) return "weather-details__value--percentage-0"
        if (value > 0 && value <= 25)  return "weather-details__value--percentage-25"
        if (value > 25 && value <= 50)  return "weather-details__value--percentage-50"
        if (value > 50 && value <= 75) return "weather-details__value--percentage-75"
        return "weather-details__value--percentage-100"
    }

    #getClassComponent(key, value){
        return key === 'visibility'
            ? this.getVisibilityBar(value.value)
            : this.getPressureClass(value.value);
    }


    #getTextComponent(key, value, cityData){
        if(key === 'sunset' || key === 'sunrise') return DateTimeUtils.getTimeData(value, cityData);
        if(key === 'wind') return value?.description;
        return '';
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