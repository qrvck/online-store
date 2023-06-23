import { Assortment } from './interfaces';

class Sort {
    sortType: string;

    constructor() {
        this.sortType = 'price (asc)';
    }

    createSortInput() {
        this.checkLocalStorage();
        const sortSection = document.querySelector('.sort') as Element;

        const label = document.createElement('label');
        label.setAttribute('for', 'sort__input');
        label.textContent = 'Сортировать:';

        const select = document.createElement('select');
        select.id = 'sort__input';
        this.addSaveType(select);

        const optionData = [
            { value: 'price (asc)', text: 'По цене (возрастанию)' },
            { value: 'price (desc)', text: 'По цене (убыванию)' },
            { value: 'by year (asc)', text: 'По году выхода (старые → новые)' },
            { value: 'by year (desc)', text: 'По году выхода (новые → старые)' },
        ];

        for (let i = 0; i < optionData.length; i++) {
            const option = document.createElement('option');
            option.classList.add('sort__option');
            option.value = optionData[i].value;
            option.textContent = optionData[i].text;
            if (this.sortType === optionData[i].value) option.selected = true;
            select.append(option);
        }

        sortSection.append(label);
        sortSection.append(select);
    }

    private addSaveType(select: HTMLSelectElement) {
        select.addEventListener('change', (evt) => {
            this.sortType = (evt.target as HTMLInputElement).value;
            this.updateLocalStorage();
        });
    }

    sort(assortment: Assortment) {
        if (this.sortType === 'price (asc)') {
            assortment.sort((a, b) => +a.price - +b.price);
        } else if (this.sortType === 'price (desc)') {
            assortment.sort((a, b) => +b.price - +a.price);
        } else if (this.sortType === 'by year (asc)') {
            assortment.sort((a, b) => (a.releaseYear > b.releaseYear ? 1 : -1));
        } else if (this.sortType === 'by year (desc)') {
            assortment.sort((a, b) => (a.releaseYear > b.releaseYear ? -1 : 1));
        }
        return assortment;
    }

    private checkLocalStorage() {
        if (localStorage.sortType) this.sortType = localStorage.sortType;
    }

    private updateLocalStorage() {
        localStorage.sortType = this.sortType;
    }

    resetSort() {
        const selects = document.querySelectorAll('.sort__option');

        selects.forEach((item) => {
            if ((item as HTMLOptionElement).value === 'price (asc)') {
                (item as HTMLOptionElement).selected = true;
            } else {
                (item as HTMLOptionElement).selected = false;
            }
        });

        this.sortType = 'price (asc)';
        localStorage.sortType = '';
    }
}

export default Sort;
