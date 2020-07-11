'use strict'

const dao = require('../repository/roleRepository')

module.exports = {
    getRoles: (req, res) => {
        dao.getAll(req.con, (err, rows) => {
            res.json(rows)
        })
    }
}