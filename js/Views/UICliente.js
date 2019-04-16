var UICliente = (function () {

    function load(url, element) {
        req = new XMLHttpRequest();
        req.open("GET", url, false);
        req.send(null);
        element.innerHTML = req.responseText;
    }

    function isEmpty(string) {
        return (!string || 0 === string.length);
    }

    function mostrarTodosLosClientes() {
        var spinner = '<div class="d-flex mt-3">' +
            '<div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div>' +
            '<div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div>' +
            '<div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div></div>';
        document.querySelector('#cuerpo-tabla-clientes').innerHTML = spinner;
        var req = new XMLHttpRequest();
        req.open("POST", 'php/clientes/consultarClientes.php', false);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        req.send('opcion=' + 1);
        document.querySelector('#cuerpo-tabla-clientes').innerHTML = req.responseText
    }

    return {
        abrirAddCliente: function () {
            load('html/clientes-components/agregar-cliente.html', document.querySelector('.content'));
            document.querySelector('#add-cliente-btn').classList.add('d-none');
            document.querySelector('#reporte-cliente-btn').classList.add('d-none');
            document.querySelector('#buscar-cliente-input').classList.add('d-none');
        },

        mostrarTodosLosClientes: function () {
            mostrarTodosLosClientes();
        },

        getDatosParaNuevoCliente: function () {
            var nombre = document.querySelector('#nombre').value;
            if (!isEmpty(nombre.trim())) {
                var form = document.querySelector('form');
                var data = new FormData(form);
                return data;
            } else {
                new Toast('Ingrese al menos un nombre y un apellido paterno', 2000, '#mensaje', 'danger').show();
            }
        },

        getId : function(event) {
            // console.log('entro get id');
            // console.log(event.currentTarget);
            var i = event.target;
            var td = i.parentNode;
            tr = td.parentNode;
            var elements = tr.childNodes;
            var th = elements[1];
            var id = th.getAttribute('id');
            localStorage.setItem('id', id);
            // console.log('id='+id);
        },

        quitarRegistro : function (){
            tr.remove();
        },

        mostrarMensajeExito: function (mensaje) {
            new Toast(mensaje, 2000, '#mensaje', 'success').show();
        },

        regresar: function () {
            if (document.querySelector('#add-cliente-btn').classList.contains('d-none')) {
                document.querySelector('#add-cliente-btn').classList.remove('d-none');
            }
            if (document.querySelector('#reporte-cliente-btn').classList.contains('d-none')) {
                document.querySelector('#reporte-cliente-btn').classList.remove('d-none');
            }
            if (document.querySelector('#buscar-cliente-input').classList.contains('d-none')) {
                document.querySelector('#buscar-cliente-input').classList.remove('d-none');
            }
            load('html/clientes-components/clientes.html', document.querySelector('.content'));
            mostrarTodosLosClientes();
        }
    }
})();