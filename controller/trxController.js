'use strict'
const moment = require('moment')
const trxDao = require('../repository/trxRepository')
const trxRecapDao = require('../repository/trxRecapRepository')
const fareDao = require('../repository/fareRepository')
const auth = require('../helper/authHelper')

module.exports = {
    checkIn: (req, res) => {
        // ambil info tarif
        fareDao.getByVehicleId(req.con, req.body.vehicle_id, (err, row) => {
            let fare = row[0]
            if (fare == null) res.status(400).json({ message: 'Tarif untuk jenis kendaraan tidak ditemukan !' })

            // hitung yg blm check out
            let total = 0
            trxDao.getCountNotCheckOut(req.con, req.body.vehicle_id, (err, row) => {
                total = row[0].total
                total++
                if (total >= fare.capacity) {
                    res.status(400).json({ message: 'Kendaraan sudah penuh !'})
                }
                else {            
                    let info = auth.getInfo(req)
                    let data = {
                        plat_number: req.body.plat_number,
                        vehicle_id: req.body.vehicle_id,
                        checked_in: new Date(),
                        user_checked_in: info.id
                    }
                    trxDao.getByPlatNumber(req.con, req.body.plat_number, (err, rows) => {
                        if (rows.length > 0) {
                            let row = rows[0]
                            if (row.checked_out == null) {
                                res.status(400).json({ message: 'Kendaraan sudah melakukan check in !'})
                            }
                            else {
                                module.exports.insert(req.con, data)
                                res.json({ message: 'Check in berhasil.' })
                            }
                        }
                        else {
                            module.exports.insert(req.con, data)
                            res.json({ message: 'Check in berhasil.' })
                        }
                    })
                }
            })
        })
    },
    insert: (con, data) => {
        if (data.date == null) data.date = new Date()
        trxDao.save(con, data, ()=> {})

        let column = data.vehicle_id == 1 ? 'car_checkin_count' : 'bike_checkin_count'
        let trx_date = moment(data.date).format('YYYY-MM-DD')
        // cek rekap trx sesuai tanggal
        trxRecapDao.getByDate(con, trx_date, (err, rows) => {
            if (rows.length == 0) {
                trxRecapDao.insert(con, column, trx_date)
            }
            else {
                trxRecapDao.update(con, column, trx_date)
            }
        })
    }
}