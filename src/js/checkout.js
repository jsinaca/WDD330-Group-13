import { loadHeaderFooter } from "../js/utils.mjs";
import CheckoutProcess from "../js/CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess();
checkout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", checkout.calculateTotal.bind(checkout));

document.querySelector(".checkout-btn").addEventListener("click", (event) => {
  event.preventDefault();
  checkout.checkout();
});
