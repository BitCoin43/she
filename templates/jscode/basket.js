let baskettype = [];
let basketcount = [];
let basketprice = [];
let typeorder = "";
if(typeof localStorage.basket != "undefined" && localStorage.basket != ''){
    baskettype = localStorage.basket.split('&')[0].split('*');
    basketcount = localStorage.basket.split('&')[1].split('*');
}
let t = ``;
if(baskettype.length == 0){
    sp.style.display = "block";
    rs.style.display = "none";
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
    if(baskettype[i] == "undefined"){
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
    }
    basketline.outerHTML = t;
    document.getElementById('rsum').innerHTML = `общая сумма: ` + sum + ` ₽`;
    rcount.innerHTML = `всего товаров: ` + count;
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

sdek.onclick = () => {
    sdek.style.borderColor = "#099f";
    prus.style.borderColor = "#afafaf";
    sdekof.style.display = "block";
    prusof.style.display = "none";
    typeorder = "sdek";
};

prus.onclick = () => {
    prus.style.borderColor = "#099f";
    sdek.style.borderColor = "#afafaf";
    sdekof.style.display = "none";
    prusof.style.display = "block";
    typeorder = "prus";
};

document.getElementById('endb1').onclick = () => {
    let err = 0;
    if(document.getElementById('inp1').value == ''){
        document.getElementById('inp1').style.borderColor = "#ff0000";
        err += 1;
    } else {
        document.getElementById('inp1').style.borderColor = "#909090";
    }
    if(document.getElementById('inp2').value == '') {
        document.getElementById('inp2').style.borderColor = "#ff0000";
        err += 1;
    }else {
        document.getElementById('inp2').style.borderColor = "#909090";
    }
    if(document.getElementById('inp3').value == '') {
        document.getElementById('inp3').style.borderColor = "#ff0000";
        err += 1;
    }else {
        document.getElementById('inp3').style.borderColor = "#909090";
    }
    if(document.getElementById('inp4').value == '') {
        document.getElementById('inp4').style.borderColor = "#ff0000";
        err += 1;
    }else {
        document.getElementById('inp4').style.borderColor = "#909090";
    }
    if(document.getElementById('inp5').value == '') {
        document.getElementById('inp5').style.borderColor = "#ff0000";
        err += 1;
    }else {
        document.getElementById('inp5').style.borderColor = "#909090";
    }
    if (err == 0){
        let rdata = {
        name:    document.getElementById('inp1').value, 
        sername: document.getElementById('inp2').value, 
        type:    typeorder, 
        basket:  localStorage.basket, 
        adress:  document.getElementById('inp3').value, 
        number:  document.getElementById('inp4').value,
        city: document.getElementById('inp5').value
        }
        let xhr2 = new XMLHttpRequest();
        xhr2.open('POST', 'http://192.168.1.74:5000/order');
        xhr2.responseType = 'json';
        xhr2.setRequestHeader('Content-Type', 'application/json');
        xhr2.onload = () => {
            end.style.display = "block";
        }
        xhr2.send(JSON.stringify(rdata));
    }
};

document.getElementById('endb2').onclick = () => {
    let err = 0;
    if(document.getElementById('inp12').value == ''){
        document.getElementById('inp12').style.borderColor = "#ff0000";
        err += 1;
    } else {
        document.getElementById('inp12').style.borderColor = "#909090";
    }
    if(document.getElementById('inp22').value == '') {
        document.getElementById('inp22').style.borderColor = "#ff0000";
        err += 1;
    }else {
        document.getElementById('inp22').style.borderColor = "#909090";
    }
    if(document.getElementById('inp32').value == '') {
        document.getElementById('inp32').style.borderColor = "#ff0000";
        err += 1;
    }else {
        document.getElementById('inp32').style.borderColor = "#909090";
    }
    if(document.getElementById('inp42').value == '') {
        document.getElementById('inp42').style.borderColor = "#ff0000";
        err += 1;
    }else {
        document.getElementById('inp42').style.borderColor = "#909090";
    }
    if(document.getElementById('inp52').value == '') {
        document.getElementById('inp52').style.borderColor = "#ff0000";
        err += 1;
    }else {
        document.getElementById('inp52').style.borderColor = "#909090";
    }
    if(document.getElementById('inp62').value == '') {
        document.getElementById('inp62').style.borderColor = "#ff0000";
        err += 1;
    }else {
        document.getElementById('inp62').style.borderColor = "#909090";
    }
    if(err == 0){
        let rdata = {
            name:    document.getElementById('inp12').value, 
            sername: document.getElementById('inp22').value, 
            type:    typeorder, 
            basket:  localStorage.basket, 
            adress:  document.getElementById('inp32').value + "^" + 
                document.getElementById('inp52').value, 
            number:  document.getElementById('inp42').value,
            city: document.getElementById('inp62').value
        }
        let xhr3 = new XMLHttpRequest();
        xhr3.open('POST', 'http://192.168.1.74:5000/order');
        xhr3.responseType = 'json';
        xhr3.setRequestHeader('Content-Type', 'application/json');
        xhr3.onload = () => {
            end.style.display = "block";
        }
        xhr3.send(JSON.stringify(rdata));
    }
};

x.onclick = () => {
    end.style.display = "none";
}