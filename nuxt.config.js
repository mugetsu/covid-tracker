const webpack = require('webpack')
const pkg = require('./package')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Environment variables
  */
  env: {
    accessToken: process.env.MAPBOX_TOKEN
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.author.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', href: '/images/standby.png', as: 'image' },
      { rel: 'preload', href: '/images/walk.png', as: 'image' },
      { rel: 'preload', href: '/images/attack.png', as: 'image' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
 loading: '~/components/Loader/index.vue',

  /*
  ** Global CSS
  */
 css: [
   { src: 'mapbox-gl/dist/mapbox-gl.css', lang: 'css' }
 ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/ga.js', mode: 'client' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  /*
  ** Axios configuration
  */
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3000/'
  },

  /*
  ** PWA configuration
  */
  pwa: {
    manifest: {
      name: pkg.author.name,
      short_name: pkg.author.name.split(' ')[0]
    },
    icons: {
      sizes: [16, 32, 180, 192, 512]
    }
  },

  /*
  ** Router middleware
  */
  router: {},

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
