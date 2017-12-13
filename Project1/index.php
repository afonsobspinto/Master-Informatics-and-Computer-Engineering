<?php

define('ROOT_PATH', dirname(__DIR__) . '/Project1');

include_once('includes/init.php');

include_once('database/todoList.php');
include_once('database/task.php');

$tdLists = getAllTDLists();
$tasks = getAllTasks();

include_once('templates/common/header.php');
include_once('templates/tdLists/list_tdLists.php');
include_once('templates/tasks/list_tasks.php');
include_once('templates/common/footer.php');
?>
