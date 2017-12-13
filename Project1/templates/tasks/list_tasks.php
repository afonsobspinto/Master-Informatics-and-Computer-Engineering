<section id="tasks">
    <h2>TODO Tasks</h2>
    <ul>
        <div id="add">
            <li>
                <input type="text" placeholder="Create a task..." id="item">
                <a href="#addTask"><img src="images/site/add.svg" alt="Add"></a>
            </li>
        </div>
        <?php $counter = 0;
        foreach ($tasks as $task) { ?>
        <div id="remove">
            <?php if (!$task['tsk_status']) { $counter++ ?>
            <li>
                <p class="description"><?=$task['tsk_description']?></p>
                <a href="#removeTask">
                    <img src="images/site/delete.svg" alt="Delete">
                </a>
                <a href="#completeTask">
                    <img src="images/site/accept.svg" alt="Accept">
                </a>
            </li>
            <?php } ?>
        </div>
        <?php } ?>

        <?php if (!$counter) { echo ("Are you sure you have nothing to do?"); }?>
    </ul>
</section>
<section id="tasks">
    <h2>Completed Tasks</h2>
    <ul>
        <?php $counter = 0;
        foreach ($tasks as $task) { ?>
            <div id="remove">
                <?php if ($task['tsk_status']) { $counter++ ?>
                <li>
                    <p class="description"><?=$task['tsk_description']?></p>
                    <a href="#removeTask">
                        <img src="images/site/delete.svg" alt="Delete">
                    </a>
                </li>
                <?php } ?>
            </div>
        <?php } ?>

        <?php if (!$counter) { echo ("No completed Tasks"); }?>
    </ul>
</section>
