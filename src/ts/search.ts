import { Assortment } from './interfaces';

class Search {
    private searchWords: string;
    private input: HTMLInputElement | undefined;

    constructor() {
        this.searchWords = '';
        this.input;
    }

    createSearch() {
        const filtersSection = document.querySelector('.filters') as Element;

        const filtersItem = document.createElement('div');
        filtersItem.classList.add('filters__item');

        const title = document.createElement('p');
        title.classList.add('filters__item-title');
        title.textContent = 'поиск';
        filtersItem.append(title);

        const inpitWrapper = document.createElement('div');
        inpitWrapper.classList.add('filters__input-wrapper');
        filtersItem.append(inpitWrapper);

        const input = document.createElement('input');
        input.classList.add('filters__search-input');
        input.id = 'search-input';
        input.setAttribute('type', 'text');
        this.addSearchWordsListener(input);
        input.autofocus = true;
        input.setAttribute('placeholder', 'введите текст');
        this.input = input;
        inpitWrapper.append(input);

        const clearButton = document.createElement('button');
        clearButton.classList.add('filters__search-clear-btn');
        clearButton.id = 'search-clear-btn';
        this.addClearInput(clearButton, input);
        input.append(clearButton);
        inpitWrapper.append(clearButton);

        filtersSection.append(filtersItem);
    }

    private addClearInput(button: HTMLButtonElement, input: HTMLInputElement) {
        button.addEventListener('click', () => {
            input.value = '';
            this.searchWords = '';
        });
    }

    private addSearchWordsListener(input: HTMLInputElement) {
        input.addEventListener('input', () => {
            this.searchWords = input.value;
        });
    }

    search(assortment: Assortment) {
        const resultAssortment = assortment.filter((item) => {
            const cardTitle = item.title.toLowerCase();
            const searchWords = this.searchWords.toLowerCase();
            return cardTitle.includes(searchWords) ? true : false;
        });

        return resultAssortment;
    }

    resetSearch() {
        this.searchWords = '';
        if (this.input) this.input.value = '';
    }
}

export default Search;
