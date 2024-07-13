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
  var totalItems = 0;
  const displayNum = document.querySelector(".num-items");
  try {
    if (inCart && totalItems >= 0) {
      for (let item of inCart) {
        totalItems += parseInt(item.Qty)
      }
      displayNum.style.display = "inline-block";
      displayNum.innerHTML = totalItems;
      displayNum.parentElement.style.display = "block";
      displayNum.classList.add("animaNum");
      setTimeout(() => {displayNum.classList.remove("animaNum")}, 2000);
    } else {
      displayNum.parentElement.style.display = "none";
      displayNum.style.display = "none";
    }
  } catch {
    displayNum.parentElement.style.display = "none";
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

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  this;
  alert.addEventListener("click", function (event) {if (event.target.tagName == "SPAN") {
    main.removeChild(this);
  }})
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) {
    window.scroll(0,0);
  }

  setTimeout(function () {
    main.removeChild(alert);
  }, duration);
}
