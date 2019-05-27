

 <?php
 $dbhost = 'localhost';
 $dbuser = 'root';
 $dbpass = '';
 $dbname = 'nuevoacropolisgym';
 $connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
 $backupAlert = '';
 $tables = array();
 $result = mysqli_query($connection, "SHOW TABLES");
 if (!$result) {
     $backupAlert = 'Error found.<br/>ERROR : ' . mysqli_error($connection) . 'ERROR NO :' . mysqli_errno($connection);
 } else {
     while ($row = mysqli_fetch_row($result)) {
         $tables[] = $row[0];
     }
     mysqli_free_result($result);

     $return = '';
     foreach ($tables as $table) {

         $result = mysqli_query($connection, "SELECT * FROM " . $table);
         if (!$result) {
             $backupAlert = 'Error found.<br/>ERROR : ' . mysqli_error($connection) . 'ERROR NO :' . mysqli_errno($connection);
         } else {
             $num_fields = mysqli_num_fields($result);
             if (!$num_fields) {
                 $backupAlert = 'Error found.<br/>ERROR : ' . mysqli_error($connection) . 'ERROR NO :' . mysqli_errno($connection);
             } else {
                 $return .= 'DROP TABLE IF EXISTS `' . $table . '`;';
                 $return .= '/*!40101 SET @saved_cs_client = @@character_set_client */;
                 /*!40101 SET character_set_client = utf8 */;';
                

                 $row2 = mysqli_fetch_row(mysqli_query($connection, 'SHOW CREATE TABLE ' . $table));
                 if (!$row2) {
                     $backupAlert = 'Error found.<br/>ERROR : ' . mysqli_error($connection) . 'ERROR NO :' . mysqli_errno($connection);
                 } else {
                     $return .= "\n\n" . $row2[1] . ";\n\n";
                     $return .= 'LOCK TABLES `' .$table. "` WRITE;;
                     /*!40000 ALTER TABLE `tipogastos` DISABLE KEYS */;";
                     for ($i = 0; $i < $num_fields; $i++) {
                         while ($row = mysqli_fetch_row($result)) {
                             $return .= 'INSERT INTO ' . $table . ' VALUES(';
                             for ($j = 0; $j < $num_fields; $j++) {
                                 $row[$j] = addslashes($row[$j]);
                                 if (isset($row[$j])) {
                                     $return .= '"' . $row[$j] . '"';
                                 } else {
                                     $return .= '""';
                                 }
                                 if ($j < $num_fields - 1) {
                                     $return .= ',';
                                 }
                             }
                             $return .= ");\n";
                         }
                     }
                     $return .= "\n\n\n";
                     $return .= "/*!40000 ALTER TABLE `".$table."` ENABLE KEYS */;\nUNLOCK TABLES;";
                 }

                 $backup_file = $dbname . date("Y-m-d-H-i-s") . '.sql';
                 $handle = fopen("{$backup_file}", 'w+');
                 fwrite($handle, $return);
                 fclose($handle);
                 $backupAlert = 'Succesfully got the backup!';
             }
         }
     }
 }
 echo $backupAlert;




 
//     $nameToDownload =  'respaldo_'.$fecha.'_'.$id.'.sql';



//     file_put_contents($nombreDelArchivo, $contenido);
//     return $nameToDownload;
// }
// $name = exportarTablas("localhost", "root", "", "nuevoacropolisgym");
// header('Content-Description: File Transfer');
// header('Content-Type: application/sql');
// header('Content-Disposition: attachment; filename="'.basename($name).'"');
// readfile("$name");
?>


































