const db = require('./database').Products

db.allOrders((err, data) => {
    console.log(data)
})