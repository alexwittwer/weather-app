import "./style.css";
import getData from "./src/api";

const data = await getData("Philadelphia");

console.log(data);
