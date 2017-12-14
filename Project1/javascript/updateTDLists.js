var add2DLExists = document.getElementById("add2dl");
var rem2DLExists = document.getElementById("rem2dl");

if(add2DLExists)
    document.getElementById('add2dl').addEventListener('click', postList);

if(rem2DLExists)
    document.getElementById('rem2dl').addEventListener('click', postRemList);

function postList(e){
    e.preventDefault();

    var name = document.getElementById('list').value;
    var params = "name="+name;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tdLists/add_tdList.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        console.log(this.responseText);
    };

    xhr.send(params);
}

function postRemList(e){
    e.preventDefault();

    var name = document.getElementById('list').value;
    var params = "name="+name;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tdLists/rem_tdList.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        console.log(this.responseText);
    };

    xhr.send(params);
}