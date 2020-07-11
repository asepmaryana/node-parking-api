'use strict';

const dao = require('../repository/userRepository')
const uuid = require('uuid')
const bcrypt = require('bcrypt');

module.exports = {
    lists: (req, res) => {
        dao.getAll(req.con, (err, rows) => {
            res.json(rows)
        })
    },
    find: (req, res) => {

    },
    store: (req, res) => {
        let user = req.body
        user.id = uuid.v4()
        user.password = bcrypt.hashSync(user.password, 10)
        dao.create(req.con, user, (err, rows) => {
            res.json({ message: 'User telah berhasil dibuat '})
        })
    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
}