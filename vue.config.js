module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://take-home-test-api.nutech-integrasi.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false,
      },
    },
  },
};
