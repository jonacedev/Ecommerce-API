
const User = require('../models/user');

const getDefaultUser = (req, res) => {

    const apiKey = req.headers['api-key'];
    if (!apiKey) {
        return res.status(400).json({ success: false, message: "API key is required" });
    }

    User.findOne({ apiKey: apiKey })
        .then(user => {
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            return res.status(200).json({ success: true, data: user });
        })
        .catch(err => {
            return res.status(500).json({ success: false, message: "Error retrieving user", error: err });
        });
};

module.exports = {
    getDefaultUser
};