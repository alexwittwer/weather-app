import getData from "./api";
import validate from "./validate";
import Icon from "./search.svg";
const ct = document.querySelector("#app");

function searchBar() {
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

function location(obj) {
  const container = document.createElement("section");
  const today = document.createElement("div");
  const now = document.createElement("div");
  now.classList.add("now");
  today.classList.add("today");
  container.classList.add("location");

  const currenttemp = document.createElement("div");
  const condition = document.createElement("div");
  const wind = document.createElement("div");
  const img = document.createElement("img");
  const todayhigh = document.createElement("div");
  const todaylow = document.createElement("div");
  const todaydate = document.createElement("div");
  const todayrain = document.createElement("div");
  const feelslike = document.createElement("div");
  const humidity = document.createElement("div");
  const sunrise = document.createElement("div");
  const sunset = document.createElement("div");

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
  feelslike.textContent = "Feels like: " + obj.current.feelslike_f + "F";
  humidity.textContent = "Humidity: " + obj.current.humidity + "%";
  sunrise.textContent = "Sunrise: " + obj.forecast.forecastday[0].astro.sunrise;
  sunset.textContent = "Sunrise: " + obj.forecast.forecastday[0].astro.sunset;

  now.append(img, currenttemp, condition, wind, today);
  today.append(
    todayhigh,
    todaylow,
    todayrain,
    feelslike,
    humidity,
    sunrise,
    sunset
  );
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
  const switcherButton = document.createElement("button");
  switcherButton.classList.add("switch-hours-days");
  container.classList.add("forecast");

  const hourMap = {
    0: "12 AM",
    1: "1 AM",
    2: "2 AM",
    3: "3 AM",
    4: "4 AM",
    5: "5 AM",
    6: "6 AM",
    7: "7 AM",
    8: "8 AM",
    9: "9 AM",
    10: "10 AM",
    11: "11 AM",
    12: "12 PM",
    13: "1 PM",
    14: "2 PM",
    15: "3 PM",
    16: "4 PM",
    17: "5 PM",
    18: "6 PM",
    19: "7 PM",
    20: "8 PM",
    21: "9 PM",
    22: "10 PM",
    23: "11 PM",
  };

  switcherButton.textContent = "hourly";
  switcherButton.addEventListener("click", (e) => {
    clearDOM();
    if (!document.querySelector(".search-bar")) {
      ct.append(searchBar());
    }
    ct.append(weatherContainerDaily(obj));
  });

  container.append(switcherButton);

  for (const key in obj.forecast.forecastday[0].hour) {
    const hour = document.createElement("p");
    const temp = document.createElement("div");
    const icon = document.createElement("img");
    const card = document.createElement("div");
    card.classList.add("forecast-card");
    hour.classList.add("hour");

    const hourRes = new Date(
      obj.forecast.forecastday[0].hour[key].time
    ).getHours();

    icon.src = obj.forecast.forecastday[0].hour[key].condition.icon;
    icon.alt = obj.forecast.forecastday[0].hour[key].condition.text;
    icon.title = obj.forecast.forecastday[0].hour[key].condition.text;
    temp.textContent = obj.forecast.forecastday[0].hour[key].temp_f + "F";
    hour.textContent = hourMap[hourRes];

    card.append(hour, icon, temp);
    container.append(card);
  }

  return container;
}

function forecast(obj) {
  const switcherButton = document.createElement("button");
  switcherButton.classList.add("switch-hours-days");
  const container = document.createElement("section");
  container.classList.add("forecast");
  switcherButton.textContent = "daily";
  container.append(switcherButton);

  switcherButton.addEventListener("click", (e) => {
    clearDOM();
    if (!document.querySelector(".search-bar")) {
      ct.append(searchBar());
    }
    ct.append(weatherContainerHourly(obj));
  });

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

function weatherContainerDaily(obj) {
  const container = document.createElement("section");
  container.classList.add("container");

  container.append(region(obj), location(obj), forecast(obj));

  return container;
}

function weatherContainerHourly(obj) {
  const container = document.createElement("section");
  container.classList.add("container");

  container.append(region(obj), location(obj), hourly(obj));

  return container;
}

export default function buildDom(obj) {
  clearDOM();
  if (!document.querySelector(".search-bar")) {
    ct.append(searchBar());
  }
  ct.append(weatherContainerDaily(obj));
}
