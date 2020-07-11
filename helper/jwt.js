const expressJwt = require('express-jwt')
const pathToRegexp = require('path-to-regexp')

function jwt() {
    return expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256']
    }).unless({
        path: [
            '/auth/login',
            /^\/api\/export\/.*/
        ]
    })
}

module.exports = jwt
