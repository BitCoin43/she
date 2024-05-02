const Products = require('./database').Products 
const readline = require('readline')
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>>>'
})
console.log('id: ')
rl.prompt();
rl.on('line', (input) => {
    if(input == "all"){
        Products.allOrders((err, data) => {
            if(err) console.log(err)
            let error = 0
            for(i of data){
                Products.deleteOrder(i.id, (err, data) => {
                    if(err) {
                        console.log(err)
                        error += 1
                    }
                })
            }
            if(error == 0) process.stdout.write('\x1b[32m' + 'seccessfully deleted ' + data.length + ' orders' + '\x1b[0m')
        })
    } else {
        let text = input.split(', ')
        let error = 0
        for(i of text){
            Products.deleteOrder(i, (err, data) => {
                if(err) {
                    console.log(err)
                    error += 1
                }
            })
        }
        if(error == 0) process.stdout.write('\x1b[32m' + 'seccess' + '\x1b[0m')
    }
    rl.close()
})