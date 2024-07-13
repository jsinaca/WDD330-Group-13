import { setLocalStorage, getLocalStorage, loadHeaderFooter, alertMessage, itemsInCart } from "./utils.mjs";
  
  export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
      this.product = await this.dataSource.findProductById(this.productId);
      await this.renderProductDetails(this.product);
      // document.querySelector(".top-products").textContent = `Top Pproducts${}`;
      // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
      // once we have the product details we can render out the HTML
      // once the HTML is rendered we can add a listener to Add to Cart button
      // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
      document.getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
      loadHeaderFooter();
    }

    addToCart() {
        let cartList = getLocalStorage("so-cart");
        var needsToBeAdded = true;
        if (!cartList) cartList = [];
        try {
          if (cartList.length > 0) {
            cartList.forEach(element => { if (element.Id === this.product.Id) {
              const increment = parseInt(element.Qty) + 1;
              element.Qty = String(increment);
              needsToBeAdded = false;
              return;
            }
          })}
        if (needsToBeAdded){
            this.product.Qty = "1";
            cartList.push(this.product);
        }
          setLocalStorage("so-cart", cartList);
          alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
          itemsInCart(cartList);
        }
        catch {
           new Error ("Problem adding product to cart");
        } 
    }

    renderProductDetails () {
        var product = document.getElementById("product").content;
        var copyHTML = document.importNode(product, true);

        copyHTML.querySelector(".product-brand").textContent = this.product.Brand.Name;
        copyHTML.getElementById("NameWithoutBrand").textContent = this.product.NameWithoutBrand;
        copyHTML.getElementById("image").src = this.product.Images.PrimaryExtraLarge;
        copyHTML.querySelector(".product-card__price").textContent = this.product.ListPrice;
        copyHTML.querySelector(".product__color").textContent = this.product.Colors[0].ColorName;
        copyHTML.querySelector(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
        copyHTML.getElementById("addToCart").dataset.id = this.productId;

        document.getElementById("tent").appendChild(copyHTML);
    }
  }