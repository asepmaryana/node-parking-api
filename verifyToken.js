function tokenValidate(req, res, next) {
    var token = req.headers['Authorization'];
    if (!token) res.status(403).json({"success":false, "message":"No token provided !"});
    next();
}

module.exports = tokenValidate;
