<?php 
    include '../conexion.php';

    $fecha = date('d/m/Y');

    try{
        $sell = $_POST['venta'];
        $arraySell = json_decode($sell, true);

        $items = $_POST['productos'];
        $arrayItems = json_decode($items, true);

        $newItems = $_POST['productosNuevos'];
        $arrayNewItems = json_decode($newItems, true);

        modificarVenta($conn, $arraySell['nipCliente'], $arraySell['idInstructor'], $arraySell['totalVenta']);

        $deleteItems = $_POST['eliminados'];
        $arrayDelete = json_decode($deleteItems, true);

        foreach($arrayDelete as $row){
            eliminarProductos($conn, $row['id'], $_POST['id-venta'], $row['cantidad']);
        }

        foreach($arrayItems as $row){
            modificarProductos($conn, $row['id'], $row['cantidad'], $row['subtotal']);
        }

        foreach($arrayNewItems as $row){
            nuevosProductos($conn, $row['id'], $row['cantidad'], $row['subtotal']);
        }

        echo 1;
    }catch(PDOException $e){
        echo 'Error: '. $e->getMessage();
    }

    function modificarVenta($conn, $cliente, $instructor, $subtotal){
        
        $modificar = $conn->prepare('UPDATE Ventas SET
        Id_Cliente = :idCliente,
        Id_Instructor = :idInstructor,
        total_venta = :subtotal
        WHERE Id_Venta = '. $_POST['id-venta']);

        $modificar->bindParam(':idCliente', $cliente);
        $modificar->bindParam(':idInstructor', $instructor);
        $modificar->bindParam(':subtotal', $subtotal);

        $modificar->execute();
        
    }

    function nuevosProductos($conn, $producto, $cantidad, $total){
        $detalle = $conn->prepare("INSERT INTO VentasProductos (Id_Venta, Id_Producto, cantidad_producto, subtotal_venta)
        VALUES (:idVenta, :idProducto, :cantidad, :subtotal)");

        $detalle->bindParam(':idVenta', $_POST['id-venta']);
        $detalle->bindParam(':idProducto', $producto);
        $detalle->bindParam(':cantidad', $cantidad);
        $detalle->bindParam(':subtotal', $total);

        $detalle->execute(); 

        $cantidadP = 0;
        $cantidadProductos = "SELECT existencia_producto from Productos
            WHERE Id_Producto = ". $producto;

        foreach($conn->query($cantidadProductos) as $row){
            $cantidadP = $row['existencia_producto'];
        }
        $resta = $cantidadP - $cantidad;
        $productos = $conn->prepare("UPDATE Productos SET
            existencia_producto = :cantidad
            WHERE Id_Producto = ". $producto);
        $productos->bindParam(':cantidad', $resta);

        $productos->execute();
    }

    function modificarProductos($conn, $idProducto, $cantidadNueva, $totalVenta){
        // $cantidadP = 0;
        // $cantidadProductos = "SELECT existencia_producto from Productos
        //     WHERE Id_Producto = ". $idProducto;

        // foreach($conn->query($cantidadProductos) as $row){
        //     $cantidadP = $row['existencia_producto'];
        // }
        // $suma = 0;
        // $suma = $cantidadP + $cantidadNueva;
        // $productos = $conn->prepare("UPDATE Productos SET
        //     existencia_producto = :cantidad
        //     WHERE Id_Producto = ". $idProducto);
        // $productos->bindParam(':cantidad', $suma);

        // $productos->execute();

        $modificar = $conn->prepare("UPDATE VentasProductos SET
        Id_Producto = :idProducto,
        cantidad_producto = :cantidad,
        subtotal_venta = :subtotalVenta
        WHERE Id_Venta = ". $_POST['id-venta']." AND Id_Producto = ". $idProducto);

        $modificar->bindParam(':idProducto', $idProducto);
        $modificar->bindParam(':cantidad', $cantidadNueva);
        $modificar->bindParam(':subtotalVenta', $totalVenta);

        $modificar->execute();

        $cantidadP = 0;
        $cantidadProductos = "SELECT existencia_producto from Productos
            WHERE Id_Producto = ". $idProducto;

        foreach($conn->query($cantidadProductos) as $row){
            $cantidadP = $row['existencia_producto'];
        }
        $resta = $cantidadP - $cantidadNueva;
        $productos = $conn->prepare("UPDATE Productos SET
            existencia_producto = :cantidad
            WHERE Id_Producto = ". $idProducto);
        $productos->bindParam(':cantidad', $resta);

        $productos->execute();
    }

    function eliminarProductos($conn, $idProducto, $idVenta, $cantidad){
        $eliminar = $conn->prepare("DELETE FROM VentasProductos
            WHERE Id_Producto = ".$idProducto." AND Id_Venta = ".$idVenta);
        
        $eliminar->execute();

        $cantidadP = 0;
        $cantidadProductos = "SELECT existencia_producto from Productos
            WHERE Id_Producto = ". $idProducto;

        foreach($conn->query($cantidadProductos) as $row){
            $cantidadP = $row['existencia_producto'];
        }
        $suma = 0;
        $suma = $cantidadP + $cantidad;
        $productos = $conn->prepare("UPDATE Productos SET
            existencia_producto = :cantidad
            WHERE Id_Producto = ". $idProducto);
        $productos->bindParam(':cantidad', $suma);

        $productos->execute();
    }

   
    $conn == null;
?>

