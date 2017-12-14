<?php

function getAllTasks() {
    global $dbh;
    $stmt = $dbh->prepare("SELECT *
                           FROM task JOIN
                                todoList USING (tdl_id)
                           ORDER BY tsk_id DESC");
    $stmt->execute();
    return $stmt->fetchAll();
}


?>