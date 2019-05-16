var visitaController = (function () {


    function addNuevaVisita() {
        let data = UIVisita.getDatosParaNuevaVisita();
        console.log('data=' + data);
        let visita = new Visita();

        if (visita.add(data)) {
            UIVisita.mostrarMensajeExito('#alert-add-visita', 'Visita añadida correctamente');
            UIVisita.mostrarTodasLasVisitas();
        }
    }

    function setUpDeleteEvent() {
        document.querySelector('#cuerpo-tabla-visitas').addEventListener('click', function (e) {

            if (e.target.matches('.delete-action')) {
                UIVisita.getId(e);
            }
        }, false);

    }

    function eliminarVisita() {

        let visita = new Visita();
        if (visita.eliminar()) {

            UIVisita.quitarRegistro();
            UIVisita.mostrarMensajeExito('#alert-visita', 'Visita eliminada correctamente');
        }


    }

    function setUpEditEvent() {
        document.querySelector('#cuerpo-tabla-visitas').addEventListener('click', function (e) {

            if (e.target.matches('.edit-action')) {
                UIVisita.getId(e);
                let visita = UIVisita.getVisita();
                UIVisita.setDatosVisitaEnInputs(visita);
                new Lightpick({ field: document.querySelector('#modificar-visita-form #fecha-visita') });

            }
        }, false);
    }

    function modificarVisita() {
        let data = UIVisita.getDatosModificados();
        let visita = new Visita();
        // UICliente.mostrarAnimacionBtn('#guardar-cliente-editado');
        if (visita.modificar(data)) {
            UIVisita.mostrarMensajeExito('#alert-visita', 'Visita modificada correctamente');
            UIVisita.esconderModal('#modificar-visita-modal');
            UIVisita.mostrarTodasLasVisitas();
        }
    }

    function setUpWatchEvent() {
        document.querySelector('#cuerpo-tabla-visitas').addEventListener('click', function (e) {

            if (e.target.matches('.watch-action')) {
                UIVisita.getId(e);
                let visita = UIVisita.getVisita();
                UIVisita.verVisita(visita);

            }
        }, false);
    }

    function busquedaDinamica() {
        let dato = UIVisita.getDatosABuscar();
        let visita = new Visita();
        let datosEncontrados = visita.consultar(dato);
        UIVisita.mostrarVisitasEnTabla(datosEncontrados);

    }

    function setUpVentanaReportes() {
        UIVisita.abrirReportes();

        new Lightpick({
            field: document.querySelector('#fecha-rango-reporte'),
            singleDate: false

        });

        document.querySelector('#reporte-visitas-form').addEventListener('submit', generarReporte);

    }

    function generarReporte() {
        let visita = new Visita();
        let data = UIVisita.getDatosParaReporte();

        let res = visita.reporte(data);
        UIVisita.mostrarReporte(res);

        // document.querySelector('#descargar-pdf').addEventListener('click', descargarPDF);
    }

    function setUpInputs() {


        new Cleave('.numeric-id-add', {
            numericOnly: true,
            blocks: [10]
        });

        new Cleave('.numeric-id-update', {
            numericOnly: true,
            blocks: [10]
        });

        new Cleave('.date-add', {
            date: true,
            delimiter: '/',
            datePattern: ['d', 'm', 'Y']
        });

        new Cleave('.date-update', {
            date: true,
            delimiter: '/',
            datePattern: ['d', 'm', 'Y']
        });



    }

    function mostrarVisitasDelDia() {
        UIVisita.mostrarCarga();
        UIVisita.mostrarVisitasEnTabla(new Visita().getVisitasDelDia());
    }

    function mostrarVisitasDeLaSemana() {
        UIVisita.mostrarCarga();
        UIVisita.mostrarVisitasEnTabla(new Visita().getVisitasDeSemana());
    }

    function mostrarVisitasDelMes() {
        UIVisita.mostrarCarga();
        UIVisita.mostrarVisitasEnTabla(new Visita().getVisitasDelMes());
    }

    function cambiarVista() {
        let visitasDia = document.querySelector('#visitas-dia');
        let visitasSema = document.querySelector('#visitas-semana');
        let visitasMes = document.querySelector('#visitas-mes');

        if (visitasDia.selected)
            mostrarVisitasDelDia();
        else if (visitasSema.selected)
            mostrarVisitasDeLaSemana();
        else if (visitasMes.selected)
            mostrarVisitasDelMes();
    }


    function setUpEvents() {
        mostrarVisitasDelDia();
        setUpInputs();
        document.querySelector('#add-visita-form').addEventListener('submit', addNuevaVisita);
        new Lightpick({ field: document.getElementById('fecha-visita') });
        setUpDeleteEvent();
        document.querySelector('#confirmar-eliminacion').addEventListener('click', eliminarVisita);
        setUpEditEvent();
        document.querySelector('#modificar-visita-form').addEventListener('submit', modificarVisita);
        setUpWatchEvent();
        document.querySelector('#reporte-visita-btn').addEventListener('click', setUpVentanaReportes);
        document.querySelector('#buscar-visita-input').addEventListener('keyup', busquedaDinamica);
        document.querySelector('#reporte-visita-btn').addEventListener('click', setUpVentanaReportes);
        document.querySelector('#select-visitas').addEventListener('change', cambiarVista);
    }

    return {
        init: function () {
            setUpEvents();

        }
    }
})(UIVisita);

visitaController.init();