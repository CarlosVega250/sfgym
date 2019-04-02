



document.querySelector('#form').addEventListener('submit', function() {
     var form = document.querySelector('form');
    var data = new FormData(form);
    var req = new XMLHttpRequest();
    req.send(data);
    console.log(req.responseText);
})



function enviarDatos(cliente) {
    req = new XMLHttpRequest();
    req.open("POST", url, false);
    req.send(cliente);
    req.responseText
}
