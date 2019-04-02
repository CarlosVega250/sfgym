var abrirVentananaAddClientes = () => {
    load('html/clientes-components/agregar-cliente.html', document.querySelector('.content'));
    document.querySelector('#add-cliente-btn').classList.add('d-none');
    document.querySelector('#reporte-cliente-btn').classList.add('d-none');
    document.querySelector('#buscar-cliente-input').classList.add('d-none');
    let scriptAddClientes = document.createElement('script');
    scriptAddClientes.setAttribute('src', 'js/clientes/addCliente.js');
    scriptAddClientes.setAttribute('id', 'clientes-script');
    document.head.appendChild(scriptAddClientes);

}

document.querySelector('#add-cliente-btn').addEventListener('click', abrirVentananaAddClientes);

function load(url, element) {
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    element.innerHTML = req.responseText;
}



var mediaQuerySmall = window.matchMedia('(min-width:200px)');
var mediaQueryMedim = matchMedia('(min-width:768px)');
var mediaQueryLarge = matchMedia('(min-width:992px)');
var mediaQueryXLarge = matchMedia('(min-width:1200px)');



var putButtons  = mqListener => {
    if(mqListener.matches) {
        document.querySelector('.btn-add').innerHTML = '<button class="btn btn-outline-success btn-sm my-2 my-sm-0 mr-3 rounded-pill" type="button" id="add-cliente-btn">Añadir cliente</button>';
        document.querySelector('.btn-add-reporte').innerHTML = '<button class="btn btn-outline-success btn-sm my-2 my-sm-0 mr-3 rounded-pill" type="submit" id="reporte-cliente-btn">Crear reporte</button>';
        document.querySelector('#buscar-div').innerHTML = '<input class="form-control  rounded-pill search" type="search" placeholder="Search" aria-label="Search" id="buscar-cliente-input">'
        document.querySelector('#add-cliente-btn').addEventListener('click', abrirVentananaAddClientes);
    } else {
        document.querySelector('.btn-add').innerHTML = '<i class="material-icons" id="add-cliente-btn">add_circle_outline</i>';
        document.querySelector('.btn-add-reporte').innerHTML = '<i class="material-icons">assignment</i>';
        document.querySelector('#buscar-div').innerHTML = '<i class="material-icons">search</i>';
    }
}









mediaQueryLarge.addListener(putButtons);
putButtons(mediaQueryLarge);

