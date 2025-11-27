class SearchComponent {

    static SEARCH_CLASS = 'weather-app__search-button--search';
    static CLOSE_CLASS = 'weather-app__search-button--close';

    #searchInput
    #searchButton

    init() {
        this.#searchInput = document.querySelector('.weather-app__search-input')
        this.#searchButton = document.querySelector('.weather-app__search-button')

        return this
    }

    bindEvents() {
        this.#searchInput.addEventListener('keydown', this.handleKeydown.bind(this));
        this.#searchInput.addEventListener('input', this.handleInput.bind(this));
        this.#searchButton.addEventListener('click', this.handleClick.bind(this));

        return this
    }

    isSearchState() {
        return this.#searchButton.classList.contains(SearchComponent.SEARCH_CLASS);
    }

    handleKeydown(event) {
        if (event.key === 'Enter') {
            console.log(event.target.value)
            if (this.isSearchState()) {
                this.setButtonSearchToState(SearchComponent.SEARCH_CLASS, SearchComponent.CLOSE_CLASS)
            }
        }
    }

    handleInput(event) {
        if (event.target.value.length > 0) {
            if (this.isSearchState()) {
                this.setButtonSearchToState(SearchComponent.SEARCH_CLASS, SearchComponent.CLOSE_CLASS)
            }
        } else {
            this.setButtonSearchToState(SearchComponent.CLOSE_CLASS, SearchComponent.SEARCH_CLASS)
        }
    }

    handleClick() {
        console.log(this.#searchInput.value)
        if (this.isSearchState()) {
            this.setButtonSearchToState(SearchComponent.SEARCH_CLASS, SearchComponent.CLOSE_CLASS)
        } else {
            this.#searchInput.value = ''
            this.setButtonSearchToState(SearchComponent.CLOSE_CLASS, SearchComponent.SEARCH_CLASS)
        }
    }

    setButtonSearchToState(rcl, cl) {
        this.#searchButton.classList.remove(rcl);
        this.#searchButton.classList.add(cl);
    }
}