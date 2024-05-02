const fs = require('fs')
const express = require('express')
const Products = require('./database').Products
const useragent = require('express-useragent')
const xlsx = require('xlsx')
const multer = require('multer')


const PORT = 3000
const HOST = 'localhost'

const server = express()
server.use(express.static('templates'))
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

function filterData(data){
    let resdata = []
    for (i of data){
        if(i.count != 0){
            resdata.push(i)
        }
    }
    return resdata
}

server.get('/', (req, res) => {
    let source = req.headers['user-agent']
    let ua = useragent.parse(source)
    if(ua.isMobile){
        res.sendFile(__dirname + '/templates/pages/mobile/main.html')
    } else {
        res.sendFile(__dirname + '/templates/pages/desktop/main.html')
    }
})

server.get('/basket', (req, res) => {
    let source = req.headers['user-agent']
    let ua = useragent.parse(source)
    if(ua.isMobile){
        res.sendFile(__dirname + '/templates/pages/mobile/basket.html')
    } else {
        res.sendFile(__dirname + '/templates/pages/desktop/basket.html')
    }
})

server.get('/adsf69876s8dfsdafsd', (req, res) => {
    res.sendFile(__dirname + '/templates/admin/admin.html')
})

server.get('/oforml', (req, res) => {
    res.sendFile(__dirname + '/templates/pages/oforml.html')
})

server.get('/product/:id', (req, res) => {
    let source = req.headers['user-agent']
    let ua = useragent.parse(source)
    if(ua.isMobile){
        res.sendFile(__dirname + '/templates/pages/mobile/about.html')
    } else {
        res.sendFile(__dirname + '/templates/pages/desktop/about.html')
    }
})

server.get('/katalog', (req, res) => {
    let source = req.headers['user-agent']
    let ua = useragent.parse(source)
    if(ua.isMobile){
        res.sendFile(__dirname + '/templates/pages/mobile/katalog.html')
    } else {
        res.sendFile(__dirname + '/templates/pages/desktop/katalog.html')
    }
})

server.get('/kategory/:k', (req, res) => {
    let source = req.headers['user-agent']
    let ua = useragent.parse(source)
    if(ua.isMobile){
        res.sendFile(__dirname + '/templates/pages/mobile/kategory.html')
    } else {
        res.sendFile(__dirname + '/templates/pages/desktop/kategory.html')
    }
})

server.get('/test', (req, res) => {
    let source = req.headers['user-agent']
    let ua = useragent.parse(source)
    if(ua.isMobile){
        res.sendFile(__dirname + '/templates/pages/test/test_mobile.html')
    } else {
        res.sendFile(__dirname + '/templates/pages/test/test_desktop.html')
    }
    
})

server.get('/search', (req, res) => {
    res.sendFile(__dirname + '/templates/pages/search.html')
})

server.post('/product', (req, res) => {
    Products.find(req.body.id, (err, data) => {
        if(err) console.log(err)
        res.send(data)
    })
})

server.post('/kategory', (req, res) => {
    Products.kategory(req.body.kategory, (err, data) => {
        if(err) console.log(err)
        res.send(filterData(data))
        console.log("request")
    })
})

server.post('/search', (req, res) => {
    Products.search(req.body.request, (err, data) => {
        if(err) console.log(err)
        res.send(filterData(data))
    })
})

server.post('/main', (req, res) => {
    Products.all((err, data) => {
        if(err) console.log(err)
        res.send(filterData(data))
    })
})

server.post('/dasdjahskjdaks', (req, res) => {
    Products.all((err, data) => {
        if(err) console.log(err)
        res.send(data)
    })
})

server.post('/basketdata', (req, res) => {
    let alldata = []
    let reqestdata = req.body.type.split('*')
    for(let i = 0; i < reqestdata.length; i++){
        Products.find(reqestdata[i], (err, data) => {
            if(err) console.log(err)
            alldata.push(data)
            if(i == reqestdata.length - 1){
                res.send(alldata)
            }
        })
    }
})

server.post('/order', (req, res) => {
    let rdata = {
        name: req.body.name, 
        sername: req.body.sername, 
        type: req.body.type, 
        basket: req.body.basket, 
        adress: req.body.adress, 
        number: req.body.number,
        city: req.body.city
    }
    
    Products.newOrder(rdata , (err, data) => {
        if(err) console.log(err)
        res.send(data)
    })
})

server.post('/adminsave', (req, res) => {
    let data = {
        id: Number(req.body.id),
        name: req.body.name,
        price: Number(req.body.price),
        count: Number(req.body.count),
        kategory: req.body.kategory,
        about: req.body.about
    }
    Products.all_update(data, (err, _data) => {
        if(err) console.log(err)
        res.send({status: 1})
    })
})

server.post('/7fdshbvss7v87svhsd77vs', (req, res) => {
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
})

var upload_id = -1
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            const dir = `./templates/img/products/${upload_id}/`
            fs.exists(dir, exist => {
                if (!exist) {
                    return fs.mkdir(
                        dir,
                        { recursive: true },
                        error => cb(error, dir)
                    )
                }
                return cb(null, dir)
            })
        },
        filename: (req, file, cb) => {
            fs.readdir(`${__dirname}/templates/img/products/${upload_id}/`, (err, files) => {
                if (err) console.log(err)
                console.log(files.length)

                cb(null, `${files.length}.png`)
            })
        }
    }
)
const upload = multer(
    {
        storage: storage
    }
).array('files')

server.post('/adminloadid', (req, res) => {
    upload_id = req.body.id
    res.send('save')
})
server.post('/adminuploadimg', (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(500).json(err)
        } else if (err) {
            res.status(500).json(err)
        }
        fs.readdir(`${__dirname}/templates/img/products/${upload_id}/`, (err, files) => {
            if (err) console.log(err)
            var link = ""
            if (files.length != 0) {
                for (i in files) {
                    link += `/img/products/${upload_id}/${files[i]}`
                    if(i != files.length - 1) link += '^'
                }
            } else {
                link = 0
            }
            var update_data = {
                name: 'link',
                value: link,
                id: upload_id
            }
            Products.update(update_data, (err) => {
                upload_id = -1;
                res.send('seve')    
            })
        })
    })
})




server.listen(PORT, () => {
    console.log('\x1b[32m' + `server is on: http://${HOST}:${PORT}` + '\x1b[0m')
})
