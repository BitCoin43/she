let g = location.href.split("/")
let h = g[g.length - 1]

load_data('kategory', JSON.stringify({kategory: h}), (xhr) => {
  let t = `<div id="line"><div class="line">`;
  for(i in xhr.response){
    let imgarr = xhr.response[i].link.split('^');
    t += 
    `<a class="tovar" href="/product/` + xhr.response[i].id + `">
      <div class="tovarwrapper">
        <img class="tovarimg" src="` + imgarr[0] + `" id="im">
      </div>
      <div class="price" id="pr">` + xhr.response[i].price + ` ₽</div>
      <div class="name" id="nm">` + xhr.response[i].name + `</div>
    </a>`
    if(i % 5 == 0 && i != 0){
      t += `</div><div class="line">`;
    }
  }
  t += `</div>`;
  line.outerHTML = t;
})

sea.onclick = () => {
  load_data('search', JSON.stringify({request: inp1.value.toLowerCase()}), (xhr) => {
    let t = `<div id="line"><div class="line">`;
    for(i in xhr.response){
      let imgarr = xhr.response[i].link.split('^');
      t += 
      `<a class="tovar" href="/product/` + xhr.response[i].id + `">
        <div class="tovarwrapper">
          <img class="tovarimg" src="` + imgarr[0] + `" id="im">
        </div>
        <div class="price" id="pr">` + xhr.response[i].price + ` ₽</div>
        <div class="name" id="nm">` + xhr.response[i].name + `</div>
      </a>`
      if(i % 5 == 0 && i != 0){
        t += `</div><div class="line">`;
      }
    }
    t += `</div>`
    line.outerHTML = t;
  })
};