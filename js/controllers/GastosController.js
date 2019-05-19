var gastoController = (function () {

    function actualizarTabla () {
        let gastosMes = document.querySelector('#gastos-mes');
        let gastosSemana = document.querySelector('#gastos-semana');
        let gastosDia = document.querySelector('#gastos-dia');

        if (gastosMes.selected)
            mostrarGastosMes();
        else if (gastosSemana.selected)
            mostrarGastosSemana();
        else if (gastosDia.selected)
            mostrarGastosDia();
    }

    function addNuevoGasto() {
        let data = UIGasto.getDatosParaNuevoGasto();
        let gasto = new Gasto();

        if (gasto.add(data)) {
            UIGasto.mostrarAlert('Gasto añadido correctamente', 'alert-success');
            actualizarTabla();
            UIGasto.esconderModal('#add-gasto-modal');
        } else {
            UIGasto.mostrarAlert('Algo salió mal', 'alert-danger');
        }
    }

    function setUpDeleteEvent() {
        document.querySelector('#cuerpo-tabla-gastos').addEventListener('click', function (e) {

            if (e.target.matches('.delete-action')) {
                UIGasto.getId(e);
            }
        }, false);

    }

    function eliminarGasto() {

        let gasto = new Gasto();
        if (gasto.eliminar()) {

            UIGasto.quitarRegistro();
            UIGasto.mostrarAlert('Gasto eliminado correctamente', 'alert-success');
        } else {
            UIGasto.mostrarAlert('Algo salió mal', 'alert-danger');
        }

    }

    function setUpEditEvent() {
        document.querySelector('#cuerpo-tabla-gastos').addEventListener('click', function (e) {

            if (e.target.matches('.edit-action')) {
                UIGasto.getId(e);
                let gasto = UIGasto.getGasto();
                UIGasto.setDatosGastoEnInputs(gasto);
                // new Lightpick({ field: document.querySelector('#modificar-membresia-form #fecha-inicio') });
                // new Lightpick({ field: document.querySelector('#modificar-membresia-form #fecha-fin')});
            }
        }, false);
    }

    function modificarGasto() {
        let data = UIGasto.getDatosModificados();
        let gasto = new Gasto();
        // UICliente.mostrarAnimacionBtn('#guardar-cliente-editado');
        if (gasto.modificar(data)) {
            UIGasto.mostrarAlert('Gasto modificado correctamente', 'alert-success');
            // UICliente.regresarBtnAEstadoInicial('#guardar-cliente-editado');
            actualizarTabla();
            UIGasto.esconderModal('#modificar-gasto-modal');
            
        } else {
            UIGasto.mostrarAlert('Algo salió mal', 'alert-danger');
            UIGasto.esconderModal('#modificar-gasto-modal');
        }
    }

    function setUpWatchEvent() {
        document.querySelector('#cuerpo-tabla-gastos').addEventListener('click', function (e) {
            if (e.target.matches('.watch-action')) {
                UIGasto.getId(e);
                let gasto = UIGasto.getGasto();
                UIGasto.verGasto(gasto);

            }
        }, false);
    }

    function busquedaDinamica() {
        let opcionSelect;


        let gastosMes = document.querySelector('#gastos-mes');
        let gastosSemana = document.querySelector('#gastos-semana');
        let gastosDia = document.querySelector('#gastos-dia');

        if (gastosMes.selected)
            opcionSelect = 1;
        else if (gastosSemana.selected)
            opcionSelect = 2;
        else if (gastosDia.selected)
            opcionSelect = 3;

        let dato = UIGasto.getDatosABuscar();
        let gasto = new Gasto();
        let datosEncontrados = gasto.consultar(dato, opcionSelect);
        UIGasto.mostrarGastosEnTabla(datosEncontrados);

    }

    function setUpVentanaReportes() {
        UIGasto.abrirReportes();

        new Lightpick({
            field: document.querySelector('#fecha-rango-reporte'),
            singleDate: false

        });

        document.querySelector('#reporte-gastos-form').addEventListener('submit', generarReporte);

    }

    function generarReporte() {
        let gasto = new Gasto();
        let data = UIGasto.getDatosParaReporte();

        let res = gasto.reporte(data);
        UIGasto.mostrarReporte(res);

        // document.querySelector('#descargar-pdf').addEventListener('click', 
    }

    function setUpInputs() {
        new Cleave('.numeric-add', {
            numericOnly: true,
            blocks: [11]
        });

        new Cleave('.date-add', {
            date: true,
            delimiter: '/',
            datePattern: ['d', 'm', 'Y']
        });

        new Lightpick({ field: document.getElementById('fecha-gasto') });
        new Lightpick({ field: document.getElementById('fecha-gasto-update') });


        new Cleave('.numeric-update', {
            numericOnly: true,
            blocks: [11]
        });

        new Cleave('.date-update', {
            date: true,
            delimiter: '/',
            datePattern: ['d', 'm', 'Y']
        });
    }

    function mostrarGastosMes() {
        UIGasto.mostrarCarga();
        UIGasto.mostrarGastosEnTabla(new Gasto().getGastosMes());
    }

    function mostrarGastosSemana() {
        UIGasto.mostrarCarga();
        UIGasto.mostrarGastosEnTabla(new Gasto().getGastosSemana());
    }

    function mostrarGastosDia() {
        UIGasto.mostrarCarga();
        UIGasto.mostrarGastosEnTabla(new Gasto().getGastosDia());
    }

    function cambiarVista() {
        let gastosMes = document.querySelector('#gastos-mes');
        let gastosSemana = document.querySelector('#gastos-semana');
        let gastosDia = document.querySelector('#gastos-dia');

        if (gastosMes.selected)
            mostrarGastosMes();
        else if (gastosSemana.selected)
            mostrarGastosSemana();
        else if (gastosDia.selected)
            mostrarGastosDia();
    }

    function setUpEvents() {
        setUpInputs();
        mostrarGastosMes();
        document.querySelector('#add-gasto-form').addEventListener('submit', addNuevoGasto);
        setUpDeleteEvent();
        document.querySelector('#confirmar-eliminacion').addEventListener('click', eliminarGasto);
        setUpEditEvent();
        document.querySelector('#modificar-gasto-form').addEventListener('submit', modificarGasto);
        setUpWatchEvent();
        document.querySelector('#buscar-gasto-input').addEventListener('keyup', busquedaDinamica);
        document.querySelector('#reporte-gasto-btn').addEventListener('click', setUpVentanaReportes);
        document.querySelector('#select-gastos').addEventListener('change', cambiarVista);
    }

    return {
        init: function () {
            setUpEvents();
        }
    }
})(UIGasto);

gastoController.init();