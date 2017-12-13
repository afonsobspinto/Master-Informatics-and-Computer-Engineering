<section id="tasks">
    <h2>Tasks</h2>
    <ul>
        <div id="#addTask">
            <li>
                <input type="text" placeholder="Create a task..." id="item">
                <a><img src="images/site/add.svg" alt="Add"></a>
            </li>
        </div>
        <?php foreach ($tasks as $task) { ?>
            <li>
                <a class="description"><?=$task['tsk_description']?></a>
                <a href="#remove">
                    <img src="images/site/delete.svg" alt="Delete">
                </a>
            </li>
        <?php } ?>
    </ul>
</section>
