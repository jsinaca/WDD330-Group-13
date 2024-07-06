const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {

  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const products = await fetch (`${baseURL}product/${id}`);
    const response = await convertToJson(products);
    return response.Result;
  }
  async checkout(formData) {
    const temp = JSON.stringify(formData);
    const options = {
      method: "POST", 
      headers: {"Content-Type": "application/json"}, 
      body: temp
    }
    // console.log(formData);
    var w = await fetch(`${baseURL}checkout`, options);
    return convertToJson(w);
    }
}
