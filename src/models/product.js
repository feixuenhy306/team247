'use strict';

const db = require('./../lib/db.js');
const estic = require('./../lib/elasticClient.js');

const Product = {}

Product.findOne = async function (id) {
    let res = await db.query('select * from t_product where id = $1', [id])
    return res.rows
}

Product.findList = async function () {
    let res = await db.query('select * from t_product order by id asc')
    return res.rows
}

Product.insert = async function (obj) {
    let res = await db.query('insert into t_product(name,description,price) values($1,$2,$3)', [obj.name,obj.description,obj.price])
    return res
}

Product.update = async function (obj) {
    let res = await db.query('update t_product set name=$1,description=$2,price=$3 where id=$4',[obj.name,obj.description,obj.price,obj.id])
    return res
}

Product.delete = async function (id) {
    let res = await db.query('delete from t_product where id=$1', [id])
    return res
}

Product.search = async function (info) {
   let result = []
   let res = await estic.search({
        index: 'products',
        size: 20,
        body: {
            query: {
                match: {
                    name:{
                        query: info
                    }
                }
            }
        }
    })

    result.push(res.hits.hits[0]._source)
    return result
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