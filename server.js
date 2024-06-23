const fs = require('fs')
const express = require('express')
const Products = require('./database').Products
const useragent = require('express-useragent')
const xlsx = require('./cppModules/modul/build/Release/xlsx')
const multer = require('multer')
const TelegramBot = require('node-telegram-bot-api')


const PORT = 3000
const HOST = 'localhost'

const server = express()
server.use(express.static('templates'))
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

const telegramm_token = '6916655216:AAFChxqRoA7aNpuGvGoYsV11-_tCEwhjhT8'
const telegramm_chat = 925741117
const bot = new TelegramBot(telegramm_token, {
    polling: true
})
bot.on('polling_error', (err) => {
    if(err) console.log(err)
})

bot.on('text', async msg => {
    console.log(msg)
    //await bot.sendMessage(msg.chat.id, msg.text);

})

/*
server.post('/test', (res, req) => {
    bot.sendMessage(bot_chat_id, "нажал на exel");
})
*/
function filterData(data){
    let resdata = []
    let priority = []
    for (i of data){
        if(i.count != 0){
            resdata.push(i)
        }
    }
    resdata.sort((a, b) => {
        return b.priority - a.priority
    })
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

server.get('/oform', (req, res) => {
    let source = req.headers['user-agent']
    let ua = useragent.parse(source)
    if(ua.isMobile){
        res.sendFile(__dirname + '/templates/pages/mobile/oform.html')
    } else {
        res.sendFile(__dirname + '/templates/pages/desktop/oform.html')
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

server.post('/admindelete', (req, res) => {
    let id = req.body.id
    let photo = req.body.photo - 1

    Products.find(id, (err, data) => {
        if (err) console.log(err)
        else {
            let _link = data.link.split('^')
            if(photo < _link.length){
                let link = __dirname + '/templates'+  _link[photo]
                fs.unlink(link, (err) => {
                    if(err) console.log(err)
                    else{
                        fs.readdir(`${__dirname}/templates/img/products/${id}/`, (err, files) => {
                            if (err) console.log(err)
                            var link = ""
                            if (files.length != 0) {
                                for (i in files) {
                                    link += `/img/products/${id}/${files[i]}`
                                    if(i != files.length - 1) link += '^'
                                }
                            } else {
                                link = 0
                            }
                            var update_data = {
                                name: 'link',
                                value: link,
                                id: id
                            }
                            Products.update(update_data, (err) => {   
                                if(err) console.log(err)
                            })
                        })
                    }
                })
            }
        }
    })

    res.send('delete')
})

function has_duplicates(array) {
    return new Set(array).size !== array.length;
}

function get_directory(path){
    let arr = path.split('/')
    let name = ""
    for (let i = 0; i < arr.length - 1; i++){
        name += arr[i] + '/'
    }
    return name
}

var is_changing_now = false
server.post('/andminchange', (req, res) => {
    if(is_changing_now){
        res.send('not')
        return
    }
    is_changing_now = true
    let _data = req.body.data.split(',')
    let data = []
    for(i in _data){
        if(_data[i] != ''){
            data.push(Number(_data[i]) - 1)
        }
    }
    let id = req.body.id
    Products.find(id, (err, elem) => {
        if(err) {
            console.log(err)
            res.send('not')
        }
        else{   
            if(!has_duplicates(data) && !data.some((el) => {
                el > elem.link.split('^').length
            })){
                let firstname =  elem.link.split('^')
                let secondname1 = []
                let secondname2 = []
                for(i in firstname){
                    secondname1.push(`${get_directory(firstname[i])}hold${data[i]}.${firstname[i].split('.')[1]}`)
                    secondname2.push(`${get_directory(firstname[i])}${data[i]}.${firstname[i].split('.')[1]}`)
                }
                for(i in secondname1){
                    fs.renameSync(__dirname + '/templates/' + firstname[i], __dirname + '/templates/' + secondname1[i])
                }
                for(i in secondname1){
                    fs.renameSync(__dirname + '/templates/' + secondname1[i], __dirname + '/templates/' + secondname2[i])
                }
                fs.readdir(`${__dirname}/templates/img/products/${id}/`, (err, files) => {
                    if (err) console.log(err)
                    var link = ""
                    if (files.length != 0) {
                        for (i in files) {
                            link += `/img/products/${id}/${files[i]}`
                            if(i != files.length - 1) link += '^'
                        }
                    } else {
                        link = 0
                    }
                    var update_data = {
                        name: 'link',
                        value: link,
                        id: id
                    }
                    Products.update(update_data, (err) => {   
                        if(err) console.log(err)
                        is_changing_now = false
                        res.send('change')
                    })
                })
            }
        }
    })
})

server.get('/exeldownload', (req, res) => {
    Products.all((err, data) => {
        let name = "templates/files/Excel.xlsx"
        let doc = xlsx.newDocument(name)
        let sheet = doc.newSheet("товары")


        sheet.set("A1", "id")
        sheet.set("B1", "имя")
        sheet.set("C1", "цена")
        sheet.set("D1", "колличество")
        sheet.set("E1", "категория")
        sheet.set("F1", "приоритет")
    
        for(let i = 0; i < data.length; i++){
            sheet.set("A" + String(i + 2), data[i].id)
            sheet.set("B" + String(i + 2), data[i].name)
            sheet.set("C" + String(i + 2), data[i].price)
            sheet.set("D" + String(i + 2), data[i].count)
            sheet.set("E" + String(i + 2), data[i].kategory)
            sheet.set("F" + String(i + 2), data[i].priority)
        }
        doc.save()
        res.download("templates/files/Excel.xlsx")
    })
})



server.listen(PORT, () => {
    console.log('\x1b[32m' + `server is on: http://${HOST}:${PORT}` + '\x1b[0m')
})
