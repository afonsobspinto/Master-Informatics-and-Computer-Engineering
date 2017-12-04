<?php

  function getAllTasks() {
    global $dbh;
    $stmt = $dbh->prepare("SELECT *
                           FROM task JOIN
                                category USING (cat_id)
                           ORDER BY task_id DESC");
    $stmt->execute();
    return $stmt->fetchAll();
  }

  function getTaskById($id) {
    global $dbh;
    $stmt = $dbh->prepare("SELECT *
                           FROM task JOIN
                                category USING (cat_id)
                           WHERE task_id = ?");
    $stmt->execute(array($id));
    return $stmt->fetch();
  }

?>
