function rotate_left() {
    editblock.style.left = "0vw";
    productsblock.style.left = "100vw";
}
function rotate_right() {
    editblock.style.left = "-100vw";
    productsblock.style.left = "0vw";
}

var main_data;
var actual_id;
var actual_index;
function set_edit_img(index) {
    let t = ``;
    let img_m = main_data[index].link.split('^');

    for (let i = 0; i < Math.ceil(img_m.length / 3); i++) {
        let nsize = img_m.length - i * 3;
        if (nsize > 2) {
            t +=
                ` <div class="editimgline">
                <div class="editimgholder" style="float:left" onclick=vie_img(${index},${i * 3})>
                <img class="editimg" src="${img_m[i * 3]}"><div class="editimgnumber">${i * 3 + 1}</div></div>
                <div class="editimgholder" style="float:right" onclick=vie_img(${index},${i * 3 + 2})>
                <img class="editimg" src="${img_m[i * 3 + 2]}"><div class="editimgnumber">${i * 3 + 3}</div></div>
                <div class="editimgholder" style="margin:auto" onclick=vie_img(${index},${i * 3 + 1})>
                <img class="editimg" src="${img_m[i * 3 + 1]}"><div class="editimgnumber">${i * 3 + 2}</div></div>
            </div>`
        }
        else if (nsize == 2) {
            t +=
                ` <div class="editimgline">
                <div class="editimgholder" style="float:left" onclick=vie_img(${index},${i * 3})>
                <img class="editimg" src="${img_m[i * 3]}"><div class="editimgnumber">${i * 3 + 1}</div></div>
                <div class="editimgholder" style="margin:auto" onclick=vie_img(${index},${i * 3 + 1})>
                <img class="editimg" src="${img_m[i * 3 + 1]}"><div class="editimgnumber">${i * 3 + 2}</div></div>
            </div>`
        }
        else if (nsize == 1) {
            t +=
                ` <div class="editimgline">
                <div class="editimgholder" style="float:left" onclick=vie_img(${index},${i * 3})>
                <img class="editimg" src="${img_m[i * 3]}"><div class="editimgnumber">${i * 3 + 1}</div></div>
            </div>`
        }
    }

    editimgblock.innerHTML = t;
}
function set_edit(index){
    rotate_left()
    inputname.value = main_data[index].name;
    inputprice.value = main_data[index].price;
    inputcount.value = main_data[index].count;
    inputkategory.value = main_data[index].kategory;
    edit_id = main_data[index].id;
    actual_id = main_data[index].id;
    actual_index = index;
    let text = "";
    let __text = main_data[index].about.split('&');
    for(i in __text){
        text += __text[i];
        if(i != __text.length - 1){
            text += '\n';
        }
    }
    editabout.value = text;
    set_edit_img(index);
}
function update_data(cb, cb_data) {
    load_data('dasdjahskjdaks', '', (xhr) => {
        main_data = xhr.response;
        let t = ``;
        for (i in xhr.response) {
            let imgarr = [];
            imgarr = xhr.response[i].link.split('^');
            t +=
                `<div class="productline" id="pr${xhr.response[i].id}" onclick=set_edit(${i})>
            <div class="id">${xhr.response[i].id}</div>
            <div class="liney"></div>
            <div class="logoimg"><img class="lim" src="${imgarr[0]}"></div>                
            <div class="liney"></div>
            <div class="name">${xhr.response[i].name}</div>
            <div class="liney"></div>
            <div class="countimg">${imgarr.length}</div>
            <div class="liney"></div>
            <p class="about">${xhr.response[i].about}</p>
            <div class="liney"></div>
            <div class="kategory">${xhr.response[i].kategory}</div>
            <div class="liney"></div>
            <div class="price">${xhr.response[i].price}₽</div>                
            <div class="liney"></div>
            <div class="count">${xhr.response[i].count}</div>
            </div>`;
        }
        line.innerHTML = t;
        cb(cb_data)
    })
}
update_data(() => { }, 0);



var img_id, img_point;
var img_isopen = false;
function vie_img(ind, id) {
    img_id = ind;
    img_point = id;
    img_isopen = true;
    let img_r = main_data[ind].link.split('^');
    vieimg.innerHTML = `<img src="${img_r[id]}" class="editvieimgimg">`;
    editvie.style.display = "block";
}
editleft.onclick = () => {
    let img_r = main_data[img_id].link.split('^');
    if (img_point != 0) {
        vie_img(img_id, img_point - 1);
    }
}
editright.onclick = () => {
    let img_r = main_data[img_id].link.split('^');
    if (img_point != img_r.length - 1) {
        vie_img(img_id, img_point + 1);
    }
}


backback.onclick = () => {
    rotate_right()
}

var products_scroll = 0;
productsblock.onwheel = (event) => {
    var transition = productsblock.style.transition;

    let last_elem = productsblock.lastElementChild.lastElementChild.lastElementChild.getBoundingClientRect();
    let last_y = last_elem.top + last_elem.height;

    if(last_y > screen.height || event.deltaY < 0){
        products_scroll += -event.deltaY;
        if(products_scroll > 0) {
            products_scroll = 0;
        }
    }

    productsblock.style.top = products_scroll + "px";

    console.log(last_y);
}

save.onclick = () => {
    let text = "";
    let _text = editabout.value.split('\n');
    for(i in _text){
        text += _text[i];
        if(i != _text.length){
            text += '&';
        }
    }
    let data = {
        id: edit_id,
        name: inputname.value,
        price: inputprice.value,
        count: inputcount.value,
        kategory: inputkategory.value,
        about: text
    }
    load_data("adminsave", JSON.stringify(data), (xhr) => {
        console.log(xhr);
        update_data(() => { }, 0);
    })
}


window.addEventListener('keydown', (event) => {
    if (event.key == 'Home') {
        productsblock.style.top = "0px";   
        products_scroll = 0;
    }
    if (event.key == 'End') {
        let last_elem = productsblock.lastElementChild.lastElementChild.lastElementChild.getBoundingClientRect();
        let last_y = last_elem.top + last_elem.height;
        productsblock.style.top = (-last_y + 720) + "px";    
        products_scroll = (-last_y + 720);
    }
    if (img_isopen) {
        if (event.key == 'Escape') {
            editvie.style.display = "none";
            img_isopen = false;
        }
        if (event.key == 'ArrowLeft') {
            if (img_point != 0) {
                vie_img(img_id, img_point - 1);
            }
        }
        if (event.key == 'ArrowRight') {
            let img_r = main_data[img_id].link.split('^');
            if (img_point != img_r.length - 1) {
                vie_img(img_id, img_point + 1);
            }
        }
    }
})


function upload() {
    var files = document.querySelector('input[type="file"]').files;
    var number = '1';

    var data = new FormData;
    for (var i = 0; i < files.length; i++) {
        data.append('files', files[0])
    }
    data.append('id', 10)

    load_data('adminloadid', JSON.stringify({ id: actual_id }), () => {
        fetch(hosturl + 'adminuploadimg', {
            method: 'post',
            body: data
        }).then(response => response.text()).then(data => {
            update_data(set_edit_img, actual_index);
        }).catch(error => {
            console.log(error);
        })
    })
}

