<?php 
    include '../conexion.php';

    try{
        $consultar = "SELECT Id_Venta, nombre_cliente, fecha_venta, tipo_venta, Ventas.total_venta, Id_TipoVenta
        FROM Ventas INNER JOIN Clientes INNER JOIN TipoVenta
        ON Ventas.Id_Cliente = Clientes.Id_Cliente AND Ventas.Id_TipoVenta = TipoVenta.Id_TipoVenta
        WHERE cancelada = 0";

        foreach($conn->query($consultar) as $row){
            echo '<tr>
                <th scope="row" data-tipo="'.$row['Id_TipoVenta'].'" id="'.$row['Id_Venta'].'">'.$row['Id_Venta'].'</th>'.
                    '<td>'.$row['nombre_cliente'].'</td>'.
                    '<td>'.$row['fecha_venta'].'</td>'.
                    '<td>'.$results['tipo_venta'].'</td>'.
                    '<td class="text-right">'.$row['total_venta'].'</td>'.
                '<td class="text-right">
                    <i class="material-icons actions watch-action mr-2"> remove_red_eye</i>
                   
                    <i class="material-icons actions delete-venta mr-2" data-toggle="modal" href="#eliminar-venta-modal"> delete</i> </td>
            </tr>';
        }
    }catch(PDOException $e){
        echo 'Error: '. $e->getMessage();
    }
    $conn == null;
?>