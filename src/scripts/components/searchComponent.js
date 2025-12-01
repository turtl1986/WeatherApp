class SearchComponent {

    static SEARCH_CLASS = 'weather-app__search-button--search';
    static CLOSE_CLASS = 'weather-app__search-button--close';

    #searchInput
    #searchButton
    #cityData
    #cityFind
    #forecastCardsInstance
    #cityCardInstance;

    constructor(cityData,forecastCards, cityCardInstance) {
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
        this.#searchInput.addEventListener('input', this.handleInput.bind(this));
        this.#searchButton.addEventListener('click', this.handleClick.bind(this));

        return this
    }

    isSearchState() {
        return this.#searchButton.classList.contains(SearchComponent.SEARCH_CLASS);
    }

    handleInput(event) {
        if (!event.target.value.length) {
            this.setButtonSearchToState(SearchComponent.CLOSE_CLASS, SearchComponent.SEARCH_CLASS)
        }
    }

    handleClick() {
        if (this.isSearchState()) {
            this.findCity(this.#searchInput.value)
        } else {
            this.#searchInput.value = ''
            this.setButtonSearchToState(SearchComponent.CLOSE_CLASS, SearchComponent.SEARCH_CLASS)
        }
    }

    setButtonSearchToState(rcl, cl) {
        this.#searchButton.classList.remove(rcl);
        this.#searchButton.classList.add(cl);
    }

    findCity(val) {
        const cityFind = this.#cityData.find(city => (city.cityRu.toLowerCase() === val.toLowerCase()) || (city.city.toLowerCase() === val.toLowerCase()))

        if (cityFind) {
            this.updateCityWeather(cityFind)
        } else {
            this.setButtonSearchToState(SearchComponent.CLOSE_CLASS, SearchComponent.SEARCH_CLASS)
            alert("Город не найден")
        }
    }

    updateCityWeather(cityFind) {
        this.#cityFind =cityFind
        let weather = weatherData.find(weather => weather.id === cityFind.weatherId)
        this.#cityCardInstance.render(cityFind)
        this.#forecastCardsInstance.render(weather)
        this.setButtonSearchToState(SearchComponent.SEARCH_CLASS, SearchComponent.CLOSE_CLASS)
    }
}