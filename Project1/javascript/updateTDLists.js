var add2DL = Array.from(document.getElementsByClassName("add2dl"));
var rem2DL = Array.from(document.getElementsByClassName("rem2dl"));

add2DL.forEach(function(item) {
    item.addEventListener('click', postList);
});

rem2DL.forEach(function(item) {
    item.addEventListener('click', postRemList);
});

function postList(e){
    e.preventDefault();

    var name = document.getElementById('list').value;
    var params = "name="+name;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tdLists/add_tdList.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        //console.log(this.responseText);
        location.reload();
    };

    xhr.send(params); 
}

function postRemList(e){
    e.preventDefault();

    var id = e.target.parentElement.parentElement.getElementsByClassName('list_id')[0].value;
    var params = "id="+id;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tdLists/rem_tdList.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        //console.log(this.responseText);
        location.replace("index.php");
    };

    xhr.send(params);
}