import { crawlSite } from "./index.js";

const links = [];
for await (const url of crawlSite("https://www.expressvpn.com")) {
  console.log(url);
  links.push(url);
}
