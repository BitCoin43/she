let baskettype = [];
let basketcount = [];
let basketprice = [];
let basketmax = [];
let typeorder = "";
if(typeof localStorage.basket != "undefined" && localStorage.basket != ''){
    baskettype = localStorage.basket.split('&')[0].split('*');
    basketcount = localStorage.basket.split('&')[1].split('*');
    basketmax = Array(basketcount.length);
    for(i in basketcount){
        basketmax[i] = 0;
    }
}
let t = ``;
if(baskettype.length == 0){
    sp.style.display = "block";
    rs.style.display = "none";
}
function getSumm(a){
    let n = String(Math.round(a * 100));
    return n.slice(0, -2) + ',' + n.slice(-2);
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
    document.getElementById('rsum').innerHTML = `общая сумма: ` + getSumm(sum) + ` ₽`;
    rcount.innerHTML = "всего товаров: " + all;
    if(baskettype.length == 0){
        of.style.display = "none";
        rsum.style.display = "none";
        rcount.style.display = "none";
    }else{
        console.log("dasdasd")
        document.getElementById("of").style.display = "block";
        rsum.style.display = "block";
        rcount.style.display = "block";
    }
}

for(i in baskettype){
    if(baskettype[i] == "undefined"){
        baskettype.splice(i,1);
        basketcount.splice(i,1);
        update_basket();
    }
}

load_data('basketdata', JSON.stringify({type: localStorage.basket.split('&')[0]}), (xhr) => {
    let sum = 0;
    let count = 0;
    for(let i = 0; i < xhr.response.length; i++){
        if(xhr.response[i] == null) continue;
        let imgarr = xhr.response[i].link.split('^');
        t += 
        `<div class="mainline" id="ml` + i + `">
            <div class="firstline">
                <div class="tovarwrapper">
                    <img class="imgicon" src="` + imgarr[0] + `" id="im">
                </div>
                <div class="about">
                    <div class="name">` + xhr.response[i].name + `</div>
                    <div class="price">` + xhr.response[i].price + ` ₽</div>
                </div>
            </div>
            <div class="plusminus">
                <div class="delete" id="d` + i + `">
                    удалить
                </div>
                <div class="change">
                    <div class="plus" id="m` + i + `">-</div>
                    <div class="count" id="c` + i + `">` + basketcount[i] + `</div>
                    <div class="plus" id="p` + i + `">+</div>
                </div>
            </div>
        </div>`;
        sum += xhr.response[i].price * basketcount[i];
        basketprice[i] = xhr.response[i].price;
        count += Number(basketcount[i]);
        basketmax[i] = xhr.response[i].count;
    }
    basketline.outerHTML = t;
    document.getElementById('rsum').innerHTML = `общая сумма: ` + sum + ` ₽`;
    rcount.innerHTML = `всего товаров: ` + count;
    update_basket();
    for(let i = 0; i < xhr.response.length; i++){
        if(xhr.response[i] == null) continue;
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
            if(basketmax[i] != count){
                basketcount[i] = count + 1;
                document.getElementById('c' + String(i)).innerHTML = basketcount[i];
                update_basket();
            }

        }
    }
})