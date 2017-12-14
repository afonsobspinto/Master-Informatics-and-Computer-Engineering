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
