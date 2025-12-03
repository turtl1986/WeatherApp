function debounce(fn, delay) {
    let timer

    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => fn.apply(this, args), delay)
    }
}

function createElement(tag, cl = null, text = null, attrs = {}) {
    const el = document.createElement(tag)
    if (cl) el.className = cl
    if (text) el.textContent = text

    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'width' || key === 'height') el[key] = Number(value)
        else el.setAttribute(key, String(value));

    })

    return el
}

function findWeatherConditions(cityData) {
    return weatherData.find(weather => weather.id === cityData.weatherId)
}