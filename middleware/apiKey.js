
const secretAPIKey = process.env.SECRET_APIKEY;

function auth(req, res, next) {

    const apiKey = req.headers["api-key"]
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required' });
    }

    if(apiKey === secretAPIKey) {
        req.user = { apiKey }; 
        next();
    } else {
        return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    }  
}
  
  module.exports = auth;