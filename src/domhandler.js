import getData from "./api";
import validate from "./validate";
import Icon from "./search.svg";
const ct = document.querySelector("#app");

function searchBar(obj) {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const btn = document.createElement("button");
  const search = new Image();

  btn.append(search);
  search.src = Icon;
  search.width = "25";
  input.type = "search";
  form.classList.add("search-bar");

  input.addEventListener("input", (e) => {
    validate(input);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearDOM();
    spinner();
    if (validate(input)) {
      getData(input.value).then((response) => {
        buildDom(response);
        console.log(response);
      });
    } else {
      validate(input);
    }
  });

  form.append(input, btn);

  return form;
}

function spinner() {
  const spinner = document.createElement("div");
  spinner.classList.add("lds-dual-ring");

  ct.append(spinner);
}

function weatherContainer(obj) {
  const container = document.createElement("section");
  container.classList.add("container");

  container.append(region(obj), location(obj), hourly(obj), forecast(obj));

  return container;
}

function location(obj) {
  const container = document.createElement("section");
  const today = document.createElement("div");
  const now = document.createElement("div");
  container.classList.add("location");

  const currenttemp = document.createElement("div");
  const condition = document.createElement("div");
  const wind = document.createElement("div");
  const img = document.createElement("img");
  const todayhigh = document.createElement("div");
  const todaylow = document.createElement("div");
  const todaydate = document.createElement("div");
  const todayrain = document.createElement("div");
  const todaysnow = document.createElement("div");

  currenttemp.textContent = obj.current.temp_f + "F";
  condition.textContent = obj.current.condition.text;
  wind.textContent = obj.current.wind_mph + "mph: " + obj.current.wind_dir;
  img.src = obj.current.condition.icon;
  img.alt = obj.current.condition.text;
  img.title = obj.current.condition.text;

  todayhigh.textContent =
    "High: " + obj.forecast.forecastday[0].day.maxtemp_f + "F";
  todaylow.textContent =
    "Low: " + obj.forecast.forecastday[0].day.mintemp_f + "F";
  todaydate.textContent = obj.forecast.forecastday[0].date;
  todayrain.textContent =
    "Chance of rain: " +
    obj.forecast.forecastday[0].day.daily_chance_of_rain +
    "%";

  now.append(img, currenttemp, condition, wind, today);
  today.append(todayhigh, todaylow, todayrain);
  container.append(now, today);

  return container;
}

function region(obj) {
  const container = document.createElement("section");
  const location = document.createElement("div");
  container.classList.add("region");

  location.textContent = obj.location.name + ", " + obj.location.region;

  container.append(location);

  return container;
}

function hourly(obj) {
  const container = document.createElement("section");
  container.classList.add("hourly");

  return container;
}

function forecast(obj) {
  const container = document.createElement("section");
  container.classList.add("forecast");
  const dayMap = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  for (const key in obj.forecast.forecastday) {
    const day = document.createElement("p");
    const high = document.createElement("div");
    const low = document.createElement("div");
    const icon = document.createElement("img");
    const card = document.createElement("div");
    card.classList.add("forecast-card");

    const date = new Date(obj.forecast.forecastday[key].date);

    day.textContent =
      dayMap[date.getUTCDay()] +
      " " +
      (date.getUTCMonth() + 1) +
      "/" +
      date.getUTCDate();
    icon.src = obj.forecast.forecastday[key].day.condition.icon;
    icon.alt = obj.forecast.forecastday[key].day.condition.text;
    icon.title = obj.forecast.forecastday[key].day.condition.text;
    high.textContent = obj.forecast.forecastday[key].day.maxtemp_f + "F";
    low.textContent = obj.forecast.forecastday[key].day.mintemp_f + "F";

    card.append(day, icon, high, low);
    container.append(card);
  }

  return container;
}

function clearDOM() {
  while (ct.lastElementChild !== document.querySelector(".search-bar")) {
    ct.lastElementChild.remove();
  }
}

export default function buildDom(obj) {
  clearDOM();
  if (!document.querySelector(".search-bar")) {
    ct.append(searchBar(obj));
  }
  ct.append(weatherContainer(obj));
}
