module.exports = {
    getAll: (con, callback) => {
        con.query("SELECT u.id,u.username,u.password,u.firstname,r.name as role FROM users u LEFT JOIN role r ON u.role_id = r.id ORDER BY u.username", callback)
    },
    getUsername: (con, username, callback) => {
        con.query("SELECT u.id,u.username,u.password,u.firstname,r.name as role FROM users u LEFT JOIN role r ON u.role_id = r.id WHERE u.username=?", [username], callback)
    },
    create: (con, data, callback) => {
        con.query("INSERT INTO users (id,username,password,firstname,lastname,phone,role_id) VALUES (?,?,?,?,?,?,?)",
            [data.id,data.username,data.password,data.firstname,data.lastname,data.phone,data.role_id], 
            callback)
    },
    getById: (con, id, callback) => {
        con.query("SELECT u.*,r.name as role FROM users u LEFT JOIN role r ON u.role_id = r.id WHERE u.id=?",[id], callback)
    }
}