import {forecast24h} from "../services/forecast24h.js";
import {createElement} from "../utils/common.js";
import {forecast5days} from "../services/forecast5days.js";
import {weatherIcons} from "../services/weatherIcons.js";

export class SliderComponent {
    #sliderBlock
    #sliderContent
    #rightButtonBlock
    #leftButtonBlock

    init() {
        this.#sliderBlock = document.querySelector('.weather-app__slider')

        if (!this.#sliderBlock) {
            const mainBlock = document.querySelector('.weather-app__main')
            this.#sliderBlock = createElement("section", "weather-app__slider")
            mainBlock.appendChild(this.#sliderBlock)
        }

        return this
    }

    render() {
        this.#sliderBlock.innerHTML = ''
        let headerSlider = this.renderSliderHeader()
        let sliderContent = this.renderContentSlider(forecast24h)
        this.#sliderBlock.append(headerSlider, sliderContent)
    }

    renderSliderHeader() {
        let block = createElement('div', 'weather-app__slider-header')
        let titleSlider = createElement('h3', 'weather-app__slider-title', "Прогноз:")

        let tabsBlock = createElement('div', 'weather-app__slider-tabs')
        let tabButton1 = createElement('button', 'weather-app__slider-tab weather-app__slider-tab--active', "на 24 часа")
        let tabButton2 = createElement('button', 'weather-app__slider-tab', "на 5 дней")

        tabButton1.addEventListener('click', () => this.#handleTabClick(tabButton1, tabButton2, forecast24h, true))

        tabButton2.addEventListener('click', () => this.#handleTabClick(tabButton2, tabButton1, forecast5days, false))

        tabsBlock.append(tabButton1, tabButton2)
        block.append(titleSlider, tabsBlock)

        return block
    }

    #handleTabClick(activeTab, inactiveTab, forecastData, is24h = true) {
        if (inactiveTab.classList.contains('weather-app__slider-tab--active')) {
            inactiveTab.classList.remove('weather-app__slider-tab--active');
            activeTab.classList.add('weather-app__slider-tab--active');
            this.#slidersRender(forecastData, is24h);
            this.#updateButtonStates()
        }
    }

    renderContentSlider(arr) {
        let block = createElement('div', 'weather-app__slider-container')

        this.#rightButtonBlock = createElement('div', 'weather-app__slider-button-block weather-app__slider-button-block--right')
        let rightButton = createElement('button', 'weather-app__slider-button weather-app__slider-button--right')
        this.#rightButtonBlock.append(rightButton)

        this.#leftButtonBlock = createElement('div', 'weather-app__slider-button-block weather-app__slider-button-block--left')
        let leftButton = createElement('button', 'weather-app__slider-button weather-app__slider-button--left')
        this.#leftButtonBlock.append(leftButton)

        this.#leftButtonBlock.addEventListener('click', () => this.#scroll(1))
        this.#rightButtonBlock.addEventListener('click', () => this.#scroll(-1))

        this.#sliderContent = createElement('div', 'weather-forecast__slider-content')
        this.#sliderContent.addEventListener('scroll', () => this.#updateButtonStates());

        this.#slidersRender(arr)

        block.append(this.#rightButtonBlock, this.#sliderContent, this.#leftButtonBlock)

        return block
    }

    #scroll(direction) {
        const items = this.#sliderContent.children;
        if (items.length === 0) return;

        const firstItem = items[0];
        const itemWidth = firstItem.offsetWidth;
        const gap = 16;

        const scrollAmount = (itemWidth + gap) * direction;
        const currentScroll = this.#sliderContent.scrollLeft;

        this.#sliderContent.scrollTo({
            left: currentScroll + scrollAmount,
            behavior: 'smooth'
        });

    }

    #slidersRender(arr, is24h = true) {
        this.#sliderContent.innerHTML = ''
        Object.entries(arr).forEach(([key, item]) => {
            let slider = is24h ? this.#createSliderForecast24Hour(item) : this.#createSliderForecast5Days(item)
            this.#sliderContent.append(slider)
        })
    }

    #createSliderForecast24Hour(item) {
        const container = createElement("div", "weather-forecast__slide");

        const header = this.#createSlideHeader(item.time)

        const imgEl = createElement('img', 'weather-forecast__condition-img  weather-forecast__slider-condition-img',
            null, {src: this.getPathImg(item), width: 32, height: 32, alt: item.statusRu})

        const temp = createElement("span", "weather-forecast__temp", `${item.temp}°`);

        container.append(header, imgEl, temp);
        return container;
    }

    #createSliderForecast5Days(item) {
        const container = createElement("div", "weather-forecast__slide weather-forecast__slide--5day");

        const header = this.#createSlideHeader(item.day)

        const temps = createElement("div", "weather-forecast__temperatures");
        const sepFrom = createElement("span", "weather-forecast__temp-separator", "от");
        const tMin = createElement("span", "weather-forecast__temp weather-forecast__temp--min", `${item.tempMin}°`);
        const sepBefore = createElement("span", "weather-forecast__temp-separator", "до");
        const tMax = createElement("span", "weather-forecast__temp weather-forecast__temp--max", `${item.tempMax}°`);

        temps.append(sepFrom, tMin, sepBefore, tMax);

        const imgEl = createElement('img', 'weather-forecast__slider-condition-img', null,
            {src: this.getPathImg(item), width: 32, height: 32, alt: item.statusRu})

        container.append(header, imgEl, temps);

        return container;
    }

    #createSlideHeader(item) {
        const header = createElement("div", "weather-forecast__slide-header");
        const dateEl = createElement("span", "weather-forecast__date", item);

        header.append(dateEl);
        return header;
    }

    getPathImg(item) {
        return `src/assets/images/content/weatherIcons/${weatherIcons[item.status]?.day}`
    }

    #updateButtonStates() {
        const content = this.#sliderContent;

        const hasOverflow = content.scrollWidth > content.clientWidth;
        const atStart = content.scrollLeft <= 0;
        const atEnd = content.scrollLeft + content.clientWidth >= content.scrollWidth - 1;

        if (!hasOverflow) {
            this.#disableButton(this.#leftButtonBlock);
            this.#disableButton(this.#rightButtonBlock);
            return;
        }

        atEnd ? this.#disableButton(this.#leftButtonBlock) : this.#enableButton(this.#leftButtonBlock);
        atStart ? this.#disableButton(this.#rightButtonBlock) : this.#enableButton(this.#rightButtonBlock);
    }


    #disableButton(block) {
        block.classList.add("weather-app__slider-button-block--disabled");
    }

    #enableButton(block) {
        block.classList.remove("weather-app__slider-button-block--disabled");
    }
}