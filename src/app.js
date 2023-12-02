import getData from "./api";
import buildDom from "./domhandler";

export default async function renderApp() {
  const dframe = await getData("Philadelphia");

  buildDom(dframe);
}
