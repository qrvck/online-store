import { target as SliderElement, create as createSlider } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { Assortment } from './interfaces';

class RangeFilter {
    rageTypes;

    constructor(assortment: Assortment) {
        this.rageTypes = [
            {
                title: 'по количеству на складе',
                minValue: this.getMin(assortment, 'amount'),
                maxValue: this.getMax(assortment, 'amount'),
                startFilter: this.getMin(assortment, 'amount'),
                endFilter: this.getMax(assortment, 'amount'),
                type: 'amount',
            },
            {
                title: 'по цене',
                minValue: this.getMin(assortment, 'price'),
                maxValue: this.getMax(assortment, 'price'),
                startFilter: this.getMin(assortment, 'price'),
                endFilter: this.getMax(assortment, 'price'),
                type: 'price',
            },
        ];
    }
    createRanges() {
        this.checkLocalStorage();
        const filtersSection = document.querySelector('.filters') as Element;

        for (let i = 0; i < this.rageTypes.length; i++) {
            const filtersItem = document.createElement('div');
            filtersItem.classList.add('filters__item');

            const itemTitle = document.createElement('p');
            itemTitle.classList.add('filters__item-title');
            itemTitle.innerHTML = this.rageTypes[i].title;
            filtersItem.appendChild(itemTitle);

            const rangeSlider = document.createElement('div') as SliderElement;
            rangeSlider.classList.add('filters__range-slider');
            filtersItem.appendChild(rangeSlider);
            rangeSlider.id = `${this.rageTypes[i].type}-filter`;

            const rangeOutput = document.createElement('div');
            rangeOutput.classList.add('filters__range-output');
            filtersItem.appendChild(rangeOutput);

            createSlider(rangeSlider, {
                start: [+this.rageTypes[i].startFilter, +this.rageTypes[i].endFilter],
                connect: true,
                step: 1,
                tooltips: {
                    to: function (numericValue) {
                        return numericValue.toFixed(0);
                    },
                },
                range: {
                    min: +this.rageTypes[i].minValue,
                    max: +this.rageTypes[i].maxValue,
                },
            });

            this.addListener(rangeSlider, rangeOutput, i);
            filtersSection.appendChild(filtersItem);
        }
    }

    private addListener(slider: SliderElement, output: HTMLDivElement, index: number) {
        if (slider.noUiSlider) {
            slider.noUiSlider.on('update', (values) => {
                const min = Number(values[0]).toFixed(0);
                const max = Number(values[1]).toFixed(0);
                output.innerHTML = `от ${min} до ${max}`;
                this.rageTypes[index].startFilter = min;
                this.rageTypes[index].endFilter = max;
                this.updateLocalStorage();
            });
        }
    }

    private getMin(assortment: Assortment, option: 'amount' | 'price') {
        let min = assortment[0][option];
        for (let i = 1; i < assortment.length; i++) {
            if (+assortment[i][option] < +min) {
                min = assortment[i][option];
            }
        }
        return min;
    }

    private getMax(assortment: Assortment, option: 'amount' | 'price') {
        let max = assortment[0][option];
        for (let i = 1; i < assortment.length; i++) {
            if (+assortment[i][option] > +max) {
                max = assortment[i][option];
            }
        }
        return max;
    }

    filters(assortment: Assortment) {
        const byAmount = assortment.filter((item) => {
            if (+item.amount <= +this.rageTypes[0].endFilter && +item.amount >= +this.rageTypes[0].startFilter) {
                return item;
            }
        });

        const byPrice = byAmount.filter((item) => {
            if (+item.price <= +this.rageTypes[1].endFilter && +item.price >= +this.rageTypes[1].startFilter) {
                return item;
            }
        });
        return byPrice;
    }

    private checkLocalStorage() {
        if (localStorage.rangeValues) {
            const sortData = JSON.parse(localStorage.rangeValues);
            this.rageTypes[0].startFilter = sortData.amount.startFilter;
            this.rageTypes[0].endFilter = sortData.amount.endFilter;
            this.rageTypes[1].startFilter = sortData.price.startFilter;
            this.rageTypes[1].endFilter = sortData.price.endFilter;
        }
    }

    private updateLocalStorage() {
        const sortData = {
            amount: {
                startFilter: this.rageTypes[0].startFilter,
                endFilter: this.rageTypes[0].endFilter,
            },
            price: {
                startFilter: this.rageTypes[1].startFilter,
                endFilter: this.rageTypes[1].endFilter,
            },
        };

        localStorage.rangeValues = JSON.stringify(sortData);
    }

    resetFilters() {
        const amountFilter = document.querySelector('#amount-filter') as SliderElement;
        const priceFilter = document.querySelector('#price-filter') as SliderElement;

        if (amountFilter.noUiSlider && priceFilter.noUiSlider) {
            amountFilter.noUiSlider.set([this.rageTypes[0].minValue, this.rageTypes[0].maxValue]);
            priceFilter.noUiSlider.set([this.rageTypes[1].minValue, this.rageTypes[1].maxValue]);
        }
    }
}

export default RangeFilter;
