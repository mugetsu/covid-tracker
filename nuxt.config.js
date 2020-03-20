const webpack = require('webpack')
const pkg = require('./package')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Environment variables
  */
  env: {
    accessToken: process.env.MAPBOX_TOKEN,
    ga: process.env.GA
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'COVID-19 Tracker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'og:title', property: 'og:title', content: 'COVID-19 Tracker' },
      { hid: 'og:description', property: 'og:description', content: pkg.description },
      { hid: 'og:image', property: 'og:image', content: 'https://covid-worldwide.herokuapp.com/icon.png' },
      { hid: 'og:url', property: 'og:url', content: 'https://covid-worldwide.herokuapp.com' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Global CSS
  */
 css: [
   { src: 'mapbox-gl/dist/mapbox-gl.css', lang: 'css' }
 ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/google-gtag'
  ],

  /*
  ** Plugins
  */
  plugins: [
    { src: '~/plugins/vue-apexcharts.js', mode: 'client' }
  ],

  /*
  ** Axios configuration
  */
  axios: {
    baseURL: process.env.API_URL
  },

  /*
  ** PWA configuration
  */
  pwa: {
    manifest: {
      name: 'COVID-19 Tracker',
      short_name: 'COVID-19'
    },
    icons: {
      sizes: [16, 32, 180, 192, 512]
    }
  },

  /*
  ** GTAG configuration
  */
 'google-gtag': {
    id: process.env.GA,
    config: {
      send_page_view: true
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl'
      })
    ],
    extractCSS: process.env.NODE_ENV !== 'development',
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    extend(config, ctx) {
      config.module.noParse = /(mapbox-gl)\.js$/
    }
  }
}
