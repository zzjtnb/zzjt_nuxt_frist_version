import base from './api/base';
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    // this htmlAttrs you need
    htmlAttrs: {
      lang: 'zh-Hans',
    },
    title: '争逐',
    titleTemplate: '%s - ',
    meta: [{
      charset: 'utf-8'
    },
    {
      hid: 'Author',
      name: 'Author',
      content: '争逐'
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: "Java,Vue,HTML,CSS,编程,博客,知识,系统,争逐,政治,经济,军事,历史,天文,地理,人文,哲学"
    },
    {
      hid: 'description',
      name: 'description',
      content: '纵观天下之势,发展强国之道'
    },
    {
      hid: 'Copyright',
      name: 'Copyright',
      content: '争逐版权所有'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */

  // loading: '~/components/loading.vue',
  loading: {
    color: '#00c58e',
    height: '3px',
    background: "#FFF",
    continuous: true
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/custom.scss',
    '@/assets/scss/reset.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios",
    '~plugins/check-before-each.js', // 全局路由守卫插件
    '~/plugins/untis',
    {
      src: '@/plugins/vue-mavon-editor',
      ssr: false
    },
    {
      src: '~/plugins/vue-inject',
      ssr: false
    },

  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/style-resources-module
    "@nuxtjs/style-resources",
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Simple usage
    'cookie-universal-nuxt',
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    componentPlugins: ['LayoutPlugin', 'NavbarPlugin', 'ButtonPlugin', 'OverlayPlugin', 'ToastPlugin', 'CardPlugin', 'PaginationNavPlugin', 'FormPlugin', 'FormGroupPlugin', 'FormInputPlugin',],
  },
  /*
   ** Style resources
   */
  styleResources: {
    scss: "./assets/scss/variables.scss"
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
    '/github': {
      target: base.github, // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/github': '', //将 /api 替换掉
      },
    },
    '/frist': {
      target: base.frist, // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/frist': '', //将 /api 替换掉
      },
    },
  },
  /*
** Server Middleware
*/
  // serverMiddleware: {
  //   '/api': '~/api'
  // },
  serverMiddleware: [

    // Will register file from project api directory to handle /api/* requires
    { path: '/api', handler: '~/api/index.js' },
    // { path: '/dir', handler: '~/database/index.js' },
    // We can create custom instances too
    // { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ],
  /*
   ** Build configuration
   */
  build: {
    // analyze: true,
    // // transpile: [/^element-ui/],//同步配置
    // // 按需引入element-ui
    // babel: {
    //   plugins: [
    //     ["component", {
    //       "libraryName": "element-ui",
    //       // styleLibraryName: 'theme-chalk', / / 删除此行
    //       style: false, // 添加此行
    //     }]
    //   ]
    // },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  }
}
