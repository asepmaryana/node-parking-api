module.exports = {
    getAll: (con, callback) => {
        con.query("SELECT * FROM vehicle ORDER BY id", callback)
    },
    getById: (con, id, callback) => {
        con.query("SELECT * FROM vehicle WHERE id = "+id, callback)
    }
}