'use strict';

const db = require('./../lib/db.js');
const estic = require('./../lib/elasticClient.js');

const Product = {}

Product.findOne = async function (id) {
    //  db.query('select * from t_product where id = $1', [id], function (err, results) {
    //     if (results == null || results.length == 0) {
    //         err = Error('empty')
    //     }
    //     cb(err, results)
    // })
    var res = await db.query('select * from t_product where id = $1', [id])

    return res.rows
    //Mock Scripts
    // const product = {"id": 1, "username" : "test", "password" : "test"}
    // cb(null, product)

}

Product.findList = async function () {
    var res = await db.query('select * from t_product')
    return res.rows
}

Product.insert = async function (obj) {
    var res = await db.query('insert into t_product(name,description,price) values($1,$2,$3)', [obj.name,obj.description,obj.price])
    return res
}

Product.update = async function (obj) {
    var res = await db.query('update t_product set name=$1,description=$2,price=$3',[obj.name,obj.description,obj.price])
    return res
}

Product.delete = async function (id) {
    var res = await db.query('delete from t_product where id=?', [id])
    return res
}

Product.verify = async function(username, password) {

    //let product = await db.query('select * from t_product where email = ?', [username])

    LOG.warn(JSON.stringify({
        'username' : username,
        'password' : password
    }))

    //Mock Scripts
    let product = [{"id": 1, "username" : "test", "password" : "test"}]

    if(product == null || product.length != 1) {
        return null;
    } else{
        if((product[0].password == password) && (product[0].username == username)) {
            return product[0];
        } else {
            return null;
        }
    }
}

module.exports = Product;