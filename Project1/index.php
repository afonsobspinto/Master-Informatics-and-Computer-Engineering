<?php
  include_once('includes/init.php');


  include_once('database/category.php');
  include_once('database/task.php');

  $categories = getAllCategories();
  $tasks = getAllTasks();

  include_once('templates/common/header.php');
  include_once('templates/category/list_categories.php');
  include_once('templates/tasks/list_tasks.php');
  include_once('templates/common/footer.php');
  
?>


