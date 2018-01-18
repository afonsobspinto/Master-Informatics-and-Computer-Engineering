
<section id="tasks">
    <h2>TODO Tasks</h2>
    <ul>
        <?php if(isset($_GET['tdl_id'])){?>
        <div id="add">
            <li>
                <input type="text" placeholder="Create a task..." id="item">
                <input type="hidden" id="lst_id" value="<?php echo htmlspecialchars($_GET['tdl_id']); ?>">
                <button id="addTask">
                    <img src="images/site/add.svg" alt="Add Task">
                    <br>
                </button>
            </li>
        </div>
        <?php } ?>
        <?php $counter = 0;
        foreach ($tasks as $task) {
            if(isset($_GET['tdl_id'])){?>
        <div id="remove">
            <?php if (!$task['tsk_status'] && $task['tdl_id'] == $_GET['tdl_id']) { $counter++ ?>
            <li>
                <p class="description""><?=$task['tsk_description']?></p>
                <input type="hidden" class="tsk_id" value="<?php echo htmlspecialchars($task['tsk_id']); ?>">
                <button class="remtask">
                    <img src="images/site/delete.svg" alt="Remove Task">
                    <br>
                </button>

                <button class="comptask">
                    <img src="images/site/accept.svg" alt="Complete Task">
                    <br>
                </button>
            </li>
            <?php }}else{
            ?>
        <div id="remove">
            <?php if (!$task['tsk_status']) { $counter++ ?>

            <li>
                <p class="description"><?=$task['tsk_description']?></p>
                <input type="hidden" class="tsk_id" value="<?php echo htmlspecialchars($task['tsk_id']); ?>">
                <button class="remtask">
                    <img src="images/site/delete.svg" alt="Remove Task">
                    <br>
                </button>
                <button class="comptask">
                    <img src="images/site/accept.svg" alt="Complete Task">
                    <br>
                </button>
            </li>
            <?php }} ?>
        </div>
        <?php } ?>

        <?php if (!$counter) { echo ("Are you sure you have nothing to do?"); }?>
    </ul>
</section>
<section id="tasks">
    <h2>Completed Tasks</h2>
    <ul>
        <?php $counter = 0;
        foreach ($tasks as $task) {
            if(isset($_GET['tdl_id'])){?>
        <div id="remove">
            <?php if ($task['tsk_status'] && $task['tdl_id'] == $_GET['tdl_id']) { $counter++ ?>
            <li>
                <p class="description"><?=$task['tsk_description']?></p>
                <input type="hidden" class="tsk_id" value="<?php echo htmlspecialchars($task['tsk_id']); ?>">
                <button class="remtask">
                    <img src="images/site/delete.svg" alt="Delete Completed Task">
                    <br>
                </button>
            </li>
            <?php }}else{
                ?>
                <div id="remove">
                <?php if ($task['tsk_status']) { $counter++ ?>
                <li>
                    <p class="description"><?=$task['tsk_description']?></p>
                    <input type="hidden" class="tsk_id" value="<?php echo htmlspecialchars($task['tsk_id']); ?>">
                    <button class="remtask">
                        <img src="images/site/delete.svg" alt="Delete Completed Task">
                        <br>
                    </button>
                </li>
                <?php }} ?>
            </div>
        <?php } ?>

        <?php if (!$counter) { echo ("No completed Tasks"); }?>
    </ul>
</section>

<script src="javascript/updateTasks.js"></script>
