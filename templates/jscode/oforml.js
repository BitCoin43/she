let el = document.getElementById("end");
el.addEventListener("click", () => {
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
})