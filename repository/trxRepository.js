module.exports = {
    getCountNotCheckOut: (con, vehicle_id, callback) => {
        con.query("SELECT COUNT(id) AS total FROM trx WHERE checked_out IS NULL AND vehicle_id=?", [vehicle_id], callback)
    },
    getByPlatNumber: (con, plat_number, callback) => {
        con.query("SELECT t.*,v.name as vehicle FROM trx t LEFT JOIN vehicle v ON t.vehicle_id=v.id WHERE t.plat_number=? ORDER BY id DESC LIMIT 1", [plat_number], callback)
    },
    save: (con, data, callback) => {
        con.query("INSERT INTO trx (plat_number,vehicle_id,checked_in,user_checked_in) VALUES (?,?,?,?)",
        [data.plat_number, data.vehicle_id, data.checked_in, data.user_checked_in], callback)
    }
}