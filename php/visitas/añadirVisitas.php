<?php 
    include '../conexion.php';
    $fecha = date('d/m/Y');
    try{
        $añadir = $conn->prepare('INSERT INTO Visitas (fecha_visitas, Id_Cliente) 
        VALUES (:fecha, :ID)');

        $añadir->bindParam(':fecha', $fecha);
        $añadir->bindParam(':ID', $_POST['id-cliente']);
        $añadir->execute();
        echo 1;
    }catch(PDOException $e){
        echo 'Error: '. $e->getMessage();
    }
    $conn = null;
?>