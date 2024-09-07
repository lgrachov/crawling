# crawling

A simple crawler made in JavaScript for Node.

## Installation

`crawling` is both available on GitHub Packages and npm.

### How to install from GitHub Packages

To install, you first have to follow [this guide](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package) on GitHub Docs. Then, you can run:

```bash
$ npm install @lgrachov/crawling@1.0.1
```

This should install the package in your project.

### How to install from npm

You only need to run one command:

```bash
$ npm install crawling
```

This should install the package in your project.

## Usage

### Creating an array with all of the links

This example will create an array with all of the links gathered from the page.

```javascript
import { crawlSite } from "crawling";

const links = [];
for await (const url of crawlSite("https://github.com/", 500)) {
  links.push(url);
}
```

### Log each one of the links

This example will log each one of the links received, without a delay like the previous example had.

```javascript
import { crawlSite } from "crawling";

for await (const url of crawlSite("https://github.com/", 500)) {
  console.log(url);
}
```

### Documentation

The function `crawlSite` takes two parameters:

- `site`: Required. The site to crawl.
- `timeout`: Optional. The timeout between each link in miliseconds, default is 500.

There are examples of usage, [above](#usage) and below:

```javascript
import { crawlSite } from "crawling";

// this should choose a random url

const links = [];
for (const url of await crawlSite("https://github.com/", 500)) {
  links.push(url);
}

console.log(shuffle(links)[0]);
```
