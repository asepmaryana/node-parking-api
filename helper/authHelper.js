const jwt = require('jsonwebtoken');

module.exports = {
    getInfo: (req) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            var auth = null;
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                auth = user;                
            });
            return auth;
        }
        else return null;
    }
}