const db = require('./database').Products
var aspose = aspose || {}
aspose.cells = require("aspose.cells")


db.all((err, data) => {
    var workbook = new aspose.cells.Workbook()
    var ws = workbook.getWorksheets().get(0)
    var cells = ws.getCells()

    cells.get("A1").putValue("id")
    cells.get("B1").putValue("имя")
    cells.get("C1").putValue("цена")
    cells.get("D1").putValue("колличество")
    cells.get("E1").putValue("категория")
    cells.get("F1").putValue("приоритет")

    for(let i = 0; i < data.length; i++){
        cells.get("A" + String(i + 2)).putValue(data[i].id)
        cells.get("B" + String(i + 2)).putValue(data[i].name)
        cells.get("C" + String(i + 2)).putValue(data[i].price)
        cells.get("D" + String(i + 2)).putValue(data[i].count)
        cells.get("E" + String(i + 2)).putValue(data[i].kategory)
        cells.get("F" + String(i + 2)).putValue(data[i].priority)
    }
    workbook.save("templates/files/Excel.xlsx")
    
})
