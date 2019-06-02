<?php 
    include '../conexion.php';

    $fecha = date('d/m/Y');

    $mes = date('m');
    $año = date('Y');

    $firstDay = primerDia($mes,$año);
    $lastDay = ultimoDia($mes,$año);

    try{
        $datos = "SELECT Id_Venta, nombre_cliente, fecha_venta, TipoVenta.tipo_venta, Ventas.total_venta, TipoVenta.Id_TipoVenta
        FROM Ventas INNER JOIN Clientes INNER JOIN TipoVenta
        ON Ventas.Id_Cliente = Clientes.Id_Cliente AND Ventas.Id_TipoVenta = TipoVenta.Id_TipoVenta
        AND str_to_date(fecha_venta, '%d/%m/%Y') 
        BETWEEN str_to_date('".$firstDay."/".$mes."/".$año."', '%d/%m/%Y') AND str_to_date('".$lastDay."/".$mes."/".$año."', '%d/%m/%Y')
        AND cancelada = 0";
        //$datos->execute();
    
        foreach($conn->query($datos) as $row){
            echo '<tr>
                  <th scope="row" data-tipo="'.$row['Id_TipoVenta'].'" id="'.$row['Id_Venta'].'">'.$row['Id_Venta'].'</th>'.
                 '<td>'.$row['nombre_cliente'].'</td>'.
                 '<td>'.$row['fecha_venta'].'</td>'.
                 '<td>'.$results['tipo_venta'].'</td>'.
                 '<td class="text-right">'.$row['total_venta'].'</td>'.
            '<td class="text-right">
                <i class="material-icons actions watch-action mr-2"> remove_red_eye</i>
                
                <i class="material-icons actions delete-action mr-2" data-toggle="modal" href="#eliminar-venta-modal"> delete</i> </td>
            </tr>';
        }
    }catch(PDOException $e){
        echo 'Error: '. $e->getMessage();
    }

    function primerDia($mes, $año){
        return date("d", mktime(0,0,0, $mes, 1, $año));
    }

    function ultimoDia($mes, $año){
        return date("d",(mktime(0,0,0, $mes+1, 1, $año)-1));
    }
    
    $conn = null;
?>