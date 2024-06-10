let c = 1;
let g = location.href.split("/")
let h = g[g.length - 1]
let baskettype = [];
let basketcount = [];
let maxcount;
if(typeof localStorage.basket != "undefined" && localStorage.basket != ''){
    baskettype = localStorage.basket.split('&')[0].split('*');
    basketcount = localStorage.basket.split('&')[1].split('*');
}

function update_count(){
    count.innerHTML = c;
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
    let str = type + '&' + count;
    localStorage.setItem('basket', str);
}
function update_count_in_basket(){
    for(let i = 0; i < baskettype.length; i++){
        if(h == baskettype[i]) {
            basketcount[i] = String(c);
            update_basket();
        }
    }
}

bascetbuton.onclick = () => {
    bascetbuton.style.display="none";
    deleteplace.style.display="block";
    baskettype.push(h);
    basketcount.push(1);
    update_basket();
};
deletebutton.onclick = () => {
    deleteplace.style.display="none";
    bascetbuton.style.display="block";
    c = 1;
    update_count();
    for(let i = 0; i < baskettype.length; i++){
        if(h == baskettype[i]) {
            baskettype.splice(i,1);
            basketcount.splice(i,1);
            update_basket();
        }
    }
};
minus.onclick = () => {
    if(c != 1){
        c--;
        update_count();
        update_count_in_basket();
    }
};
plus.onclick = () => {
    if(c < maxcount){
        c++;
        update_count();
        update_count_in_basket();
    }
};
function isinbasket(){
    for(let i = 0; i < baskettype.length; i++){
        if(h == baskettype[i]) return true;
    }
}
if(isinbasket()){
    bascetbuton.style.display="none";
    deleteplace.style.display="block";
    for(let i = 0; i < baskettype.length; i++){
        if(h == baskettype[i]) {
            c = basketcount[i];
            update_count();
        }
    }
}

let imgarr = [];
let pointer = 0;

load_data('product', JSON.stringify({id: h}), (xhr) => {
    console.log(xhr.response);
    namep.innerHTML = xhr.response.name;
    t = `<div class="name2" id="name2">`;
    data = xhr.response.about.split('&');
    for(let i = 0; i < data.length; i++){
        t += `<p class="nameabout">` + data[i] + `</p>`;
    }
    t += `</div>`;
    name2.outerHTML = t;
    bascetbuton.innerHTML = 'в корзину ' + xhr.response.price + '₽';
    lastcount.innerHTML = 'осталось ' + xhr.response.count + 'шт';
    maxcount = xhr.response.count;

    imgarr = xhr.response.link.split('^');
    let wid = 4.5 * imgarr.length - 1.5;
    wid = String(wid) + "vw";
    let g = `<div class="scrollbox" id="scrollgg">`;
    for(let i = 0; i < imgarr.length; i++){
        g += `<div class="scrollpoint" id="scr` + i + `"></div>`
    }
    g += `</div>`
    scrollgg.outerHTML = g;
    scrollgg.style.width = wid;
    document.getElementById("scr0").style.backgroundColor = "#099f";
    mainimg.outerHTML = `<img src="` + imgarr[pointer] + `"class="mainimg" id="mainimg">`;
})

var element = document.getElementById("mimgh");

var startX = 0;
var startY = 0;
var isSwiping = false;

element.addEventListener("touchstart", function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    isSwiping = true;  
});

element.addEventListener("touchmove", function(event) {
    var diffX = event.touches[0].clientX - startX;
    var diffY = event.touches[0].clientY - startY;
    var isScrollingVertically = Math.abs(diffY) > Math.abs(diffX);
    if (isScrollingVertically) {
      isSwiping = false;
      return;
    }
    if (isSwiping) {
      event.preventDefault();
    }
});

element.addEventListener("touchend", function(event) {
  var endX = event.changedTouches[0].clientX;
  var endY = event.changedTouches[0].clientY;
  var diffX = endX - startX;
  var diffY = endY - startY;
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
        if(pointer != 0){
            document.getElementById("scr" + String(pointer)).style.backgroundColor = "#afafaf";
            pointer--;
            document.getElementById("scr" + String(pointer)).style.backgroundColor = "#099f";
            mainimg.outerHTML = `<img src="` + imgarr[pointer] + `"class="mainimg" id="mainimg">`;
        }
    } else {
        if(pointer < imgarr.length - 1){
            document.getElementById("scr" + String(pointer)).style.backgroundColor = "#afafaf";
            pointer++;
            document.getElementById("scr" + String(pointer)).style.backgroundColor = "#099f";
            mainimg.outerHTML = `<img src="` + imgarr[pointer] + `"class="mainimg" id="mainimg">`;
        }
    }
  } 
});

mainimg.touchstart = () => {
    alert('scroll');

}