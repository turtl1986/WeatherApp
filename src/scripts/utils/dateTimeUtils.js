import {findWeatherConditions} from "./common.js";

export class DateTimeUtils {

    static MINUTES_IN_HOUR = 60
    static MILLISECONDS_IN_MINUTE = 60000
    static MILLISECONDS_IN_HOUR = 3600000

    static getCityLocalDateTime(cityData) {
        const now = new Date()
        const utcTime = now.getTime() + (now.getTimezoneOffset() * DateTimeUtils.MILLISECONDS_IN_MINUTE)
        const cityTime = new Date(utcTime + (DateTimeUtils.MILLISECONDS_IN_HOUR * cityData.timezoneOffset))

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

    static getTimeData(value, cityData) {
        let eventTime = value.value
        let currentTime = DateTimeUtils.getCityLocalDateTime(cityData).time

        const eventMinutes = DateTimeUtils.convertTimeToMinutes(eventTime)
        const nowMinutes = DateTimeUtils.convertTimeToMinutes(currentTime)

        const diff = eventMinutes - nowMinutes
        const abs = Math.abs(diff)
        const hours = Math.floor(abs / DateTimeUtils.MINUTES_IN_HOUR)
        const minutes = abs % DateTimeUtils.MINUTES_IN_HOUR

        const pad = n => String(n).padStart(2, "0")

        if (diff > 0) return `Осталось: ${pad(hours)}:${pad(minutes)}`
        else return `Прошло: ${pad(hours)}:${pad(minutes)}`
    }

    static getDayPeriod(cityData, time) {
        const weather = findWeatherConditions(cityData)
        const sunrise = weather.sunrise.value
        const sunset = weather.sunset.value
        const currentMinutes = DateTimeUtils.convertTimeToMinutes(time)
        const sunriseMinutesTotal = DateTimeUtils.convertTimeToMinutes(sunrise)
        const sunsetMinutesTotal = DateTimeUtils.convertTimeToMinutes(sunset)
        return currentMinutes >= sunriseMinutesTotal && currentMinutes < sunsetMinutesTotal ? "day" : "night"
    }

    static convertTimeToMinutes(time) {
        const [hoursStr, minutesStr] = time.split(":")
        return Number(hoursStr) * DateTimeUtils.MINUTES_IN_HOUR + Number(minutesStr)
    }
}