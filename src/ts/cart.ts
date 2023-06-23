class Cart {
    cart: Element;
    pageBody: Element;
    productsWrapper: Element;
    cartList: string[];
    cartNotice: Element;
    cartTimer: NodeJS.Timeout | undefined;
    productQuantityLimit: number;

    constructor() {
        this.cart = document.querySelector('.header-bottomline__cart-counter') as Element;
        this.pageBody = document.querySelector('.page__body') as Element;
        this.productsWrapper = document.querySelector('.products') as Element;
        this.cartList = [];
        this.cartTimer;
        this.productQuantityLimit = 20;
        this.cartNotice = document.createElement('div');
        this.cartNotice.classList.add('cart-notice');
        this.cartNotice.textContent = 'Извините, все слоты заполнены';
    }
    countProduct() {
        this.checkLocalStorage();
        this.productsWrapper.addEventListener('click', (evt) => {
            const target = evt.target as Element;
            const productsCard = target.closest('.products__card');
            if (productsCard && !productsCard.classList.contains('products__card--in-cart')) {
                if (!this.isLimitCart()) {
                    this.cart.textContent = (+this.cart.innerHTML + 1).toString();
                    productsCard.classList.add('products__card--in-cart');
                    this.addInCartList(productsCard);
                } else {
                    this.displayLimitNotification();
                }
            } else if (productsCard && productsCard.classList.contains('products__card--in-cart')) {
                productsCard.classList.remove('products__card--in-cart');
                this.cart.textContent = (+this.cart.innerHTML - 1).toString();
                this.removeLimitNotification();
                this.removeFromCartList(productsCard);
            }
        });
    }

    isLimitCart() {
        return +this.cart.innerHTML < this.productQuantityLimit ? false : true;
    }

    displayLimitNotification() {
        this.pageBody.appendChild(this.cartNotice);
        clearTimeout(this.cartTimer);
        this.cartTimer = setTimeout(() => this.pageBody.removeChild(this.cartNotice), 5000);
    }

    removeLimitNotification() {
        if (this.pageBody.contains(this.cartNotice)) {
            this.pageBody.removeChild(this.cartNotice);
            clearTimeout(this.cartTimer);
        }
    }

    addInCartList(productsCard: Element) {
        const cardTitle = (productsCard.querySelector('.product__card-title') as Element).innerHTML;
        this.cartList.push(cardTitle);
        this.updateLocalStorage();
    }

    removeFromCartList(productsCard: Element) {
        const cardTitle = (productsCard.querySelector('.product__card-title') as Element).innerHTML;
        this.cartList.splice(this.cartList.indexOf(cardTitle), 1);
        this.updateLocalStorage();
    }

    checkLocalStorage() {
        if (localStorage.cartList) {
            this.cartList = JSON.parse(localStorage.cartList);
            this.cart.textContent = JSON.parse(localStorage.cartList).length;
        }
    }

    updateLocalStorage() {
        localStorage.setItem('cartList', JSON.stringify(this.cartList));
    }

    clearCart() {
        this.cartList = [];
        this.updateLocalStorage();
        this.cart.textContent = '0';
    }
}

export default Cart;
