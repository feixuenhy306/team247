'use strict';

const pg = require('pg');

var constring = "tcp://postgres:123456@localhost/postgres";

const db = new pg.Client(constring);

db.connect();

// var query = db.query('select * from t_product where id = $1', ["1"]);
// var res = [];
// query.on("row",function (row,result) {
//     result.addRow(row);
//     res.push(row);
// })
//
// query.on("end")


module.exports = db;
