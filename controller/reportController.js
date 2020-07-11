'use strict';

const dao = require('../repository/reportRepository')

module.exports = {
    getDaily: (req, res) => {
        let criteria = { date: req.params.date, vehicle_id: req.params.vehicle_id }
        dao.getDaily(req.con, criteria, (err, rows) => {
            res.json(rows)
        })
    },
    getRecapitulation: (req, res) => {
        let criteria = { from: req.params.from, to: req.params.to }
        dao.getRecapitulation(req.con, criteria, (err, rows) => {
            let result = {
                bike_count: 0,
                bike_total: 0,
                car_count: 0,
                car_total: 0,
                total: 0,
                rows: rows
            }
            for (var i=0; i<rows.length; i++) {
                result.bike_count += rows[i].bike_checkout_count;
                result.car_count += rows[i].car_checkout_count;
                result.bike_total += rows[i].bike_trx_sum;
                result.car_total += rows[i].car_trx_sum;
                rows[i].trx_sum = rows[i].bike_trx_sum + rows[i].car_trx_sum;
                result.total += rows[i].trx_sum;
            }
            res.json(result)
        })
    }
}