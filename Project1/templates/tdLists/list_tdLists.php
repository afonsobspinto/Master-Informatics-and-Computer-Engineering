<section id="categories">
  <h2>Categories</h2>
  <ul>
    <?php foreach ($tdLists as $tdList) { ?>
      <li><a href="index.php?tdl_id=<?=$tdList['tdl_id']?>"><?=$tdList['tdl_name']?></a></li>
    <?php } ?>
  </ul>
</section>
