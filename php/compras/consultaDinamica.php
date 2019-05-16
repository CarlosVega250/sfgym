<?php
    include '../conexion.php';

    $dato = $_POST['dato'];

    try{
        if($_POST['value'] == 3){
            //COMPRAS DEL MES
            $mes = date('m');
            $año = date('Y');

            $firstDay = primerDia($mes,$año);
            $lastDay = ultimoDia($mes,$año);

            $consulta = $conn->prepare("SELECT Id_Compra, Compras.Id_Instructor, descripcion_compra, monto_compra, fecha_compra, cantidad
                FROM Compras INNER JOIN Instructores ON Compras.Id_Instructor = Instructores.Id_Instructor
                AND str_to_date(fecha_compra, '%d/%m/%Y') 
                BETWEEN str_to_date('".$firstDay."/".$mes."/".$año."', '%d/%m/%Y') 
                AND str_to_date('".$lastDay."/".$mes."/".$año."', '%d/%m/%Y')
                WHERE Id_Compra LIKE ? OR Compras.Id_Instructor LIKE ? OR descripcion_compra LIKE ? 
                OR monto_compra LIKE ? OR fecha_compra LIKE ? OR cantidad LIKE ?");

            $consulta->execute(array($dato."%", $dato."%", $dato."%", $dato."%", $dato."%", $dato."%"));

            while($results = $consulta->fetch()){
                echo '<tr>
                    <th scope="row" id="'.$results['Id_Compra'].'">'.$results['Id_Compra'].'</th>'.
                        '<td>'.$results['descripcion_compra'].'</td>'.
                        '<td>'.$results['cantidad'].'</td>'.
                        '<td>'.$results['monto_compra'].'</td>'.
                        '<td>'.$results['fecha_compra'].'</td>'.
                    '<td>
                        <i class="material-icons actions watch-action mr-2" data-toggle="modal" href="#ver-compra-modal"> remove_red_eye</i>
                        <i class="material-icons actions edit-action mr-2" data-toggle="modal" href="#modificar-compra-modal"> create</i>
                        <i class="material-icons actions delete-action mr-2" data-toggle="modal" href="#eliminar-compra-modal"> delete</i> 
                    </td>
                </tr>';
            }
        }

        if($_POST['value'] == 2){
            //COMPRAS DE LA SEMANA
            $day = date('d');
            $mes = date('m');
            $año = date('Y');
    
            $semana=date("W",mktime(0,0,0,$mes,$day,$año));
            $diaSemana=date("w",mktime(0,0,0,$mes,$day,$año));
    
            if($diaSemana==0)
                $diaSemana=7;

            $primerDia=date("d/m/Y",mktime(0,0,0,$mes,$day-$diaSemana+1,$año));
            $ultimoDia=date("d/m/Y",mktime(0,0,0,$mes,$day+(5-$diaSemana),$año));

            $consulta = $conn->prepare("SELECT Id_Compra, Compras.Id_Instructor, descripcion_compra, monto_compra, fecha_compra, cantidad
                FROM Compras INNER JOIN Instructores ON Compras.Id_Instructor = Instructores.Id_Instructor
                AND str_to_date(fecha_compra, '%d/%m/%Y') 
                BETWEEN str_to_date('".$primerDia."', '%d/%m/%Y') AND str_to_date('".$ultimoDia."', '%d/%m/%Y')
                WHERE Id_Compra LIKE ? OR Compras.Id_Instructor LIKE ? OR descripcion_compra LIKE ? 
                OR monto_compra LIKE ? OR fecha_compra LIKE ? OR cantidad LIKE ?");

            $consulta->execute(array($dato."%", $dato."%", $dato."%", $dato."%", $dato."%", $dato."%"));

            while($results = $consulta->fetch()){
                echo '<tr>
                    <th scope="row" id="'.$results['Id_Compra'].'">'.$results['Id_Compra'].'</th>'.
                        '<td>'.$results['descripcion_compra'].'</td>'.
                        '<td>'.$results['cantidad'].'</td>'.
                        '<td>'.$results['monto_compra'].'</td>'.
                        '<td>'.$results['fecha_compra'].'</td>'.
                    '<td>
                        <i class="material-icons actions watch-action mr-2" data-toggle="modal" href="#ver-compra-modal"> remove_red_eye</i>
                        <i class="material-icons actions edit-action mr-2" data-toggle="modal" href="#modificar-compra-modal"> create</i>
                        <i class="material-icons actions delete-action mr-2" data-toggle="modal" href="#eliminar-compra-modal"> delete</i> 
                    </td>
                </tr>';
            }
        }
        
        if($_POST['value'] == 1){
            //COMPRAS DEL DIA
            $fecha = date('d/m/Y');

            $consulta = "SELECT Id_Compra, Compras.Id_Instructor, descripcion_compra, monto_compra, fecha_compra, cantidad
                FROM Compras INNER JOIN Instructores ON Compras.Id_Instructor = Instructores.Id_Instructor
                AND fecha_gasto LIKE '".$fecha."' WHERE Id_Compra LIKE ? OR Compras.Id_Instructor LIKE ? 
                OR descripcion_compra LIKE ? OR monto_compra LIKE ? OR fecha_compra LIKE ? OR cantidad LIKE ?";

            $consulta->execute(array($dato."%", $dato."%", $dato."%", $dato."%", $dato."%", $dato."%"));

            while($results = $consulta->fetch()){
                echo '<tr>
                    <th scope="row" id="'.$results['Id_Compra'].'">'.$results['Id_Compra'].'</th>'.
                        '<td>'.$results['descripcion_compra'].'</td>'.
                        '<td>'.$results['cantidad'].'</td>'.
                        '<td>'.$results['monto_compra'].'</td>'.
                        '<td>'.$results['fecha_compra'].'</td>'.
                    '<td>
                        <i class="material-icons actions watch-action mr-2" data-toggle="modal" href="#ver-compra-modal"> remove_red_eye</i>
                        <i class="material-icons actions edit-action mr-2" data-toggle="modal" href="#modificar-compra-modal"> create</i>
                        <i class="material-icons actions delete-action mr-2" data-toggle="modal" href="#eliminar-compra-modal"> delete</i> 
                    </td>
                </tr>';
            }
        }
    }catch(PDOException $e){
        echo "Error: ". $e->getMessage();
    }

    function primerDia($mes, $año){
        return date("d", mktime(0,0,0, $mes, 1, $año));
    }

    function ultimoDia($mes, $año){
        return date("d",(mktime(0,0,0, $mes+1, 1, $año)-1));
    }
    $conn = null;
?>