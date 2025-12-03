class WeatherApp {

    constructor(cityData, weatherData) {
        this.cityData = cityData
        this.weatherData = weatherData

        this.cityCardInstance = new CityCard()
        this.forecastCardsInstance = new ForecastCards()
        this.searchComponent = null
    }

    init() {
        this.cityCardInstance.init().render(this.cityData[0])
        const currentWeather = findWeatherConditions(this.cityData[0])
        this.forecastCardsInstance.init().render(currentWeather,this.cityData[0])
        this.searchComponent = new SearchComponent(this.cityData, this.forecastCardsInstance, this.cityCardInstance)
        this.searchComponent.init().bindEvents()
        return this;
    }
}

new WeatherApp(cityData, weatherData).init()





