const XLSX = require('xlsx');
const Products = require('./database').Products 

const workbook = XLSX.utils.book_new();


Products.allOrders((err, data) => {
    if(err) console.log(err)

    console.log(data)
    const worksheet = XLSX.utils.json_to_sheet([
        data
    ]);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
    XLSX.writeFile(workbook, 'documents/заказы.xlsx');

})

