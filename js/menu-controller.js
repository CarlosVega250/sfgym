
const inicioLink = document.querySelector('#inicio-link');
const clientesLink = document.querySelector('#clientes-link');
const content = document.querySelector('.content');
const divAdicional = document.querySelector('#elementos-adicionales');





load('html/inicio.html', content);

clientesLink.addEventListener('click', function () {
    limpiarDivAdicional();
    document.querySelector('.active').classList.remove('active');
    document.querySelector('#li-clientes').className = 'active';
    load('html/clientes-components/clientes.html', content);


    let addButton = '<div class="d-flex btn-add"><button class="btn btn-outline-success btn-sm my-2 my-sm-0 mr-3 rounded-pill" type="button" id="add-cliente-btn">Añadir cliente</button></div>';
    let crearReporteButton = '<div class="d-flex btn-add-reporte"><button class="btn btn-outline-success btn-sm my-2 my-sm-0 mr-3 rounded-pill" type="submit" id="reporte-cliente-btn">Crear reporte</button><div>';
    let buscarInput = '<div class"d-flex" id="buscar-div"><input class="form-control  rounded-pill search" type="search" placeholder="Search" aria-label="Search" id="buscar-cliente-input"></div>';



    divAdicional.innerHTML += addButton;
    divAdicional.innerHTML += crearReporteButton;
    divAdicional.innerHTML += buscarInput;

    let script = document.createElement('script');
    script.setAttribute('src', 'js/clientes/clientes.js');
    script.setAttribute('id', 'clientes-script');
    document.head.appendChild(script);

    let scriptMostrarClientes = document.createElement('script');
    scriptMostrarClientes.setAttribute('src', 'js/clientes/mostrar-clientes.js');
    document.head.appendChild(scriptMostrarClientes);

    let scriptEditarCliente = document.createElement('script');
    scriptEditarCliente.setAttribute('src', 'js/clientes/editar-cliente.js');
    document.head.appendChild(scriptEditarCliente);

    document.querySelector('#titulo-modulo').textContent = 'Clientes';
});

inicioLink.addEventListener('click', function () {
    removefile('clientes','js');
    

    document.querySelector('#add-cliente-btn').remove();


    divAdicional.innerHTML = '';
    limpiarDivAdicional();
    document.querySelector('.active').classList.remove('active');
    document.querySelector('#li-inicio').className = 'active';
    load('html/inicio.html', content);
    document.querySelector('#titulo-modulo').textContent = 'Inicio';
});



function load(url, element) {
    req = new XMLHttpRequest();
    req.open("POST", url, false);
    req.send(null);
    element.innerHTML = req.responseText;
}

function limpiarDivAdicional() {
    divAdicional.innerHTML = '';
}

function removefile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}

//Medias querys
