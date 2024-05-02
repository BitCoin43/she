const Products = require('./database').Products 
Products.delete(53, (err) => {
    if(err) console.log(err)
})