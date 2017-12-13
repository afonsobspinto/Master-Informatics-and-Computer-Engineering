<?php

include_once('includes/init.php');

include_once('database/user.php');

include_once('templates/common/header.php');

if (isset($_SESSION['username']) && $_SESSION['username'] != '') {
    $tasks = getAllUserTasks($_SESSION['username']);
    $tdLists = getAllUserTDLists($_SESSION['username']);

    include_once('templates/tdLists/list_tdLists.php');
    include_once('templates/tasks/list_tasks.php');

}
else{
    include_once('templates/pages/home.php');
}

include_once('templates/common/footer.php');

?>
