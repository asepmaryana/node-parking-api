function errorHandler(err, req, res, next) {
    if (err.status == 401) {
        return res.status(err.status).json({ message: 'Akses tidak diijinkan' })
    }    
    return res.status(err.status).json({ message: err.message })    
}

module.exports = errorHandler
