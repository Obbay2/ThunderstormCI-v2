<?php
$data = $_POST["number"];
if(isset($data)) {
echo 'returned; '.$data.' yay?';
} else {
echo "No data!";	
}
print_r($_POST);
print_r($_SERVER);
?>