<section id="tasks">
  <?php foreach ($tasks as $task) { ?>
    <article>
      <h2><?=$task['task_name']?></h2>
      <p class="description"><?=$task['task_description']?></p>
    </article>
  <?php } ?>
</section>
