req = new XMLHttpRequest();
req.open("POST", 'php/clientes/consultarClientes.php', false);
req.send(null);
document.querySelector('#cuerpo-tabla-clientes').innerHTML = req.responseText;
