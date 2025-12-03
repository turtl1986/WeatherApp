class SearchComponent {

    static SEARCH_CLASS = 'weather-app__search-button--search'
    static CLOSE_CLASS = 'weather-app__search-button--close'

    #searchInput
    #searchButton
    #cityData
    #forecastCardsInstance
    #cityCardInstance;

    constructor(cityData, forecastCards, cityCardInstance) {
        this.#cityData = cityData
        this.#forecastCardsInstance = forecastCards
        this.#cityCardInstance = cityCardInstance
    }

    init() {
        this.#searchInput = document.querySelector('.weather-app__search-input')
        this.#searchButton = document.querySelector('.weather-app__search-button')
        return this
    }

    bindEvents() {
        this.#searchInput.addEventListener('input', debounce(this.handleInput.bind(this), 300))
        this.#searchButton.addEventListener('click', this.handleClick.bind(this))
        return this
    }

    isSearchState() {
        return this.#searchButton.classList.contains(SearchComponent.SEARCH_CLASS)
    }

    handleInput() {
        if (!this.#searchInput.value) this.setButtonSearch(true)
        else this.handleCitySearch(this.#searchInput.value)
    }

    handleClick() {
        if (!this.isSearchState()) {
            this.#searchInput.value = ''
            this.setButtonSearch(true)
        }
    }

    setButtonSearch(isSearching) {
        this.#searchButton.classList.toggle(SearchComponent.SEARCH_CLASS, isSearching)
        this.#searchButton.classList.toggle(SearchComponent.CLOSE_CLASS, !isSearching)
    }

    findCity(val) {
        const searchTerm = val.toLowerCase().trim()
        return this.#cityData.find(city => city.cityRu.toLowerCase().includes(searchTerm) || city.city.toLowerCase().includes(searchTerm))
    }

    handleCitySearch(val) {
        const cityFind = this.findCity(val)

        if (cityFind) {
            this.updateCityWeather(cityFind)
        } else {
            this.setButtonSearch(true)
            alert("Город не найден")
        }
    }

    updateCityWeather(cityFind) {
        let weather = findWeatherConditions(cityFind)
        this.#cityCardInstance.render(cityFind)
        this.#forecastCardsInstance.render(weather, cityFind)
        this.setButtonSearch(false)
    }
}