const Products = require('./database').Products 
Products.all((err, data) => {
    if(err) console.log(err)
    console.log(data)
})