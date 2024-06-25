import { setLocalStorage, getLocalStorage, itemsInCart } from "./utils.mjs";
  
  export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        await this.renderProductDetails();
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById("addToCart")
          .addEventListener("click", this.addToCart.bind(this));
        itemsInCart();
    }

    addToCart() {
        let cartList = getLocalStorage("so-cart");
        if (!cartList) cartList = [];
        cartList.push(this.product);
        setLocalStorage("so-cart", cartList);
        location.reload();
    }

    renderProductDetails () {
        var product = document.getElementById("product").content;
        var copyHTML = document.importNode(product, true);
        copyHTML.querySelector(".product-brand").textContent = this.product.Brand.Name;
        copyHTML.getElementById("NameWithoutBrand").textContent = this.product.NameWithoutBrand;
        copyHTML.getElementById("image").src = this.product.Image;
        copyHTML.getElementById("image").alt = this.product.NameWithoutBrand;
        copyHTML.querySelector(".product-card__price").textContent = this.product.ListPrice;
        copyHTML.querySelector(".product__color").textContent = this.product.Colors.ColorName;
        copyHTML.querySelector(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
        copyHTML.getElementById("addToCart").dataset.id = this.productId;

        document.getElementById("tent").appendChild(copyHTML);
    }
  }