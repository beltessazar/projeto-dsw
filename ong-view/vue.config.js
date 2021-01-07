module.exports = {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3030",
          //changeOrigin: true,
          logLevel: "debug",
          //pathRewrite: { "^/api": "/" },
          //pathRewrite: { "^/api/": "/api/" },
        },
      },
    },
  };
  