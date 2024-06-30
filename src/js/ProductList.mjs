import { renderListWithTemplate } from "./utils.mjs"

function  productCardTemplate(product) {
    return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img
            src="${product.Images.PrimaryLarge}"
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
        const getData = await this.dataSource.getData(this.category);
        document.querySelector(".top-products").textContent = `Top Products: ${this.category[0].toUpperCase() + this.category.slice(1)}`;
        this.renderList(getData);
    }
    renderList(getData) {
        renderListWithTemplate(productCardTemplate, this.listElement, getData);
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