
<?php

$rand = rand(0,1);

($rand === 0) ? $ret = {"valid": "true"} : $ret = {"valid": "false"};

echo $ret;

?>


