class Producto {
    constructor() {

    }

    add(data) {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/productos/agregarProductos.php', false);
        req.send(data);
        console.log(req.responseText);
        return true;
    }

    eliminar() {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/productos/eliminarProductos.php', false);
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        req.send('id-producto=' + localStorage.getItem('id'));
        console.log('id='+localStorage.getItem('id'));
        console.log(req.responseText);
        return true;

    }

    modificar(data) {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/productos/modificarProductos.php', false);
        req.send(data);
        console.log(req.responseText);
        return true;
    }

    consultar(datoABuscar) {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/productos/consultaDinamica.php', false);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        req.send('dato=' + datoABuscar);
        return req.responseText;
    }

    reporte(data) {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/productos/reportes.php', false);
        // req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        req.send(data);
        return req.responseText;
    }

    getPocasExistencias () {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/productos/consultaPocas.php', false);
       
        req.send(null);
        return req.responseText;
    }

    getProximosACaducar () {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/productos/consultaPocas.php', false);
       
        req.send(null);
        return req.responseText;
    }

    getTodos () {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/productos/consultarProductos.php', false);
       
        req.send(null);
        return req.responseText;
    }
}