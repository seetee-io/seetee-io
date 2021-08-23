const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Seetee",
    description:
      "Seetee buys and holds crypto currencies, while investing in ambitious projects and companies throughout the ecosystem.",
    siteUrl: "https://example.com",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-svgr",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: path.resolve(__dirname, "src/assets"),
      },
      __key: "assets",
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          src: path.resolve(__dirname, "src/"),
          "@components": path.resolve(__dirname, "src/components"),
          "@styles": path.resolve(__dirname, "src/styles"),
          "@assets": path.resolve(__dirname, "src/assets"),
          "@hooks": path.resolve(__dirname, "src/hooks"),
        },
      },
    },
  ],
};
