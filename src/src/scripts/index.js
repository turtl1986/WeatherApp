import CityCard from "./components/cityCard.js";
import ForecastCards from "./components/forecastCards.js";
import SliderComponent from "./components/sliderComponent.js";
import SearchComponent from "./components/searchComponent.js";
import {weatherData} from "./services/weatherData.js";
import {cityData} from "./services/cityData.js";
import {forecast5days} from "./services/forecast5days.js";
import {forecast24h} from "./services/forecast24h.js";
import {weatherIcons} from "./services/weatherIcons.js";
import {cityCardBlock, forecastCardsBlock, searchButton, searchInput, sliderBlock, weatherBlock} from "./constants";

class WeatherApp {
    #cityData
    #weatherData
    #cityCardInstance
    #forecastCardsInstance
    #sliderComponent
    #searchComponent
    #forecast5days
    #forecast24h
    #weatherIcons
    #cityCardBlock
    #weatherBlock
    #forecastCardsBlock
    #searchInput
    #searchButton
    #sliderBlock

    init(cityData, weatherData, forecast5days, forecast24h, weatherIcons,cityCardBlock, weatherBlock, forecastCardsBlock, searchInput, searchButton,sliderBlock) {
        this.#cityData = cityData
        this.#weatherData = weatherData
        this.#forecast5days = forecast5days
        this.#forecast24h = forecast24h
        this.#weatherIcons = weatherIcons
        this.#cityCardBlock=cityCardBlock
        this.#weatherBlock=weatherBlock
        this.#forecastCardsBlock=forecastCardsBlock
        this.#searchInput=searchInput
        this.#searchButton=searchButton
        this.#sliderBlock=sliderBlock
        return this
    }

    render(){
        this.#cityCardInstance = new CityCard()
        this.#forecastCardsInstance = new ForecastCards()
        this.#sliderComponent = new SliderComponent()
        this.#searchComponent = new SearchComponent()

        this.#cityCardInstance.init(this.#cityCardBlock,this.#weatherIcons).render(this.#cityData[0])
        const currentWeather = this.#weatherData.find((item) => item.id === this.#cityData[0].weatherId)
        this.#forecastCardsInstance.init(this.#forecastCardsBlock).render(currentWeather, this.#cityData[0])
        this.#searchComponent.init(this.#cityData, this.#forecastCardsInstance, this.#cityCardInstance,this.#searchInput,this.#searchButton).bindEvents()
        this.#sliderComponent.init(this.#sliderBlock,this.#weatherIcons,this.#forecast24h,this.#forecast5days).render()
        return this
    }

}

new WeatherApp().init(cityData, weatherData, forecast5days, forecast24h, weatherIcons,cityCardBlock, weatherBlock, forecastCardsBlock, searchInput, searchButton,sliderBlock).render()





