const sqlite3 = require('sqlite3').verbose()
const dbname = 'products.sqlite'
const db = new sqlite3.Database(dbname)

db.serialize(() => {
    let sql = `
        CREATE TABLE IF NOT EXISTS products_db
        (id INTEGER primary key, name TEXT, price INTEGER, link TEXT, about TEXT, count INTEGER)
    `
    db.run(sql)
    sql = `
        CREATE TABLE IF NOT EXISTS orders_db
        (id INTEGER primary key, name TEXT, sername TEXT, type TEXT, basket TEXT, adress TEXT, number TEXT)
    `
    db.run(sql)
})



class Products {
    static all(cb) {
        db.all('SELECT * FROM products_db', cb)
    }
    static find(id, cb) {
        db.get('SELECT * FROM products_db WHERE id = ?', id, cb)
    }
    static kategory(kategory, cb){
        db.all('SELECT * FROM products_db WHERE kategory = ?', kategory, cb)
    }
    static search(request, cb){
        db.all(`SELECT * FROM products_db WHERE lower(name) LIKE '%` + request + `%';`, cb)
    }
    static add(data, cb) {
        const sql = 'INSERT INTO products_db(NAME, PRICE, LINK, ABOUT, KATEGORY) VALUES (?, ?, ?, ?, ?)'
        db.run(sql, data.name, data.price, data.link, data.about, data.kategory, cb)
    }
    static delete(id, cb) {
        if(!id) return cb(new Error('not valid id'))
        db.run('DELETE FROM products_db WHERE id = ?', id, cb)
    }
    static update(data, cb) {
        const sql = `UPDATE products_db SET `+ data.name + 
        ` = '` + data.value + `' WHERE id = ` + data.id
        db.run(sql, cb)
    }
    static update(data, cb) {
        const sql = `UPDATE products_db SET `+ data.name + 
        ` = '` + data.value + `' WHERE id = ` + data.id
        db.run(sql, cb)
    }
    static all_update(data, cb) {
        const sql = `UPDATE products_db SET 
        name = '${data.name}',
        price = ${data.price},
        about = '${data.about}',
        kategory = '${data.kategory}',
        count = ${data.count}
        WHERE id = ${data.id}`
        db.run(sql, cb)
    }
    static newColumn(name, type, cb){
        const sql = `ALTER TABLE products_db ADD COLUMN ${name} ${type};`
        db.run(sql, cb)
    }
    static newOrder(data, cb) {
        const sql = 'INSERT INTO orders_db(NAME, SERNAME, TYPE, BASKET, ADRESS, NUMBER, CITY) VALUES (?, ?, ?, ?, ?, ?, ?)'
        db.run(sql, data.name, data.sername, data.type, data.basket, data.adress, data.number, data.city, cb)
    }
    static deleteOrder(id, cb) {
        if(!id) return cb(new Error('not valid id'))
        db.run('DELETE FROM orders_db WHERE id = ?', id, cb)
    }
    static allOrders(cb){
        db.all(`SELECT * FROM orders_db`, cb)
    }
}

module.exports = db
module.exports.Products = Products