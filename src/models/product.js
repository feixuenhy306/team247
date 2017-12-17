'use strict';

const db = require('./../lib/db.js');
const estic = require('./../lib/elasticClient.js');

const Product = {}

Product.findOne = function (id, cb) {
    db.query('select * from t_product where id = ?', [id], function(err, results) {
        if(results == null || results.length == 0) {
            err = Error('empty')
        }
        cb(err, results)
    })

    //Mock Scripts
    // const product = {"id": 1, "username" : "test", "password" : "test"}
    // cb(null, product)

}

Product.findList = function (cb) {
    db.query('select * from t_product',function (err,results) {
        if(results == null || results.length == 0){
            err = Error('empty')
        }
        cb(err,results)
    })
}

Product.insert = function (obj,cb) {
    db.query('insert into t_product(name,description,price) values(?,?,?)', [obj.name,obj.description,obj.price], function(err, results) {
        console.log(err)
        if(results == null || results.length == 0) {
            err = Error('empty')
        }
        cb(err, results)
    })
}

Product.update = function (obj,cb) {
    db.query('update t_product set name=?,description=?,price=?', [obj.name,obj.description,obj.price], function(err, results) {
        if(results == null || results.length == 0) {
            err = Error('empty')
        }
        cb(err, results)
    })
}

Product.delete = function (id,cb) {
    db.query('delete from t_product where id=?', [id], function(err, results) {
        if(results == null || results.length == 0) {
            err = Error('empty')
        }
        cb(err, results)
    })
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