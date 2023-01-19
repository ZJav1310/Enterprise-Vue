const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
      proxy: {
        '^/FilmAPIServlet': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          secure:false,
          pathRewrite: {'^/FilmAPIServlet': '/enterprise_api_war_exploded/FilmAPIServlet'},
          logLevel: 'debug' 
      },
      },
  },
};
