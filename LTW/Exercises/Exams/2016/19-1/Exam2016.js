function addEventListeners(){
    let passInput = document.querySelector("#register > input[name='password']");
    passInput.addEventListener('blur', strongPass.bind(passInput));

    let submitButton = document.querySelector("#register > input[value='Register']");
    submitButton.addEventListener('click', makeRequest);
}

function strongPass(){
    let pattern = /^(?=.*?\W).{8,}$/
    this.value.match(pattern) ? this.style.borderColor = "initial" : this.style.borderColor = "red" ;
}

function makeRequest(){
    let form = document.getElementById('register');
    let username = form.children.username;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "Exam2016.php", true);

    xhr.onload = function(){
        if(this.status === 200 ){
            let respose = JSON.parse(this.responseText);
            (respose.valid === 'true') ? this.style.borderColor = "initial" : this.style.borderColor = "red" ;
        }
    }

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('username='+ username.value);

}


addEventListeners();