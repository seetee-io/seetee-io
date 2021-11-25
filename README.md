# 🧡 Seetee's Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/748069a7-de7b-43bb-8cc5-eeff09e01a42/deploy-status)](https://app.netlify.com/sites/seetee-website/deploys)

The website is a [React](https://reactjs.org/) app build using [NextJS](https://nextjs.org/) and running on [Netlify](https://www.netlify.com/).

## Development

For a local development server, run:

```
npm install && npm run dev
```

This will run the website on `localhost:3000`.

## Production Export

To build a static HTML export of the website, run:

```
npm install && npm run build && npm run export
```

This will output the static build in `out/`.
That build can then be hosted statically on a webserver without the need for a Node.js server.

## Deployment

Every merge to `master` will be deployed automatically on Netlify.
