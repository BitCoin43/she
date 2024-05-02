load_data('main', '', (xhr) => {
  let t = `<div id="line"><div class="line">`;
    let f = 0;
    for(i in xhr.response){
      let imgarr = xhr.response[i].link.split('^');
      t += 
      `<a class="tovar" href="/product/` + xhr.response[i].id + `">
        <div class="imgwrapper">
          <img class="tovarimg" src="` + imgarr[0] + `" id="im">
        </div>
        <div class="price" id="pr">` + xhr.response[i].price + ` ₽</div>
        <div class="name" id="nm">` + xhr.response[i].name + `</div>
      </a>`
      f++;
      if(f == 6){
        t += `</div><div class="line">`;
        f = 0;
      }
    }
    t += `</div>`;
    line.outerHTML = t;
})

function serach(){
  load_data('search', JSON.stringify({request: inp1.value.toLowerCase()}), (xhr) => {
    let t = `<div id="line"><div class="line">`;
    let f = 0;
    for(i in xhr.response){
      let imgarr = xhr.response[i].link.split('^');
      t += 
      `<a class="tovar" href="/product/` + xhr.response[i].id + `">
        <img class="tovarimg" src="` + imgarr[0] + `" id="im">
        <div class="price" id="pr">` + xhr.response[i].price + ` ₽</div>
        <div class="name" id="nm">` + xhr.response[i].name + `</div>
      </a>`
      f++;
      if(f == 6){
        t += `</div><div class="line">`;
        f = 0;
      }
    }
    t += `</div>`
    line.outerHTML = t;
  })
}

sea.onclick = () => {
  serach()
};

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    serach()
  }
});