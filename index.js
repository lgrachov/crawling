import { resolve } from "node:url";
import { setTimeout } from "node:timers/promises";
import got from "got";
import { parse } from "node-html-parser";

const normalizeUrl = (url) => url.replace(/\/+$/, "");

/**
 * Crawls a site with the given parameters.
 * @param site Required. The site to crawl.
 * @param timeout Optional. The timeout between each link in miliseconds, default is 500.
 */
export async function* crawlSite(site, timeout = 500) {
  const allLinks = new Set();
  const collectedLinks = new Set([normalizeUrl(site)]);
  const { hostname } = new URL(site);

  while (collectedLinks.size) {
    const url = collectedLinks.values().next().value;

    collectedLinks.delete(url);

    try {
      yield url;

      const html = await got(url).text();
      const root = parse(html);

      allLinks.add(url);

      root.querySelectorAll("a").forEach(function (link) {
        let href = link.getAttribute("href");

        if (!href) {
          return;
        }

        href = normalizeUrl(resolve(url, href).split("?")[0].split("#")[0]);

        if (new URL(href).hostname === hostname && !allLinks.has(href)) {
          collectedLinks.add(href);
        }
      });
    } catch (e) {}

    await setTimeout(timeout);
  }
}
