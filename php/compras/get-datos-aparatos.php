<?php 
    include '../conexion.php';

    try{
        $consulta = 'SELECT Aparatos.Id_Aparato, nombre_aparato, total
        FROM ComprasAparatos INNER JOIN Aparatos INNER JOIN Compras
        ON Aparatos.Id_Aparato = ComprasAparatos.Id_Aparato
        AND ComprasAparatos.Id_Compra = Compras.Id_Compra';

        foreach($conn->query($consulta) as $row){
            echo '<tr>
                <th scope="row" id="'.$row['Id_Aparato'].'">'.$row['Id_Aparato'].'</th>'.
                '<td>'.$row['nombre_aparato'].'</td>'.
                '<td>'.$row['total'].'</td>'.
            '</tr>';
        }
    }catch(PDOException $e){
        echo 'Error: '. $e->getMessage();
    }
    $conn = null;
?>