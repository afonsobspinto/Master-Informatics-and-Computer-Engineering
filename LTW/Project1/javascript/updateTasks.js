var compTask = Array.from(document.getElementsByClassName("comptask"));
var remTask = Array.from(document.getElementsByClassName("remtask"));
var addTask = document.getElementById("addTask");

compTask.forEach(function(item) {
    item.addEventListener('click', postCompleteTask);
});

remTask.forEach(function(item) {
    item.addEventListener('click', postRemoveTask);
});

if(addTask)
    document.getElementById('addTask').addEventListener('click', postAddTask);

function postCompleteTask(e){
    e.preventDefault();


    var id = e.target.parentElement.parentElement.getElementsByClassName('tsk_id')[0].value;
    var params = "tsk_id="+id;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tasks/complete_tasks.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        //console.log(this.responseText);
        location.reload();
    };

    xhr.send(params); 
}

function postRemoveTask(e){
    e.preventDefault();

    var id = e.target.parentElement.parentElement.getElementsByClassName('tsk_id')[0].value;
    var params = "tsk_id="+id;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tasks/remove_tasks.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        //console.log(this.responseText);
        location.reload();
    };

    xhr.send(params);
}

function postAddTask(e){
    e.preventDefault();

    var name = document.getElementById('item').value;
    var id = document.getElementById('lst_id').value;
    var params = "name="+name+"&lst_id="+id;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tasks/add_tasks.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        //console.log(this.responseText);
        location.reload();
    };

    xhr.send(params);
}