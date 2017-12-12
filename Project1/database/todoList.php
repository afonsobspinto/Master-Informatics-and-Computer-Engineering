<?php

  function getAllTDLists() {
    global $dbh;
    $stmt = $dbh->prepare("SELECT * FROM todoList ORDER BY tdl_id DESC");
    $stmt->execute();
    return $stmt->fetchAll();
  }

?>
