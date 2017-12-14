document.getElementById('add2dl').addEventListener('click', postList);

function postList(e){
    e.preventDefault();

    var name = document.getElementById('list').value;
    var params = "name="+name;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'add_tdList.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        console.log(this.responseText);
    }

    xhr.send(params);
}
