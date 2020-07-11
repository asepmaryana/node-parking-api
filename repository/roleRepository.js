module.exports = {
    getAll: (con, callback) => {
        con.queue("SELECT * FROM role ORDER BY id", callback)
    }
}