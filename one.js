const Products = require('./database').Products 
Products.newColumn(2, 1, (err) => {
    if(err) console.log(err)
    console.log("seccess")
})