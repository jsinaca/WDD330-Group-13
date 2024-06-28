import { renderListWithTemplate, itemsInCart } from "./utils.mjs"

function  productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img
            src="${product.Image}"
            alt="${product.NameWithoutBrand} image"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.ListPrice}</p></a
        >
        </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const getData = await this.dataSource.getData();
        const need = ["880RR", "985RF", "985PR", "344YJ"];
        const refineList = await this.refineList(need,getData);
        this.renderList(refineList);
    }
    renderList(getData) {
        renderListWithTemplate(productCardTemplate, this.listElement, getData);
        itemsInCart();
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