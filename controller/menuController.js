'use strict';

const conn = require('../connection');

// mengambil menu berdasarkan roleId
exports.findByRoleId = function (req, res) {
    var menus = [];
    let sql = 'SELECT m.* FROM menu m LEFT JOIN authority_menu am ON am.menu_id = m.id WHERE am.authority_id='+req.params.id;
    
};