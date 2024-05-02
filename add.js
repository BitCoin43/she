const Products = require('./database').Products 
const readline = require('readline')
let name, price, link, about, kategory
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>>>'
})
console.log('name: ')
rl.prompt();
rl.on('line', (input) => {
    name = input
    rl.close()
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>>>'
    })
    
    console.log('price: ')
    rl.prompt()
    rl.on('line', (input) => {
        input = input.toLowerCase()
        price = input
        rl.close()
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '>>>'
        })

        console.log('link: ')
        rl.prompt();
        rl.on('line', (input) => {
            link = input
            rl.close()
            rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                prompt: '>>>'
            })

            console.log('about: ')
            rl.prompt();
            rl.on('line', (input) => {
                about = input
                rl.close()
                rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    prompt: '>>>'
                })
                console.log('kategory: ')
                rl.prompt();
                rl.on('line', (input) => {
                    input = input.toLowerCase()
                    kategory = input
                    rl.close()

                    Products.add({
                        name: name, 
                        price: price, 
                        link: link, 
                        about: about,
                        kategory: kategory
                    }, 
                        (err, data) => {
                            if(err) console.log(err)
                            console.log('\x1b[32m' + 'seccess' + '\x1b[0m')
                    })
                })
            })
            
        })
    })
})


