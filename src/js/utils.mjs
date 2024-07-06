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
  var totalItems = 0;
  const circle = document.querySelector(".circle-superscrip");
  const one = document.querySelector(".one-number");
  const two = document.querySelector(".two-numbers");
  try {
    for (let item of inCart) {
      totalItems += parseInt(item.Qty)
    }
    if (inCart && totalItems > 0 && totalItems < 10) {
      circle.style.display = "block";
      two.style.display = "none";
      one.style.display = "block";
      one.innerHTML = totalItems;
    } else if (inCart && totalItems >= 10) {
      circle.style.display = "block";
      one.style.display = "none";
      two.style.display = "block";
      two.innerHTML = totalItems;
    } else {
      circle.style.display = "none";
      one.style.display = "none";
      two.style.display = " none";
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
    callback(data);
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