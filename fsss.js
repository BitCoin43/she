const fs = require('fs')
const { Products } = require('./database')
const products = require('./database').Products

products.all((err, data) => {
    fs.copyFile('C:/host/sherst/templates/' + data[0].link.split('^')[0], 'C:/host/sherst/templates/img/file.png', (err) => {
        if(err) console.log(err)
    })
    if (err) console.log(err)
    for (let i = 0; i < data.length; i++) {
        const dir = `./templates/img/products/${data[i].id}/`
        var link = data[i].link.split('^')
        fs.readdir(`C:/host/sherst/templates/img/products/${data[i].id}/`, (err, files) => {
            if (err) console.log(err)
            var link = ""
            if (files.length != 0) {
                for (j in files) {
                    link += `/img/products/${data[i].id}/${files[j]}`
                    if (j != files.length - 1) {
                        link += '^'
                    }
                }
            }   else {
                link = '0'
            }
            console.log(link)
            var _data = {
                name: 'link',
                value: link,
                id: data[i].id
            }
            products.update(_data, (err) => {
                if (err) console.log(err)
                else {
                    console.log(`update link id:${data[i].id} new value:${link}!`)
                }
            })
        })
    }
})
