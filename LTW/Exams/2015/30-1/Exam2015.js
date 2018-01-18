let guessButton = document.querySelector("input[value='Guess']");

function addEventListeners(){
    guessButton.addEventListener('click', guess);

}

function guess(){
    let val = document.querySelector("input[name='guess']").value;
    tries++;
    if(val == secret){
        correct();
    }
    else if(val > secret){
        alert("Go Down");
    }
    else{
        alert("Go Up");
    }
}

function correct(){
    alert("Correct");
    let username = document.querySelector("input[value='username']");
    
    let saveEntry = new Object();
    saveEntry.name = username;
    saveEntry.score = tries;

    console.log(saveEntry);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "Exam2015.php", true);
    xhr.onload = function(){
        if(this.status == 200){
            alert("Saved Entry");
        }
        else{
            alert("Unsaved Entry");
        }
    }
    
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("entry =" + JSON.stringify(saveEntry));
}
addEventListeners();