module.exports = {
    getCount: (con, crit, callback) => {
        let sql = "SELECT COUNT(id) AS total FROM trx WHERE vehicle_id="+crit.vehicle_id
        if (crit.is_checked_in) sql +=" AND checked_out IS NULL"
        else sql +=" AND checked_out IS NOT NULL"
        con.query(sql, callback)
    }
}