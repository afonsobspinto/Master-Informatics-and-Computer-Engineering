var compTaskExists = document.getElementById("comptask");
var remCompTaskExists = document.getElementById("remcomptask");

if(compTaskExists)
    document.getElementById('comptask').addEventListener('click', postCompleteTask);

if(remCompTaskExists)
    document.getElementById('remcomptask').addEventListener('click', postRemoveTask);

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
