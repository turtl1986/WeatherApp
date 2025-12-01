class CityCard {

    #cityCardBlock;

    init() {
        this.#cityCardBlock = document.querySelector('.weather-app__current')

        if (!this.#cityCardBlock) {
            const weatherBlock = document.querySelector('.weather-app__block')
            this.#cityCardBlock = `<div class="weather-app__current"></div>`
            weatherBlock.insertAdjacentHTML('beforeend', this.#cityCardBlock)
        }

        return this
    }

    render(cityData) {
        this.#cityCardBlock.replaceChildren();
        const cityLocalDateTime = this.getCityLocalDateTime(cityData)
        let path = this.getPathImg(cityData.status, cityLocalDateTime.time)
        const cardBlock = `
        <h2 class="weather-app__city">${cityData.cityRu}</h2>
        <p class="weather-app__date">
            <time datetime="2023-01-06">${cityLocalDateTime.date}</time>
            <time datetime="11:29">${cityLocalDateTime.time}</time>
        </p>
        <div class="weather-app__temperature">${cityData.temperature}°</div>
        <div class="weather-app__condition">
            <img class="weather-app__condition-img"
                 src="assets/images/content/weatherIcons/${path}"
                 width="24" height="24"
                 alt=${cityData.statusRu}>
            <p class="weather-app__condition-text">${cityData.statusRu}</p>
        </div>
        <p class="weather-app__feels">Ощущается как ${cityData.feelsLike}°</p>`

        this.#cityCardBlock.insertAdjacentHTML('beforeend', cardBlock);
    }

    getPathImg(status, time) {
        let isDay = this.getDayPeriod(time)
        switch (status) {
            case "clear_sky":
                return isDay === "day" ? "dayClear.svg" : "nightClear.svg"

            case "scattered_clouds":
                return isDay === "day" ? "dayScatteredClouds.svg" : "nightScatteredClouds.svg"

            case "few_clouds":
                return isDay === "day" ? "dayFewClouds.svg" : "nightFewClouds.svg"

            case "mist":
                return "dayMist.svg"

            case "cloudy":
                return isDay === "day" ? "dayCloudy.svg" : "nightCloudy.svg"

            case "rain":
                return isDay === "day" ? "dayRain.svg" : "nightRain.svg"

            case "snow":
                return "daySnow.svg"

            case "shower_rain":
                return "showerRain.svg"

            case "thunderstorm":
                return "dayThunderstorm.svg"
        }
    }

    getDayPeriod(time) {
        const [hoursStr] = time.split(":");
        const hours = Number(hoursStr);
        return hours >= 6 && hours < 18 ? "day" : "night";
    }

    getCityLocalDateTime(cityData) {
        const now = new Date();
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const cityTime = new Date(utcTime + (3600000 * cityData.timezoneOffset));

        return {
            time: cityTime.toLocaleTimeString('ru-RU', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            }),
            date: cityTime.toLocaleDateString('ru-RU', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            })
        }
    }
}