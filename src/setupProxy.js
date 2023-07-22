const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/predict',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000', // Adjust the target URL if your Flask API is running on a different port
      changeOrigin: true,
    })
  );
};
