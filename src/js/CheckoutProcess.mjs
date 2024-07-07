import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

function packageItems() {
  const items = [];
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0) {
    cartItems.forEach((element) => {
      items.push({
        id: element.Id, 
        name: element.Name, 
        price: element.ListPrice, 
        quantity: element.Qty});
    })
  }
  return items;
}

export default class CheckoutProcess {
    constructor() {
      this.items = [];
      this.subtotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.total = 0;
      this.qty = 0;
    }
    async init() {
      var displaySubTotal = document.querySelector(".sub-total");
      this.calculateSubTotal();
      displaySubTotal.innerHTML += `${this.subtotal.toFixed(2)}`;
      this.items = packageItems();
      this.totalItems();
    }
    calculateSubTotal() {
      const cartItems = getLocalStorage("so-cart");
      if (cartItems && cartItems.length > 0) {
        cartItems.forEach((element) => {
          this.subtotal += element.FinalPrice * element.Qty;
      })}
    }
    totalItems() {
      const cartItems = getLocalStorage("so-cart");
      if (cartItems && cartItems.length > 0) {
        cartItems.forEach((element) => {
          this.qty += parseInt(element.Qty);
      })}
    }
    calculateTotal() {
      this.shipping = (this.qty * 2) + 8;
      this.tax = this.subtotal * .06;
      this.total = this.subtotal + this.tax + this.shipping;
      this.displayTotal()
      document.querySelector(".estimate").innerHTML = `Shipping: ${this.shipping.toFixed(2)}`; 
      document.querySelector(".tax").innerHTML = `Tax: ${this.tax.toFixed(2)}`; 
    }
    displayTotal() {
      var displayTotal = document.querySelector(".total");
      displayTotal.innerHTML = `Total: ${this.total.toFixed(2)}`;
    }
    async checkout() {
      const form = document.querySelector(".checkout-form");
      const formData = new FormData(form), convertedJSON = {};
      formData.forEach((value, key) => {
        convertedJSON[key] = value;
      });
    
      convertedJSON["orderDate"] = new Date;
      convertedJSON["orderTotal"] = this.total.toFixed(2);
      convertedJSON["shipping"] = this.shipping.toFixed(2);
      convertedJSON["tax"] = this.tax.toFixed(2);
      convertedJSON["items"] = this.items;  

      try {
        const services = new ExternalServices();
        const res = await services.checkout(convertedJSON);
        // console.log(res);
      } catch (e){
        // const temp = convertToJson(convertedJSON);
        new Error(e)
      }
    }
}

// http://wdd330-backend.onrender.com/checkout