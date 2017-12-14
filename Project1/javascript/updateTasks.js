var compTaskExists = document.getElementById("comptask");
var remTaskExists = document.getElementById("remtask");


if(compTaskExists)
    document.getElementById('comptask').addEventListener('click', postCompleteTask);

if(remTaskExists)
    document.getElementById('remtask').addEventListener('click', postRemoveTask);

function postCompleteTask(e){
    e.preventDefault();

    var id = document.getElementById('tsk_id').value;
    var params = "tsk_id="+id;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tasks/complete_tasks.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        console.log(this.responseText);
    };

    xhr.send(params);
}

function postRemoveTask(e){
    e.preventDefault();

    var id = document.getElementById('tsk_id').value;
    var params = "tsk_id="+id;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tasks/remove_tasks.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        console.log(this.responseText);
    };

    xhr.send(params);
}

function postAddTask(e){
    e.preventDefault();

    var name = document.getElementById('item').value;
    var id = document.getElementById('lst_id').value;
    console.log(name);
    console.log(id);
    var params = "name="+name+"lst_id"+id;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tasks/add_tasks.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        //console.log(this.responseText);
    };

    xhr.send(params);
}