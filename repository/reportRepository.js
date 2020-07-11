module.exports = {
    getDaily: (con, criteria, callback) => {
        //? AND t.vehicle_id=? 
        let sql = "SELECT t.*,v.name as vehicle FROM trx t LEFT JOIN vehicle v ON t.vehicle_id=v.id WHERE t.checked_out IS NOT NULL AND DATE(t.checked_out)='"+criteria.date+"'"
        if (criteria.vehicle_id != '_') sql = sql + " AND t.vehicle_id="+criteria.vehicle_id
        sql = sql + " ORDER BY t.checked_out ASC"
        //console.log(sql)
        con.query(sql, callback)
    },
    getRecapitulation: (con, criteria, callback) => {
        let sql = "SELECT * FROM trx_recap "
        if (criteria.from == criteria.to) sql = sql + "WHERE trx_date = '"+criteria.from+"' "
        else sql = sql + "WHERE trx_date BETWEEN '"+criteria.from+"' AND '"+criteria.to+"' "
        sql = sql + "ORDER BY trx_date ASC "
        //console.log(sql)
        con.query(sql, callback)
    }
}