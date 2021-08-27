const config = require("./src/data/config")

require("dotenv").config({
  path: `.env`,
})

const { ACCESS_TOKEN, SPACE_ID } = process.env

module.exports = {
  siteMetadata: {
    title: `KennyN Portfolio`,
    description: `Kenny's portfolio developed with Gatsby and Contentful.`,
    author: `Kenny Nguyen`,
    siteUrl: `https://kennyn.dev`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-inline-svg`,
    `gatsby-plugin-image`,
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-32x32.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        accessToken: ACCESS_TOKEN,
        spaceId: SPACE_ID,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
