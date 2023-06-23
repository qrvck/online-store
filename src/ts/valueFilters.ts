import { Assortment } from './interfaces';

class ValueFilters {
    private filteredTypes: { [key: string]: string[] };

    constructor() {
        this.filteredTypes = {
            manufacturer: [],
            color: [],
            type: [],
            popular: [],
        };
    }
    createValueFilters() {
        this.checkLocalStorage();
        const filtersSection = document.querySelector('.filters') as Element;
        const data = [
            { title: 'по производителю', values: ['Nike', 'Puma', 'Adidas'], type: 'manufacturer' },
            { title: 'по цвету', values: ['белый', 'черный', 'серый', 'многоцветный'], type: 'color' },
            { title: 'по типу', values: ['кеды', 'кроссовки'], type: 'type' },
            { title: 'популярность', values: ['популярный'], type: 'popular' },
        ];

        for (let i = 0; i < data.length; i++) {
            const filtersItem = document.createElement('div');
            filtersItem.classList.add('filters__item');

            const itemTitle = document.createElement('p');
            itemTitle.classList.add('filters__item-title');
            itemTitle.innerHTML = data[i].title;
            filtersItem.appendChild(itemTitle);

            const valueWrapper = document.createElement('div');
            valueWrapper.classList.add('filters__value-wrapper');
            filtersItem.appendChild(valueWrapper);

            for (let j = 0; j < data[i].values.length; j++) {
                const valueLabel = document.createElement('label');
                valueLabel.classList.add('filters__value-label');
                valueLabel.textContent = data[i].values[j];

                const valueCheckbox = document.createElement('input');
                valueCheckbox.classList.add('filters__checkbox');
                valueCheckbox.type = 'checkbox';
                valueCheckbox.value = data[i].values[j];
                this.addCheckedToCheckbox(valueCheckbox, data[i].type, data[i].values[j]);
                this.addWriteDataListener(valueCheckbox, data[i].type);

                valueLabel.prepend(valueCheckbox);
                valueWrapper.appendChild(valueLabel);
            }
            filtersSection.appendChild(filtersItem);
        }
    }

    private addWriteDataListener(checkbox: HTMLInputElement, type: string) {
        checkbox.addEventListener('change', (evt) => {
            const target = evt.target as HTMLInputElement;
            if (target.checked) {
                this.filteredTypes[type].push(target.value);
            } else {
                const indextype = this.filteredTypes[type].findIndex((item) => item === target.value);
                this.filteredTypes[type].splice(indextype, 1);
            }
            this.updateLocalStorage();
        });
    }

    filters(assortment: Assortment) {
        const types = Object.keys(this.filteredTypes);

        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            for (let j = 0; j < this.filteredTypes[type].length; j++) {
                assortment = assortment.filter((item) => {
                    if (this.filteredTypes[type].includes(item[type])) return true;
                    return false;
                });
            }
        }

        return assortment;
    }

    private addCheckedToCheckbox(checkbox: HTMLInputElement, checkboxType: string, checkboxValue: string) {
        const checkedTypes = this.filteredTypes[checkboxType];
        if (checkedTypes.includes(checkboxValue)) {
            checkbox.checked = true;
        }
    }

    private checkLocalStorage() {
        if (localStorage.filterValues) this.filteredTypes = JSON.parse(localStorage.filterValues);
    }

    private updateLocalStorage() {
        localStorage.filterValues = JSON.stringify(this.filteredTypes);
    }

    resetFilters() {
        const checkboxes = document.querySelectorAll('.filters__checkbox');
        checkboxes.forEach((item) => {
            (item as HTMLInputElement).checked = false;
        });

        this.filteredTypes = {
            manufacturer: [],
            color: [],
            type: [],
            popular: [],
        };

        this.updateLocalStorage();
    }
}

export default ValueFilters;
