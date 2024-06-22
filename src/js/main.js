import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const productData = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductListing("Tents", productData, element);

listing.init();