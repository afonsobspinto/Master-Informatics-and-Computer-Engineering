<?php

$num1 = $_GET['num1'];
$num2 = $_GET['num2'];

function sum($a, &$b) {
  echo $a + $b;
}

echo sum($num1, $num2);

?>