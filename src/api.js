// key
const API_KEY = "8ca0b68856a045d8b65212932232911";
const FORECAST_DAYS = 7;

export default async function getData(location = "Philadelphia") {
  try {
    const call = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=${FORECAST_DAYS}&q=${location}&aqi=yes`,
      { mode: "cors" }
    );
    const response = call.json();

    return response;
  } catch (err) {
    throw new Error("Error, could not fetch data");
  }
}
