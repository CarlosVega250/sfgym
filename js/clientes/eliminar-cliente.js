var elements = document.querySelectorAll('.delete-action');

function eliminarCliente () {
    var i = event.target;
    var td = i.parentNode;
    var tr = td.parentNode;
    var elements = tr.childNodes;
    var th = elements[1];
    var id = th.getAttribute('id');
    
    var req = new XMLHttpRequest();
    req.open("POST", 'php/clientes/eliminarCliente.php', false);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send('id='+id);
    console.log(req.responseText);

    tr.remove();
}

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', eliminarCliente, false);
}