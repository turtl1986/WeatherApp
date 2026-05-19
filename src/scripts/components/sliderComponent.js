import {createElement} from "../utils/common.js"

export default class SliderComponent {
    #sliderBlock
    #sliderContent
    #rightButtonBlock
    #leftButtonBlock
    #weatherIcons;
    #forecast24h;
    #forecast5days;

    init(sliderBlock,weatherIcons,forecast24h,forecast5days) {
        this.#sliderBlock = sliderBlock
        this.#weatherIcons = weatherIcons
        this.#forecast24h = forecast24h
        this.#forecast5days = forecast5days

        return this
    }

    render() {
        this.#sliderBlock.innerHTML = ''
        let headerSlider = this.renderSliderHeader()
        let sliderContent = this.renderContentSlider(this.#forecast24h)
        this.#sliderBlock.append(headerSlider, sliderContent)
        this.#updateButtonStates()
    }

    renderSliderHeader() {
        let block = createElement('div', 'weather-app__slider-header')
        let titleSlider = createElement('h3', 'weather-app__slider-title', "Прогноз:")
        let tabsBlock = createElement('div', 'weather-app__slider-tabs')

        let tabButton1 = createElement(
            'button',
            'weather-app__slider-tab weather-app__slider-tab--active',
            "на 24 часа"
        )

        let tabButton2 = createElement(
            'button',
            'weather-app__slider-tab',
            "на 5 дней"
        )

        tabButton1.addEventListener(
            'click',
            () => this.#handleTabClick(tabButton1, tabButton2, this.#forecast24h, true)
        )

        tabButton2.addEventListener(
            'click',
            () => this.#handleTabClick(tabButton2, tabButton1, this.#forecast5days, false)
        )

        tabsBlock.append(tabButton1, tabButton2)
        block.append(titleSlider, tabsBlock)
        return block
    }

    #handleTabClick(activeTab, inactiveTab, forecastData, is24h = true) {
        if (inactiveTab.classList.contains('weather-app__slider-tab--active')) {
            inactiveTab.classList.remove('weather-app__slider-tab--active')
            activeTab.classList.add('weather-app__slider-tab--active')
            this.#slidersRender(forecastData, is24h)
            this.#resetSlider()
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
        this.#slidersRender(arr)
        block.append(this.#rightButtonBlock, this.#sliderContent, this.#leftButtonBlock)
        this.#sliderContent.addEventListener('scroll', () => this.#updateButtonStates())
        return block
    }

    #scroll(direction) {
        const items = this.#sliderContent.children
        if (items.length === 0) return
        const firstItem = items[0]
        const itemWidth = firstItem.offsetWidth
        const gap = 17
        const scrollAmount = (itemWidth + gap) * direction
        const currentScroll = this.#sliderContent.scrollLeft
        this.#sliderContent.scrollTo({left: currentScroll + scrollAmount, behavior: 'smooth'})
    }

    #slidersRender(arr, is24h = true) {
        this.#sliderContent.innerHTML = ''
        Object.entries(arr).forEach(([key, item]) =>
            this.#sliderContent.append(this.#createSliderForecast(item,is24h)))
    }

    #createSliderForecast(item,is24h) {
        const container = createElement("div", "weather-forecast__slide")
        const dateEl = createElement("span", "weather-forecast__date", is24h ? item.time:item.day)
        const imgEl = createElement(
            'img',
            'weather-forecast__condition-img weather-forecast__slider-condition-img',
            null,
            {
                src: this.getPathImg(item),
                width: 32,
                height: 32,
                alt: item.statusRu
            }
        )

        const temp = createElement("span", "weather-forecast__temp", this.#createTextTemp(item,is24h))
        container.append(dateEl, imgEl, temp)
        return container
    }

    #createTextTemp(item,is24h){
        return is24h ? `${item.temp}°` : `от ${item.tempMin}° до ${item.tempMax}°`
    }


    getPathImg(item) {
        return `src/assets/images/content/weatherIcons/${this.#weatherIcons[item.status]?.day}`
    }

    #updateButtonStates() {
        const content = this.#sliderContent
        const hasOverflow = content.scrollWidth > content.clientWidth
        const atStart = content.scrollLeft <= 0
        const atEnd = content.scrollLeft + content.clientWidth >= content.scrollWidth - 1

        if (!hasOverflow) {
            this.#disableButton(this.#leftButtonBlock)
            this.#disableButton(this.#rightButtonBlock)
            return;
        }

        atStart
            ? this.#disableButton(this.#rightButtonBlock)
            : this.#enableButton(this.#rightButtonBlock)

        atEnd
            ? this.#disableButton(this.#leftButtonBlock)
            : this.#enableButton(this.#leftButtonBlock)
    }

    #disableButton(block) {
        block.classList.add("weather-app__slider-button-block--disabled")
    }

    #enableButton(block) {
        block.classList.remove("weather-app__slider-button-block--disabled")
    }

    #resetSlider() {
        this.#sliderContent.scrollLeft = 0
    }
}