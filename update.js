const xlsx = require('xlsx')
const fs = require('fs')
const Products = require('./database').Products 
const workbook = xlsx.readFile('documents/товары.xlsx')
const sheetName = workbook.SheetNames[0]
const sheet = workbook.Sheets[sheetName]
const xlsxdata1 = xlsx.utils.sheet_to_json(sheet, {header: 1})

let xlsxdata = xlsxdata1.filter(subArray => subArray.length > 0);

Products.all((err, data) => {
    if(err) console.log(err)
    
    for (let id = 1; id < data.length + 1; id++){
        if(typeof(xlsxdata[id]) != 'undefined'){
            Products.update({
                name: "name", 
                value: xlsxdata[id][1].toLowerCase(), 
                id: String(id)
            }, 
            (err) => {
                if(err) console.log(err)
            })
            
            Products.update({
                name: "price", 
                value: xlsxdata[id][2], 
                id: String(id)
            }, 
            (err) => {
                if(err) console.log(err)
            })

            Products.update({
                name: "kategory", 
                value: xlsxdata[id][3], 
                id: String(id)
            }, 
            (err) => {
                if(err) console.log(err)
            })

            Products.update({
                name: "count", 
                value: xlsxdata[id][6], 
                id: String(id)
            }, 
            (err) => {
                if(err) console.log(err)
            })
            
            if(xlsxdata[id][4] != "0" && typeof(xlsxdata[id][4]) != 'undefined'){
                let path = 'templates/img/products/' + xlsxdata[id][3] + '/' + xlsxdata[id][4]
                fs.readdir(path, (err, files) => {
                    if (err) console.log(err)
                    else {
                        let resultpath = ""
                        for (let i = 0; i < files.length - 1; i++){
                            resultpath += "/img/products/" + xlsxdata[id][3] + '/' + xlsxdata[id][4] + '/' + files[i] + '^'
                        }
                        resultpath += "/img/products/"+ xlsxdata[id][3] + '/' + xlsxdata[id][4] + '/' + files[files.length - 1]
                        Products.update({
                            name: "link", 
                            value: resultpath, 
                            id: String(id)
                        }, 
                        (err) => {
                            if(err) console.log(err)
                        })

                    }
                })
            }
            if(xlsxdata[id][4] == "0"){
                Products.update({
                    name: "link", 
                    value: "0", 
                    id: String(id)
                }, 
                (err) => {
                    if(err) console.log(err)
                })
            }

            Products.update({
                name: "about", 
                value: xlsxdata[id][5], 
                id: String(id)
            }, 
            (err) => {
                if(err) console.log(err)
            })
        }
    }
    if(data.length != xlsxdata.length - 1){
        if (xlsxdata.length - 1 > data.length){
            for (let i = 1; i < xlsxdata.length - data.length; i++){
                Products.add({
                    name: xlsxdata[data.length + i][1], 
                    price: xlsxdata[data.length + i][2], 
                    link: xlsxdata[data.length + i][4], 
                    about: xlsxdata[data.length + i][5],
                    kategory: xlsxdata[data.length + i][3]
                }, 
                (err, data) => {
                    if(err) console.log(err)
                })
            }
        }
        else{
            for (let i = 0; i < data.length - xlsxdata.length + 1; i++){
                Products.delete(data.length - i, (err) => {
                    if(err) console.log(err)
                })
                console.log("deleted id:", data.length - i)
            }
        }
    }
    console.log('\x1b[32m' + 'successfully updated' + '\x1b[0m')
})