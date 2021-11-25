# 🟠 Seetee Website

The website is a React site running on NextJS.
This is overkill for now&mdash;we're only using it as a static site&mdash;but gives us some headroom for when we want to add more complex functionality such as LNURL-Auth.

## Running the Dev Environment

For a local development server, run:

```
npm install && npm run dev
```

This will run the website on `localhost:3000`.

## Export the Static Site for Production

To build a static HTML export of the website, run:

```
npm install && npm run build && npm run export
```

This will output the static build in `out/`. This build can be hosted statically on a webserver without the need of a Node.js server.
