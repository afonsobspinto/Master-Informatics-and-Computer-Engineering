<section id="tasks">
    <h2>TODO Tasks</h2>
    <ul>
        <div id="add">
            <li>
                <input type="text" placeholder="Create a task..." id="item">
                <a><img src="images/site/add.svg" alt="Add"></a>
            </li>
        </div>
        <?php foreach ($tasks as $task) { ?>
        <div id="remove">
            <li>
                <p class="description"><?=$task['tsk_description']?></p>
                <a href="#removeTask">
                    <img src="images/site/delete.svg" alt="Delete">
                    <img src="images/site/accept.svg" alt="Accept">
                </a>
            </li>
        </div>
        <?php } ?>
    </ul>
</section>
<section id="tasks">
    <h2>Completed Tasks</h2>
    <ul>
        <?php foreach ($tasks as $task) { ?>
            <div id="remove">
                <li>
                    <p class="description"><?=$task['tsk_description']?></p>
                    <a href="#removeTask">
                        <img src="images/site/delete.svg" alt="Delete">
                    </a>
                </li>
            </div>
        <?php } ?>
    </ul>
</section>
