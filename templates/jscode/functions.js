//const hosturl = 'https://woolenterritory.ru/'
const hosturl = 'http://localhost:3000/'

function load_data(url, send, cd){
    let xhr = new XMLHttpRequest()
    xhr.open('POST', hosturl + url);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        cd(xhr);
    }
    xhr.send(send);
}