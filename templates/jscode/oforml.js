let el = document.getElementById("end");
el.addEventListener("click", () => {
    let err = 0;
    for(let i = 1; i < 7; i++){
        let elem = document.getElementById("id" + i);
        let val = elem.value;
        if (val.length == 0){
            elem.style.borderColor = "red";
            err += 1;
        }else{
            elem.style.borderColor = "#303030";
        }
    }
    if(err == 0){
        let data = {
            name: id1.value,
            sname: id2.value,
            tel: id3.value,
            cit: id4.value,
            adr: id5.value,
            pin: id6.value,
            bas: localStorage.basket
        };
        load_data('oform', JSON.stringify(data), (data) => {
            document.getElementById("ursr").style.display = "block";
            localStorage.basket = "";
        })
    }
})

