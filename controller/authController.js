'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dao = require('../repository/userRepository');
const auth = require('../helper/authHelper');
module.exports = {
    login: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        if (username == null) res.status(401).json({username: 'username harus diisi'})
        else if (password == null) res.status(401).json({password: 'password harus diisi'})
        else {
            dao.getUsername(req.con, username, (err, rows, fields) => {
                if(rows.length == 0) 
                    res.status(401).json({"message":"Username tidak ditemukan !", "token":null})
                else if(!bcrypt.compareSync(password, rows[0].password))
                    res.status(401).json({"message":"Password anda salah !", "token":null})
                else {
                    // create token
                    let token = jwt.sign({id:rows[0].id, role: rows[0].role}, process.env.JWT_SECRET, {expiresIn: '7d'})
                    delete rows[0].password
                    res.json({"message":"Login berhasil.", "token":token, "user":rows[0]});
                }
            })
        }
    },
    info: (req, res) => {
        console.log('authHeader: ');
        const info = auth.getInfo(req);
        console.log(info);
        res.json(info);        
    }
}
