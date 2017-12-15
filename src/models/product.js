'use strict';

import db from '../lib/db';

const Product = {}
const LOG = log4js.getLogger('file');

Product.findOne = function (id, cb) {
    // db.queryAsync('select * from t_product where id = ?', [id], function(err, results) {
    //     if(results == null || results.length == 0) {
    //         err = Error('empty')
    //     }
    //     cb(err, results[0])
    // })

    //Mock Scripts
    const product = {"id": 1, "username" : "test", "password" : "test"}
    cb(null, product)

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

export default Product;