# WeatherApp

Weather-приложение с детальной информацией о погоде, прогнозом и интерактивным интерфейсом.

## Функционал

- Поиск города
- Отображение текущей погоды
- Прогноз на 24 часа
- Прогноз на 5 дней
- Информация:
    - температура
    - влажность
    - давление
    - видимость
    - восход и закат
    - направление ветра
- Кастомный slider
- Кастомный progress bar
- Динамические weather icons
- Локальное время города

---

## Стек технологий

- HTML5
- CSS3
- JavaScript (ES6+)
- Component-based architecture
- BEM methodology

---

## Архитектура проекта

Проект разделён на независимые компоненты:

```bash
src/
│
├── scripts/
│   ├── components/
│   ├── constants/
│   ├── services/
│   ├── ui/
│   ├── utils/
│   └── index.js
│
├── styles/
│   ├── components/
│   ├── ui/
│   ├── base.css
│   ├── main.css
│   ├── reset.css
│   └── index.css
│
├── assets/
│   ├── images/
│   ├── logo/
│   └── ui/
│
└── index.html

