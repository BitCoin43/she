const db = require('./database').Products

let data = {
    name: "link",
    value: "/img/products/13/0.png^/img/products/13/1.png^/img/products/13/2.png",
    id: 13
}
db.update(data, (err) => {
    if (err) console.log(err)
    else console.log("nice")
})