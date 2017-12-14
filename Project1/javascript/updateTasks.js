document.getElementById('comptask').addEventListener('click', postCompleteTask);

function postCompleteTask(e){
    e.preventDefault();

    var id = document.getElementById('tsk_id').value;
    console.log(id);
    var params = "tsk_id="+id;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'templates/tasks/complete_tasks.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        console.log(this.responseText);
    };

    xhr.send(params);
}
