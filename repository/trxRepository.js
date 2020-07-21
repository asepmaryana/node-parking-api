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
    },
    getCheckInList: (con, crit, callback) => {
        let sql = "SELECT t.*,v.name as vehicle FROM trx t LEFT JOIN vehicle v ON t.vehicle_id=v.id WHERE t.checked_out IS NULL ";
        if (crit.vehicle_id != '') sql = sql + "AND t.vehicle_id = "+crit.vehicle_id+" ";
        if (crit.date != '') sql = sql + "AND DATE(t.checked_in) = '"+crit.date+"' ";
        sql = sql + "ORDER BY t.id DESC ";
        //console.log(sql);
        con.query(sql, callback);
    },
    update: (con, data) => {
        con.query("UPDATE trx SET checked_out=?,amount=?,duration=?,user_checked_out=? WHERE id=?", 
        [data.checked_out, data.amount, data.duration, data.user_checked_out, data.id])
    },
    getCheckOutList: (con, crit, callback) => {
        let sql = "SELECT t.*,v.name as vehicle FROM trx t LEFT JOIN vehicle v ON t.vehicle_id=v.id WHERE t.checked_out IS NOT NULL ";
        if (crit.vehicle_id != '') sql = sql + "AND t.vehicle_id = "+crit.vehicle_id+" ";
        if (crit.date != '') sql = sql + "AND DATE(t.checked_out) = '"+crit.date+"' ";
        sql = sql + "ORDER BY t.id DESC ";
        //console.log(sql);
        con.query(sql, callback);
    },
}