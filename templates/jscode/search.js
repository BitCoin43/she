sea.onclick = () => {
    load_data('search', JSON.stringify({request: inp1.value.toLowerCase()}), (xhr) => {
      if(xhr.response == ''){
        soclose.style.display = "block";
      } else {
        soclose.style.display = "none";
      }
      let t = ``;
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
      }
      line.innerHTML = t;
    })
};