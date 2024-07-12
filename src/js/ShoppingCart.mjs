import { renderListWithTemplate, itemsInCart, getLocalStorage } from "./utils.mjs"

function  cartItemTemplate(item) {
    return `<li class="cart-card divider">
        <a href="#" class="cart-cart__image>
            <img
            src="${item.Image}"
            alt="${item.Name} image"
            /></a>
            <a href="#">
                <h2 class="card__name">${item.Name}</h2>
            </a>
            <p class="cart-card__color">$${item.Colors[0].ColorName}</p>
            <p class="cart-card__quantity">qty: 1 </p>
            <p class="cart-card__price">$${item.FinalPrice}</p>
            
        </li>`;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }
    async init() {
        const getData = await this.dataSource.getData();
        const need = ["880RR", "985RF", "985PR", "344YJ"];
        const refineList = await this.refineList(need,getData);
        this.renderList(refineList);
    }
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
        itemsInCart(cartItems);
    }
    refineList(listNeded, data) {
        var refineList =  [];
        data.forEach(element => {
            if (listNeded.includes(element.Id))
                refineList.push(element)  
        });
        return refineList;
    }
}