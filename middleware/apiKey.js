
const secret = "API_KEY_ECOMMERCE_APP_98798";

function auth(req, res, next) {

    const apiKey = req.headers["api-key"]
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required' });
    }

    if(apiKey === secret) {
        req.user = { apiKey };  // Attach the API key to the request object
        next();
    } else {
        return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    }  
}
  
  module.exports = auth;