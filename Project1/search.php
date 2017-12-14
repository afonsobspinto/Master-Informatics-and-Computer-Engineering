<?php
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/templates/common/header.php');
?>

<!DOCTYPE html>
<html>
<head>
    <title>Search FEUP TODO</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Cherry+Swash" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" >
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
        function showSuggestion(str){
            if(str.length === 0){
                document.getElementById('output').innerHTML = '';
            } else {
                // AJAX REQ
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function(){
                    if(this.readyState === 4 && this.status === 200){
                        document.getElementById('output').innerHTML = this.responseText;
                    }
                };
                xmlhttp.open("GET", "templates/pages/suggest.php?q="+str, true);
                xmlhttp.send();
            }
        }
    </script>
</head>
<body>
<section id="search">
    <h1>Search</h1>
    <form>
        Search Lists from Users: <input type="text" class="form-control" onkeyup="showSuggestion(this.value)">
    </form>
    <p>Result(s): <span id="output" style="font-weight:bold"></span></p>
</section>
</body>
</html>
<?php
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/templates/common/footer.php');
?>