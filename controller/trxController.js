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
    },
    getCheckInList: (req, res) => {
        let vehicle_id = typeof(req.query.vehicle_id) == 'undefined' ? '' : req.query.vehicle_id
        let date = typeof(req.query.date) == 'undefined' ? '' : req.query.date 
        let page = typeof(req.query.page) == 'undefined' ? '1' : req.query.page
        let size = typeof(req.query.size) == 'undefined' ? '10' : req.query.size
        //console.log('vehicle_id:'+vehicle_id+', date:'+date+', page:'+page+', size:'+size)
        trxDao.getCheckInList(req.con, {vehicle_id: vehicle_id, date: date}, (err, rows) => {
            res.json(rows)
        })
    },
    checkOut: (req, res) => {
        //ambil data terbaru berdasarkan plat nomor
        trxDao.getByPlatNumber(req.con, req.body.plat_number, (err, result) => {
            let trx = result[0]
            //console.log(trx)
            if (trx == null) res.status(400).json({ success: false, message: req.body.plat_number+' tidak ditemukan !' })
            else {
                // ambil info tarif
                fareDao.getByVehicleId(req.con, trx.vehicle_id, (err, res_fare) => {
                    let fare = res_fare[0]

                    // jika tidak ada tarif
                    if (fare == null) res.status(400).json({ success: false, message: 'Tarif tidak ditemukan !' })

                    if (trx.checked_out == null) {
                        // hitung lama parkir
                        let start = new Date(trx.checked_in)
                        let stop = new Date()
                        //console.log('start: '+start.getTime())
                        //console.log('stop: '+stop.getTime())
                        let hours = Math.ceil(Math.abs(stop.getTime() - start.getTime()) / (1000 * 3600))                        
                        //console.log('sdate: '+moment(start).format('YYYY-MM-DD'))
                        
                        let payment = 0
                        // jika dalam hari yg sama
                        if (moment(start).format('YYYY-MM-DD') == moment(stop).format('YYYY-MM-DD')) {
                            //jika dalam waktu 1 jam
                            if(hours <= 1) payment = fare.one_hour
                            else if(hours > 21) payment = fare.max_pay
                            else payment = hours * fare.more_one

                            //console.log('hours: '+hours)
                            //console.log('payment: '+payment)
                        }
                        else {
                            let days = Math.ceil(hours / 24)
                            payment = days * fare.daily

                            //console.log('days: '+days)
                            //console.log('payment: '+payment)
                        }
                        
                        //user yg melakukan checkout
                        let info = auth.getInfo(req)

                        //update trx
                        trxDao.update(req.con, {
                            checked_out: stop,
                            amount: payment,
                            duration: hours,
                            user_checked_out: info.id,
                            id: trx.id
                        })

                        //update recap
                        trxRecapDao.save(req.con, {
                            vehicle_id: trx.vehicle_id,
                            amount: payment,
                            trx_date: moment(stop).format('YYYY-MM-DD')
                        })

                        res.status(200).json({ 
                            success: true, 
                            message: req.body.plat_number+' berhasil check out.',
                            data: {
                                plat_number: req.body.plat_number,
                                vehicle: trx.vehicle,
                                checked_in: start,
                                checked_out: stop,
                                amount: payment
                            }
                        })
                    }
                    else res.status(400).json({ success: false, message: req.body.plat_number+' sudah check out !' })
                })
            }
        })
    },
    getCheckOutList: (req, res) => {
        let vehicle_id = typeof(req.query.vehicle_id) == 'undefined' ? '' : req.query.vehicle_id
        let date = typeof(req.query.date) == 'undefined' ? '' : req.query.date 
        let page = typeof(req.query.page) == 'undefined' ? '1' : req.query.page
        let size = typeof(req.query.size) == 'undefined' ? '10' : req.query.size
        //console.log('vehicle_id:'+vehicle_id+', date:'+date+', page:'+page+', size:'+size)
        trxDao.getCheckOutList(req.con, {vehicle_id: vehicle_id, date: date}, (err, rows) => {
            res.json(rows)
        })
    },
}