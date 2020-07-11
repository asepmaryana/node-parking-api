const dao = require('../repository/statisticRepository')

module.exports = {
    statistic: (req, res) => {
        let bike_in = 0
        let bike_out = 0
        let car_in = 0
        let car_out = 0
        dao.getCount(req.con, {vehicle_id:2, is_checked_in:true}, (err, rows) => {
            bike_in = rows[0].total
        })
        dao.getCount(req.con, {vehicle_id:2, is_checked_in:false}, (err, rows) => {
            bike_out = rows[0].total
        })
        dao.getCount(req.con, {vehicle_id:1, is_checked_in:true}, (err, rows) => {
            car_in = rows[0].total
        })
        dao.getCount(req.con, {vehicle_id:1, is_checked_in:false}, (err, rows) => {
            car_out = rows[0].total
        })
        
        setTimeout(() => {
            res.json({bike_in:bike_in, bike_out:bike_out, car_in:car_in, car_out:car_out})
        }, 2000)
    }
}