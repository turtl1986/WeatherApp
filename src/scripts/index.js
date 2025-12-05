import {CityCard} from "./components/cityCard.js";
import {ForecastCards} from "./components/forecastCards.js";
import {SearchComponent} from "./components/searchComponent.js";
import {cityData} from "./services/cityData.js";
import {weatherData} from "./services/weatherData.js";
import {SliderComponent} from "./components/sliderComponent.js";


class WeatherApp {

    constructor(cityData, weatherData) {
        this.cityData = cityData
        this.weatherData = weatherData

        this.cityCardInstance = new CityCard()
        this.forecastCardsInstance = new ForecastCards()
        this.sliderComponent = new SliderComponent()
        this.searchComponent = null
    }

    init() {
        this.cityCardInstance.init().render(this.cityData[0])
        const currentWeather = this.weatherData.find((item) => item.id === this.cityData[0].weatherId)
        this.forecastCardsInstance.init().render(currentWeather,this.cityData[0])
        this.searchComponent = new SearchComponent(this.cityData, this.forecastCardsInstance, this.cityCardInstance)
        this.searchComponent.init().bindEvents()

        this.sliderComponent.init().render()
        return this;
    }
}

new WeatherApp(cityData, weatherData).init()





