<?php

include_once('includes/init.php');

include_once('database/todoList.php');
include_once('database/task.php');

$tasks = getAllTasks();
$tdLists = getAllTDLists();

include_once('templates/common/header.php');
include_once('templates/tdLists/list_tdLists.php');
include_once('templates/tasks/list_tasks.php');
include_once('templates/common/footer.php');
?>
