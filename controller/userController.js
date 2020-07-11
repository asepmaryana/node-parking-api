'use strict';

const dao = require('../repository/userRepository')

module.exports = {
    lists: (req, res) => {
        dao.getAll(req.con, (err, rows) => {
            res.json(rows)
        })
    },
    find: (req, res) => {

    },
    store: (req, res) => {

    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
}