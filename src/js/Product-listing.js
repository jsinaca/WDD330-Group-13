import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const productData = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductListing(category, productData, element);


listing.init();