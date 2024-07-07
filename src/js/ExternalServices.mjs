const baseURL = import.meta.env.VITE_SERVER_URL;

export async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse};
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
