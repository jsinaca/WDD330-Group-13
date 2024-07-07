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
  const myForm = document.forms[0];
  const test = myForm.reportValidity();

  const chkStatus = myForm.checkValidity();
  if (chkStatus) {
    checkout.checkout();
    var currentLocation = location;
    location.replace(currentLocation + "success.html");
    localStorage.clear("so-cart");
  }
});
