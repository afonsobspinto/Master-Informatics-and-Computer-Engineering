<?php

$images = array("horse.png", "cow.png", "pig.png", "cock.png", "fish.png", "sheep.png");

$random = array_rand($images, 3);

$ret = $arrayName = array($images[$random[0]], $images[$random[1]], $images[$random[2]]);

echo json_encode($ret);

?>