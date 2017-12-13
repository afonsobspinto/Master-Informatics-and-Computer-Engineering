<section id="tdLists">
  <h2>To Do Lists</h2>
  <ul>
      <div id="add">
          <li>
              <input type="text" placeholder="Create a list..." id="list">
              <a><img src="images/site/add.svg" alt="Add"></a>
          </li>
      </div>
      <?php foreach ($tdLists as $tdList) { ?>
      <div id="remove">
          <li>
              <a href="index.php?tdl_id=<?=$tdList['tdl_id']?>"><?=$tdList['tdl_name']?></a>
              <a href="#removeList">
                  <img src="images/site/delete.svg" alt="Delete">
              </a>
          </li>
      </div>
      <?php } ?>
  </ul>
</section>
