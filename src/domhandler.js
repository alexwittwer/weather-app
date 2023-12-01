import bg from "./bg.jpg";
import getData from "./api";
const ct = document.querySelector("#app");

export function searchBar(obj) {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const btn = document.createElement("button");

  btn.textContent = "search";
  input.type = "search";
  form.classList.add("search-bar");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(input.value);
    validate(input);
    if (validate(input)) {
      obj.data = getData(input.value);
      console.log(obj.data);
    }
  });

  form.append(input, btn);
  ct.append(form);
}

export default function buildDom(obj) {
  clearDOM();
  searchBar(obj);
}

export function clearDOM() {
  while (ct.firstElementChild) {
    ct.firstElementChild.remove();
  }
}

function validate(element) {
  if (element.validity.valueMissing) {
    element.setCustomValidity("A location is required");
  } else {
    element.setCustomValidity("");
  }

  element.reportValidity();

  return element.checkValidity();
}
