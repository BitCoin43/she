const Products = require('./database').Products 
const readline = require('readline')
let name, value, id

console.log('name: ')
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>>>'
})
rl.prompt();
rl.on('line', (input) => {
    
    name = input
    rl.close()
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>>>'
    })
    
    console.log('value: ')
    rl.prompt()
    rl.on('line', (input) => {
        
        value = input
        rl.close()
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '>>>'
        })

        console.log('id: ')
        rl.prompt();
        rl.on('line', (input) => {
            
            id = input
            rl.close()
            Products.update({
                name: name, 
                value: value, 
                id: id
            }, 
            (err) => {
                if(err) console.log(err)
            })
        })
    })
})