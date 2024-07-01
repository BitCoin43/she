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

function getSumm(a){
    let n = String(Math.round(a * 100));
    return n.slice(0, -2) + ',' + n.slice(-2);
}

load_data('basketdata', JSON.stringify({type: localStorage.basket.split('&')[0]}), (xhr) => {
    let data = xhr.response;
    let sum = 0;
    let count = 0;

    baskettype = localStorage.basket.split('&')[0].split('*');
    basketcount = localStorage.basket.split('&')[1].split('*');

    for(let i = 0; i < data.length; i++){
        if(data[i] == null) continue;
        sum += data[i].price * Number(basketcount[i]);
        count += Number(basketcount[i]);
    }
    
    its.innerHTML = "итого к оплате: " + String(getSumm(sum));
    vst.innerHTML = "всего товаров: " + String(count);
})

