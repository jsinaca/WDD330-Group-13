import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const externalServices = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductListing(category, externalServices, element);

listing.init();
