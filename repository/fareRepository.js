module.exports = {
    getAll: (con, callback) => {
        con.query("SELECT f.*,v.name AS vehicle FROM fare f LEFT JOIN vehicle v ON f.vehicle_id=v.id ORDER BY id ASC", callback)
    },
    getById: (con, id, callback) => {
        con.query("SELECT f.*,v.name AS vehicle FROM fare f LEFT JOIN vehicle v ON f.vehicle_id=v.id WHERE f.id=?", [id], callback)
    },
    store: (con, data, callback) => {
        con.query("INSERT INTO fare(vehicle_id,one_hour,more_one,max_pay,daily,capacity) VALUES (?,?,?,?,?,?)",
        [data.vehicle_id,data.one_hour,data.more_one,data.max_pay,data.daily,data.capacity],
        callback)
    },
    update: (con, data, callback) => {
        con.query("UPDATE fare SET vehicle_id=?,one_hour=?,more_one=?,max_pay=?,daily=?,capacity=? WHERE id=?",
        [data.vehicle_id,data.one_hour,data.more_one,data.max_pay,data.daily,data.capacity,data.id],
        callback)
    },
    delete: (con, id, callback) => {
        con.query("DELETE FROM fare WHERE id=?", [id], callback)
    }
}