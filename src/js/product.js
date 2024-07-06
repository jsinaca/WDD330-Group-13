import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs";

const productId = getParams("product");
const dataSource = new ExternalServices();

const product = new ProductDetails(productId, dataSource);

product.init();
