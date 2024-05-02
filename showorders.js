const Products = require('./database').Products 

function getLine(text, size){
    let result = text
    for(let i = 0; i < size - String(text).length; i++){
        result += ` `
    }
    return result
}

function getName(name, size, period){
    let out = []
    let last = -1
    for(i in name){
        if(last == -1){
            out.push(name[i])
            last = 0
        } else {
            if(String(out[last]).length + String(name[i]).length < size){
                out[last] += ' ' + name[i]
            } else {
                last++
                out.push(name[i])
            }
        }
    }
    if(out.length <= period){
        let t = ''
        for(let i = 0; i < size; i++){
            t += ` `
        }
        return t
    } else {
        return getLine(out[period], size)
    }
}

function drawLine(){
    console.log('\x1b[36m%s\x1b[0m', 
    "  +------+--------------------+----------------" + 
    "------+------+----------------------------+--" +
    "--------------------------+---------------+----" + 
    "-----------------+")    
}

Products.allOrders((err, data) => {
    if(err) console.log(err)
    drawLine()
    process.stdout.write(
        '\x1b[36m' + "  | "+ '\x1b[32m' + " id " + 
        '\x1b[36m' + " | " + '\x1b[34m' + "       name       " +
        '\x1b[36m' + " | " + '\x1b[34m' + "       sername      " + 
        '\x1b[36m' + " | " + '\x1b[35m' + "type" + 
        '\x1b[36m' + " | " + '\x1b[33m' + "          basket          "  + 
        '\x1b[36m' + " | " + '\x1b[32m' + "          adress          "  + 
        '\x1b[36m' + " | " + '\x1b[31m' + "   number    "  + 
        '\x1b[36m' + " | " + '\x1b[34m' + "       city        "  + 
        '\x1b[36m' + " | \n"
    )
    drawLine()
    
    for(i of data){
        let id = getLine(i.id, 4)
        let name = getLine(i.name, 18)
        let sername = getLine(i.sername, 20)
        let type = getLine(i.type, 4)
        let basket = getLine(i.basket, 26)
        let adress = getLine(i.adress, 26)
        let number = getLine(i.number, 13)
        let city = getLine(i.city, 19)
        let text = ""
        process.stdout.write(
            '\x1b[36m' + "  | "+ '\x1b[32m' + id +                                  
            '\x1b[36m' + " | " + '\x1b[34m' + name   +               
            '\x1b[36m' + " | " + '\x1b[34m' + sername   +              
            '\x1b[36m' + " | " + '\x1b[35m' + type   +               
            '\x1b[36m' + " | " + '\x1b[33m' + basket   +     
            '\x1b[36m' + " | " + '\x1b[32m' + adress   +  
            '\x1b[36m' + " | " + '\x1b[31m' + number   +  
            '\x1b[36m' + " | " + '\x1b[34m' + city   +               
            '\x1b[36m' + " |\n"
        )
        
        drawLine()
    }
})