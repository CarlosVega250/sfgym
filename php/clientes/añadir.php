<?php
    include '../conexion.php';
    $conex = $conn;
    try {
        echo "Conexion";
<<<<<<< HEAD

    //DATOS MAS BASICOS DEL CLIENTE    
        $cliente = $conn->prepare('INSERT INTO Clientes (nombre_cliente, apellido_paterno, apellido_materno, edad) 
=======
        
        $preparar = $conn->prepare('INSERT INTO Clientes (nombre_cliente, apellido_paterno, apellido_materno, edad) 
>>>>>>> 23ab5e2aa45660f45f1129fefd4ad4756d812c17
        VALUES (:nombre, :paterno, :materno, :edad)');
        
        $cliente->bindParam(':nombre', $_POST['nombre_cliente']);
        $cliente->bindParam(':paterno', $_POST['ap-parno']);
        $cliente->bindParam(':materno', $_POST['ap-marno']);
        $cliente->bindParam(':edad', $_POST['edad']);
        //$preparar->bindParam(':activo', $_POST['']);
        //$preparar->bindParam(':genero', $_POST['']);
        $cliente->execute();

    //INSERTAR TELEFONO
        $lastId = $conn->lastInsertId();

        $telefono = $conn->prepare('INSERT INTO Telefonos (Id_Cliente, numero) 
        VALUES (:ID, :numero)');

        $telefono->bindParam(':ID', $lastId);
        $telefono->bindParam(':numero', $_POST['telefono']);
        $telefono->execute();
    
    //INSERTAR DIRECCION
        $direccion = $conn->prepare('INSERT INTO Direcciones (Id_Cliente, colonia, calle, numero_exterior, numero_interior)
        VALUES (:ID, :col, :cal, :numeroex, :numeroin)');

        $direccion->bindParam('ID', $lastId);
        $direccion->bindParam('col', $_POST['colonia']);
        $direccion->bindParam('cal', $_POST['calle']);
        $direccion->bindParam('numeroex', $_POST['num-ext']);
        $direccion->bindParam('numeroin', $_POST['num-int']);
        $direccion->execute();

        echo "New records created successfully";
    }   
    catch(PDOException $e){
        echo "Error: ". $e->getMessage();
    }
    $conn = null;
?>