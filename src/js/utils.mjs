// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function itemsInCart(inCart) {
  // const inCart = getLocalStorage("so-cart");
  const circle = document.querySelector(".circle-superscrip");
  try {
    if (inCart && inCart.length > 0 && inCart.length < 10) {
      circle.style.display = "block";
      var number = document.querySelector(".one-number");
      number.style.display = "block";
      number.innerHTML = inCart.length;
    } else if (inCart && inCart.length >= 10) {
      circle.style.display = "block";
      var display = document.querySelector(".two-numbers");
      display.style.display = "block";
      display.innerHTML = inCart.length;
    } else {
      circle.style.display = "none";
      document.querySelector(".one-number").style.display = "none";
      document.querySelector(".two-numbers").style.display = " none";
    }
  } catch {
    document.querySelector(".circle-superscrip").style.display = "none";
    document.querySelector(".one-number").style.display = "none";
    document.querySelector(".two-numbers").style.display = " none";
    new Error("Error reading cookies");
  }
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data)
  }
}

export async function loadHeaderFooter() {
  const headerTemp = await loadTemplate("../partials/header.html");
  const footerTemp = await loadTemplate("../partials/footer.html");
  const header = document.querySelector("#main-header");
  const footer = document.querySelector("#main-footer");

  var localStorag = getLocalStorage("so-cart");
  
  renderWithTemplate(headerTemp, header, localStorag, itemsInCart);
  renderWithTemplate(footerTemp, footer);
}

export async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text();
  return template;
}