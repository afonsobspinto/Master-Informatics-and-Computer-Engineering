<section id="tasks">
  <h2>To Do Lists</h2>
  <ul>
      <div id="add">
          <li>
              <input type="text" placeholder="Create a list..." id="list">
              <a id="addList"><img src="images/site/add.svg" alt="Add"></a>
          </li>
      </div>
      <?php foreach ($tdLists as $tdList) { ?>
      <div id="remove">
          <li>
              <p href="index.php?tdl_id=<?=$tdList['tdl_id']?>"><?=$tdList['tdl_name']?></p>
              <a id="deleteList" href="#removeList">
                  <img src="images/site/delete.svg" alt="Delete">
              </a>
          </li>
      </div>
      <?php } ?>
  </ul>
</section>
