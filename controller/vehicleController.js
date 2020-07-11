'use strict';

const dao = require('../repository/vehicleRepository');

module.exports = {
    lists: (req, res) => {
        dao.getAll(req.con, (err, rows) => {
            res.json(rows);
        });
    },

    find: (req, res) => {
        dao.getById(req.con, req.params.id, (err, row) => {
            if (err) res.status(500).json({"message":"terdapat kesalahan: "+err});
            else if(row[0] == null) res.status(404).json({"message":"kendaraan tidak ditemukan"});
            else res.json(row[0]);
        });
    }
}

/*
// untuk mengambil data semua kendaraan
exports.findVehicles = function (req, res) {

    let sql = 'SELECT * FROM vehicle ORDER BY id';
    let query = conn.query(sql, (err, result) => {
        if (err) res.json({"success":false, "message":"error reading vehicle", "data":null});
        else res.json({"success":true, "message":"", "data":result});
    });
};

// untuk mengambil data kendaraan dengan id
exports.findById = function (req, res) {
    let sql = 'SELECT * FROM vehicle WHERE id = '+req.params.id;
    let query = conn.query(sql, (err, result) => {
        if (err) res.json({"success":false, "message":"error reading vehicle id "+id, "data":null});
        else res.json({"success":true, "message":"", "data":result[0]});
    });
};
*/