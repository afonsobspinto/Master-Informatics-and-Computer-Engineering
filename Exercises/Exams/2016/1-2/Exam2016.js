function addEventListeners(){
    let keyNumbers = document.querySelectorAll("div#keypad > a")
    keyNumbers.forEach(element => {
        element.addEventListener('click', add2Input.bind(element));
    })


    let submit = document.querySelector("#pin > input[value='Verify']");
    submit.addEventListener('click', makeRequest);
    
}

function add2Input(){
    let input = document.querySelector("#pin > input[name='pin']");
    input.value += this.innerText;
}

function makeRequest(){
    let data = new Object();
    data.name = document.querySelector("#pin > input[name='username']").value;
    data.pin = document.querySelector("#pin > input[name='pin']").value;

    console.log(data);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'Exam2016.php' ,true);
    xhr.onload = function(){
        if(this.status === 200){
            let response = JSON.parse(this.responseText);

            if(response.valid === "false"){
             document.querySelector("#pin > input[name='pin']").value = "";
             document.querySelector("#pin > input[name='pin']").style.borderColor = "red";
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("inputs=" + JSON.stringify(data));

}

addEventListeners();