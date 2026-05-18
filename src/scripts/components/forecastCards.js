import {createElement} from "../utils/common.js";
import DateTimeUtils from "../utils/dateTimeUtils.js";
import ProgressBar from "../ui/progressBar.js";

export default class ForecastCards {

    #forecastCardsBlock

    init(forecastCardsBlock) {
        this.#forecastCardsBlock = forecastCardsBlock
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
        const valueText = value?.unit ? `${value.value} ${value.unit}` : `${value.value}`

        const cardEl = createElement('article', 'forecast-card')
        const labelEl = createElement('h3', 'forecast-card__label', value.label)
        const iconClass = key === 'wind' ? value.code : key
        const iconEl = createElement('div', `forecast-card__icon ${iconClass}`)
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
            const barEl = new ProgressBar().setValue(value.value).setValueProgressCallback(this.getHumidityBar).render()
            const percentBlockEl = this.#createPercentageBlock()
            detailsEl.append(barEl, percentBlockEl)
        } else if (key === 'pressure' || key === 'visibility') {
            const barEl = new ProgressBar().setIsLite(false).setValue(value.value).setValueProgressCallback(this.#getClassComponent()).render()
            const textEl = this.#createTextDetail('current-weather-details__parameter-text', value?.status)
            detailsEl.append(barEl, textEl)
        }

        return detailsEl
    }

    #createTextDetail(cl,text) {
        return createElement('div', 'current-weather-details__parameter current-weather-details__parameter-text', text)
    }

    #createPercentageBlock() {
        const percentBlock = createElement('div', 'current-weather-details__parameter--percentage-block', null, {'aria-hidden': true})
        percentBlock.append(
            createElement('p', 'current-weather-details__parameter-text', '0%'),
            createElement('p', 'current-weather-details__parameter-text', '100%')
        )
        return percentBlock;
    }

    getHumidityBar(value, element,block) {
        if (value === 0) {
            element.style.left = '0px';
        } else if (value <= 25) {
            element.style.left = '27px';
        } else if (value <= 50) {
            element.style.left = '52px';
        } else if (value <= 75) {
            element.style.left = '75px';
        } else {
            element.style.left = '116px';
        }
    }

    #getClassComponent(key){
        return key === 'visibility'
            ? this.getVisibilityBar
            : this.getPressureClass
    }


    #getTextComponent(key, value, cityData){
        if(key === 'sunset' || key === 'sunrise') return DateTimeUtils.getTimeData(value, cityData);
        if(key === 'wind') return value?.description;
        return '';
    }

    getVisibilityBar(value, element,block) {
        if (value< 15) {
            block.style.setProperty("--x", "29px")
            element.style.left = '25px';
        } else if (value >= 15 && value < 30) {
            block.style.setProperty("--x", "63px")
            element.style.left = '59px';
        }else {
            block.style.setProperty("--x", "96px")
            element.style.left = '92px';
        }
    }

    getPressureClass(value, element,block) {
        if (value< 750) {
            block.style.setProperty("--x", "29px")
            element.style.left = '25px';
        } else if (value >760) {
            block.style.setProperty("--x", "63px")
            element.style.left = '59px';
        }else {
            block.style.setProperty("--x", "96px")
            element.style.left = '92px';
        }
    }
}