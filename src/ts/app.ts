import { Assortment } from './interfaces';
import Cart from './cart';
import Sort from './sort';
import RangeFilters from './rangeFilters';
import { target as SliderElement } from 'nouislider';
import ValueFilters from './valueFilters';
import ResetButtons from './resetButtons';
import Search from './search';

class App {
    private assortment: Assortment;
    private productsWrapper: Element;
    private cart;
    private sort;
    private rangeFilters;
    private valueFilters;
    private resetButtons;
    private search;

    constructor(assortment: Assortment) {
        this.assortment = assortment;
        this.productsWrapper = document.querySelector('.products') as Element;
        this.cart = new Cart();
        this.sort = new Sort();
        this.rangeFilters = new RangeFilters(assortment);
        this.valueFilters = new ValueFilters();
        this.resetButtons = new ResetButtons();
        this.search = new Search();
    }
    start() {
        this.createElements();
        this.applyAllFilters();
        this.addListeners();
    }

    private applyAllFilters() {
        let res = this.rangeFilters.filters(this.assortment);
        res = this.valueFilters.filters(res);
        res = this.sort.sort(res);
        res = this.search.search(res);
        this.drawAssortment(res, this.cart.cartList);
    }

    private createElements() {
        this.cart.countProduct();
        this.sort.createSortInput();
        this.rangeFilters.createRanges();
        this.valueFilters.createValueFilters();
        this.search.createSearch();
        this.resetButtons.createButtons();
    }

    private addListeners() {
        const sortInput = document.querySelector('#sort__input') as Element;
        sortInput.addEventListener('change', () => {
            this.applyAllFilters();
        });

        const amountFilter = document.querySelector('#amount-filter') as SliderElement;
        if (amountFilter.noUiSlider) {
            amountFilter.noUiSlider.on('update', () => {
                this.applyAllFilters();
            });
        }

        const priceFilter = document.querySelector('#price-filter') as SliderElement;
        if (priceFilter.noUiSlider) {
            priceFilter.noUiSlider.on('update', () => {
                this.applyAllFilters();
            });
        }

        const checkboxes = document.querySelectorAll('.filters__checkbox');
        checkboxes.forEach((item) => {
            item.addEventListener('change', () => {
                this.applyAllFilters();
            });
        });

        const resetFiltersButton = document.querySelector('#reset-filters-btn') as Element;
        resetFiltersButton.addEventListener('click', () => {
            this.valueFilters.resetFilters();
            this.rangeFilters.resetFilters();
        });

        const resetSettingsButton = document.querySelector('#reset-settings-btn') as Element;
        resetSettingsButton.addEventListener('click', () => {
            this.sort.resetSort();
            this.cart.clearCart();
            this.search.resetSearch();
            this.valueFilters.resetFilters();
            this.rangeFilters.resetFilters();
        });

        const searchInput = document.querySelector('#search-input') as Element;
        searchInput.addEventListener('input', () => {
            this.applyAllFilters();
        });

        const clearSearchButton = document.querySelector('#search-clear-btn') as Element;
        clearSearchButton.addEventListener('click', () => {
            this.applyAllFilters();
        });
    }

    private drawAssortment(assortment: Assortment, cartList: string[]) {
        this.productsWrapper.innerHTML = '';
        if (!assortment.length) {
            this.productsWrapper.classList.add('products--empty');
        } else {
            this.productsWrapper.classList.remove('products--empty');
        }

        let template = '';
        assortment.forEach((item) => {
            let additionalClasses = '';
            if (cartList.includes(item.title)) {
                additionalClasses = 'products__card--in-cart';
            }
            if (item.popular === 'популярный') {
                additionalClasses += ' products__card--popular';
            }
            template += `<div class="products__card ${additionalClasses}"><img class="products__card-img" src="${item.img}" alt=""><ul class="products__list"><li class="product__card-title">${item.title}</li><li class="product__card-price">${item.price} BYN</li><li class="product__card-additional">цвет: ${item.color}</li><li class="product__card-additional">модель ${item.releaseYear} года</li><li class="product__card-additional">кол-во на складе: ${item.amount}</li><li class="product__card-additional">тип: ${item.type}</li><li class="product__card-additional">производитель: ${item.manufacturer}</li></ul></div>`;
        });
        this.productsWrapper.innerHTML = template;
    }
}

export default App;
