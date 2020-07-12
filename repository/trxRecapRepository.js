module.exports = {
    getByDate: (con, trx_date, callback) => {
        con.query("SELECT * FROM trx_recap WHERE trx_date=?", [trx_date], callback)
    },
    insert: (con, column, trx_date) => {
        if (column == 'car_checkin_count') {
            con.query("INSERT INTO trx_recap (trx_date,car_checkin_count) VALUES (?,?)", [trx_date, 1])
        }
        else {
            con.query("INSERT INTO trx_recap (trx_date,bike_checkin_count) VALUES (?,?)", [trx_date, 1])
        }
    },
    update: (con, column, trx_date) => {
        this.getByDate(con, trx_date, (err, result) => {
            let row = result[0]
            if (column == 'car_checkin_count') {
                row.car_checkin_count = row.car_checkin_count + 1
                con.query("UPDATE trx_recap SET car_checkin_count = ? WHERE id = ?", [row.car_checkin_count, row.id])
            }
            else {
                row.bike_checkin_count = row.bike_checkin_count + 1
                con.query("UPDATE trx_recap SET bike_checkin_count = ? WHERE id = ?", [row.bike_checkin_count, row.id])
            }
        })
    }
}