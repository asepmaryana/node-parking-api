module.exports = {
    getAll: (con, callback) => {
        con.query("SELECT * FROM role ORDER BY id", callback)
    }
}