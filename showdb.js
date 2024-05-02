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
function getLink(name, size, period){
    let out = []
    let last = -1
    for(i in name){
        if(last == -1){
            out.push(name[i])
            last = 0
        } else {
            if(String(out[last]).length + String(name[i]).length < size){
                out[last] += '/' + name[i]
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

Products.all((err, data) => {
    if(err) console.log(err)
    console.log('\x1b[36m%s\x1b[0m', "  +------+---------------------+------------------------+---------------------------------------+----------+-------+")
    process.stdout.write(
        '\x1b[36m' + "  | "+ '\x1b[32m' + " id "                                  + 
        '\x1b[36m' + " | " + '\x1b[34m' + "        name       "                   +
        '\x1b[36m' + " | " + '\x1b[31m' + "         link         "                + 
        '\x1b[36m' + " | " + '\x1b[35m' + "                about                " + 
        '\x1b[36m' + " | " + '\x1b[33m' + "kategory"                      + 
        '\x1b[36m' + " | " + '\x1b[32m' + "price"                      + 
        '\x1b[36m' + " | \n"
    )
    console.log('\x1b[36m%s\x1b[0m', "  +------+---------------------+------------------------+---------------------------------------+----------+-------+")
    let text = ""
    for(i of data){
        let id = i.id
        let name = i.name.split(' ')
        let about = i.about.split('&')
        let linc = i.link.split('/')
        let kategory = i.kategory
        let pri = i.price

        let k = 0;
        let j = 0;
        let r = 0;
        let c = getLine(kategory, 8)
        let id2 = getLine(id, 4)
        let pr = getLine(pri, 5)
        
        while(true){
            if(j >= about.length) break
            let n = getName(name, 19, k)
            let l =  getLink(linc, 22, k)
            let a =  getName(about[j].split(' '), 37, r)
            
            let t = ''
            for(let i = 0; i < 19 + 22 + 37; i++){
                t += ` `
            }
            if(a == "                                     "){
                j++
                if(j < about.length){
                    r = 0
                    a =  getName(about[j].split(' '), 37, r)
                }
            }
            if(n + l + a == t){
                break
            } else {
                
                process.stdout.write(
                    '\x1b[36m' + "  | "+ '\x1b[32m' + id2 +                                  
                    '\x1b[36m' + " | " + '\x1b[34m' + n   +               
                    '\x1b[36m' + " | " + '\x1b[31m' + l   +              
                    '\x1b[36m' + " | " + '\x1b[35m' + a   +               
                    '\x1b[36m' + " | " + '\x1b[33m' + c   +                  
                    '\x1b[36m' + " | " + '\x1b[32m' + pr  +    
                    '\x1b[36m' + " |\n"
                )
                k++
                r++
                id2 = getLine("", 4)
                c = getLine("", 8)
                pr = getLine("", 5)
            }
        }
        console.log('\x1b[36m%s\x1b[0m', "  +------+---------------------+------------------------+---------------------------------------+----------+-------+")
    }
})