<?php
  $db = new PDO('sqlite:products.db');

  $stmt = $db->prepare('SELECT * FROM products');
  $stmt->execute();  
  $products = $stmt->fetchAll();

  $result = array();
  foreach ($products as $product)
    $result[] = $product['name'];    

  echo json_encode($result);
?>
