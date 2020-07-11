'use strict'

const dao = require('../repository/fareRepository')

module.exports = {
    lists: (req, res) => {
        dao.getAll(req.con, (err, rows) => {
            res.json(rows)
        })
    },
    find: (req, res) => {
        dao.getById(req.con, req.params.id, (err, rows) => {
            res.json(rows[0])
        })
    },
    store: (req, res) => {
        let fare = req.body
        dao.store(req.con, fare, (err, rows) => {
            res.json({message: 'Tarif telah ditambahkan'})
        })
    },
    update: (req, res) => {
        let fare = req.body        
        dao.update(req.con, fare, (err, rows) => {
            res.json({message: 'Tarif telah diubah'})
        })
    },
    delete: (req, res) => {
        dao.delete(req.con, req.params.id, (err) => {
            res.json({message: 'Tarif telah dihapus'})
        })
    }
}