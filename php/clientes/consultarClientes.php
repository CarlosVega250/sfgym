<?php
    include '../conexion.php';

    $datos = 'SELECT Clientes.Id_Cliente, nombre_cliente, numero FROM Clientes, Telefonos where Telefonos.Id_Cliente = Clientes.Id_Cliente';
    //$datos->execute();

    foreach($conn->query($datos) as $row){
        echo '<tr>
              <th scope="row">'.$row['Id_Cliente'].'</th>'.
             '<td>'.$row['nombre_cliente'].'</td>'.
             '<td>'.$row['numero'].'</td>'.
        '<td>
            <i class="material-icons actions"> remove_red_eye</i>
            <i class="material-icons actions edit-action"> create</i>
            <i class="material-icons action delete-action"> delete</i> </td>
        </tr>';
    }

    $conn = null;
?>