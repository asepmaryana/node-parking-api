require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('./helper/jwt')
const errorHandler = require('./helper/error-handler')
const conn = require('./connection')

app.use((req, res, next) => {
    req.con = conn;
    next();
});

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(jwt())
app.use(errorHandler)

const routes = require('./routes');
routes(app);

/*
// authentikasi login
app.post('/api/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    password = crypto.createHash('md5').update(password).digest('hex');
    console.log('username='+username+', password='+password+', encrypted='+crypto.createHash('md5').update(password).digest('hex'));
    conn.query('SELECT * FROM users WHERE username=? AND password=?',
        [username, password], (error, rows, fields) => {
            console.log(rows[0]);
            if(rows.length == 0) res.json({"success":false, "message":"username atau password salah !", "data":null});
            else res.json({"success":true, "message":"login berhasil !", "data":rows[0]});
        });
});
*/

const port = process.env.APP_PORT || 3000
// server listening
app.listen(port, () => {
    console.log(`Server started on port ${port} ...`);
});
