let baskettype = [];
let basketcount = [];
let basketprice = [];
if(typeof localStorage.basket != "undefined" && localStorage.basket != ''){
    baskettype = localStorage.basket.split('&')[0].split('*');
    basketcount = localStorage.basket.split('&')[1].split('*');
}
let t = ``;
if(baskettype.length == 0){
    sp.style.display = "block";
}
function update_basket(){
    let type = "";
    for(let i = 0; i < baskettype.length - 1; i++){
        let string = String(baskettype[i]) + '*';
        type += string;
    }
    type += String(baskettype[baskettype.length - 1]);
    let count = ""
    for(let i = 0; i < baskettype.length - 1; i++){
        let string = String(basketcount[i]) + '*';
        count += string;
    }
    count += String(basketcount[basketcount.length - 1]);
    let str = '';
    if(type == "undefined" || count == "undefined"){
        localStorage.setItem('basket', '');
    } else {
        str = type + '&' + count;
    }
    localStorage.setItem('basket', str);
    if(baskettype.length == 0){
        sp.style.display = "block";
    }
    let sum = 0;
    let all = 0;
    for(i in baskettype){
        let c = basketcount[i];
        all += Number(c);
        sum += c * basketprice[i];
    }
    document.getElementById('rsum').innerHTML = `общая сумма: ` + sum + ` ₽`;
    rcount.innerHTML = "всего товаров: " + all;
}

for(i in baskettype){
    if(typeof baskettype[i] == "undefined"){
        baskettype.splice(i,1);
        basketcount.splice(i,1);
        update_basket();
    }
}

load_data('basketdata', JSON.stringify({type: localStorage.basket.split('&')[0]}), (xhr) => {
    let sum = 0;
    let count = 0;
    console.log(xhr.response);
    for(let i = 0; i < xhr.response.length; i++){
        let imgarr = xhr.response[i].link.split('^');
        t += `
        <div class="product" id="ml` + i + `">
            <img class="productimg" src="` + imgarr[0] + `">
            <div class="abnameapm">
                <div class="name">
                ` + xhr.response[i].name + `
                </div>
                <div class="price">` + xhr.response[i].price + ` ₽
                </div>
                <div class="plmn">
                    <div class="delete" id="d` + i + `">удалить</div>
                    <div class="pmpl">
                        <div class="mbutton" id="m` + i + `">-</div>
                        <div class="count" id="c` + i + `">` + basketcount[i] + `</div>
                        <div class="pbutton" id="p` + i + `">+</div>
                    </div>
                </div>
            </div>
        </div>`;
        sum += xhr.response[i].price * basketcount[i];
        basketprice[i] = xhr.response[i].price;
        count += Number(basketcount[i]);
    }
    line.outerHTML = t;
    document.getElementById('its').innerHTML = `общая сумма: ` + sum + ` ₽`;
    vst.innerHTML = `всего товаров: ` + count;
    update_basket();
    for(let i = 0; i < xhr.response.length; i++){
        document.getElementById('d' + String(i)).onclick = () => {
            baskettype.splice(i,1);
            basketcount.splice(i,1);
            document.getElementById('ml' + String(i)).style.display="none";
            update_basket();
        }
        document.getElementById('m' + String(i)).onclick = () => {
            let count = basketcount[i];
            if (count != 1){
                basketcount[i] -= 1;
                document.getElementById('c' + String(i)).innerHTML = count - 1;
                update_basket();
            }
            
        }
        document.getElementById('p' + String(i)).onclick = () => {
            let count = Number(basketcount[i]);
            basketcount[i] = count + 1;
            document.getElementById('c' + String(i)).innerHTML = basketcount[i];
            update_basket();

        }
    }
})

let el = document.getElementById("endform");
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
            document.getElementById("end").style.display = "block";
            localStorage.basket = "";
        })
    }
})