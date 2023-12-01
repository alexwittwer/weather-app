import "./style.css";
import getData from "./src/api";
import buildDom from "./src/domhandler";

const dframe = {};
dframe.data = await getData("Philadelphia");

buildDom(dframe);
