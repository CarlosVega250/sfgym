class Aparato {
    constructor() {

    }

    add(data) {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/aparatos/añadirAparatos.php', false);
        req.send(data);
        console.log('added');
        return true;
    }

    eliminar() {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/aparatos/eliminarAparato.php', false);
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        req.send('id-aparato=' + localStorage.getItem('id'));
        console.log('id='+localStorage.getItem('id'));
        console.log(req.responseText);
        return true;

    }

    modificar(data) {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/aparatos/modificarAparato.php', false);
        req.send(data);
        console.log(req.responseText);
        return true;
    }

    consultar(datoABuscar) {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/aparatos/consultaDinamica.php', false);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        req.send('dato=' + datoABuscar);
        return req.responseText;
    }

    getTodosLosAparatos() {
        var req = new XMLHttpRequest();
        req.open("POST", 'php/aparatos/consultarAparatos.php', false);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        req.send(null);
        return req.responseText;
    }

}