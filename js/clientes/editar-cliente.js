var elements = document.querySelectorAll('.edit-action');

function editClient () {
    var i = event.target;
    var td = i.parentNode;
    var tr = td.parentNode;
    var elements = tr.childNodes;
    var th = elements[1];
    var id = th.getAttribute('id');
    localStorage.setItem("id", id);
    req = new XMLHttpRequest();
    req.open("POST", 'html/clientes-components/editar-cliente.html', false);
    req.send(null);
    document.querySelector('.content').innerHTML = req.responseText;

    getDatosCliente(id);
}

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', editClient, false);
}

function getDatosCliente(id) {
    var req = new XMLHttpRequest();
    req.open("POST", 'php/clientes/get-datos-cliente.php', false);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var params = 'id='+id 
    req.send(params);
    var elements = req.responseText;
    var cliente = JSON.parse(elements);
    setDatosClienteEnInputs(cliente);
}

function setDatosClienteEnInputs(cliente) {
    document.querySelector('#nombre').value = cliente.nombre;
    document.querySelector('#ap-parno').value = cliente.apPaterno;
    document.querySelector('#ap-marno').value = cliente.apMaterno;
    document.querySelector('#edad').value = cliente.edad;
    
}