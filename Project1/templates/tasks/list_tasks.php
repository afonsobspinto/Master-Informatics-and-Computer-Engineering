<section id="tasks">
  <?php foreach ($tasks as $task) { ?>
    <article>
      <p class="description"><?=$task['tsk_description']?></p>
    </article>
  <?php } ?>
</section>
