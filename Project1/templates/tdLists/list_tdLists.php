<section id="tdLists">
  <h2>To Do Lists</h2>
  <ul>
      <li><a href="#add"><img src="images/site/add.svg" alt="Add"></a></li>
      <?php foreach ($tdLists as $tdList) { ?>
          <li>
              <a href="index.php?tdl_id=<?=$tdList['tdl_id']?>"><?=$tdList['tdl_name']?></a>
              <a href="#remove">
                  <img src="images/site/delete.svg" alt="Delete">
              </a>
          </li>
      <?php } ?>
  </ul>
</section>
