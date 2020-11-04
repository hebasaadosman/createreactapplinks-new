module.exports = {
  
    siteMetadata: {
      title: `Heba Saad`,
      description:"Walink is the top WhatsApp link shortener tool in the world. Create links with custom message, wa.link domain and its own QR code for users to chat with you instantly without having your phone number in their address book."
    },
  
  plugins: [
    
    
    
    {

      resolve: `gatsby-plugin-styletron`,
      options: {
        // You can pass options to Styletron.
        prefix: "Heba-",
        // Disable dev debug mode, enabled by default
        debug: false,
      },
    },
    
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `http://localhost:8000`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-154726194-2",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Walink",
        short_name: "Walink",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#fff",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "minimal-ui",
        icon: "src/images/icon-web.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
      },
    },
  ],
}