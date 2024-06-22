import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { setLocalStorage, getParams } from "./utils.mjs";

const productId = getParams("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();


// import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";

// const dataSource = new ProductData("tents");

// const productId = getParams("product");

// console.log(dataSource.findProductById(productId));


// function addProductToCart(product) {
//   var cartList = getLocalStorage("so-cart");
//   () => {if (!cartList) cartList = []} 
//   cartList.push(product)
//   setLocalStorage("so-cart", cartList);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
