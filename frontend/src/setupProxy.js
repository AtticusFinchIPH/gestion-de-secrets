const { createProxyMiddleware } = require('http-proxy-middleware');

// This proxy redirects requests to /api endpoints to
// the Express server running on port 5000.
module.exports = function(app) {
  app.use(createProxyMiddleware('/api',{ target: "http://localhost:5000" }));
};