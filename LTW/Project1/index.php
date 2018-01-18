<?php

include_once(__DIR__ . '/includes/init.php');
include_once(__DIR__ . '/database/user.php');
include_once(__DIR__ . '/database/todoList.php');
include_once(__DIR__ . '/database/task.php');
include_once(__DIR__ . '/templates/common/header.php');

if (isset($_SESSION['username']) && $_SESSION['username'] != '') {
    $tdLists = getAllUserTDLists($_SESSION['username']);
    $tasks = getAllUserTasks($_SESSION['username']);
    include_once(__DIR__ . '/templates/tdLists/list_tdLists.php');
    include_once(__DIR__ . '/templates/tasks/list_tasks.php');

}
else{
    include_once(__DIR__ . '/templates/pages/home.php');
}

include_once(__DIR__ . '/templates/common/footer.php');

?>
