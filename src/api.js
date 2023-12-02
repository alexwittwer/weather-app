// key
const API_KEY = "8ca0b68856a045d8b65212932232911";

export default async function getData(location = "Philadelphia") {
  try {
    const call = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=14&q=${location}&aqi=yes`,
      { mode: "cors" }
    );
    const response = await call.json();

    return response;
  } catch (err) {
    throw new Error("Error, could not fetch data");
  }
}
