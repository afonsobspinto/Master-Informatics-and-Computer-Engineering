const regexStr = "Washing the washing machine while watching the washing machine washing washing"

const xpathStr ='<authors><author country="Spain" name="Miguel de Cervantes"><book year="1605" type="Novel">Don Quixote </book></author ><author country="England" name="William Shakespeare"><book year="1599" type="Tragedy">Hamlet </book><book year="1606" type="Tragedy">Macbeth </book></author ><author country="Russia" name="Leo Tolstoy"><book year="1865" type="Novel">War and Peace </book></author ><author country="Portugal" name="Jose Saramago"><book year="1995" type="Novel">Ensaio sobre a Cegueira </book><book year="1997" type="Novel">Todos os Nomes </book></author ></authors >'
var myParser = new DOMParser();
var xpathObject = myParser.parseFromString(xpathStr, "text/xml");

$(document).ready(function () {

    $('#photos > ul > li > img').bind('click', selectLarge);


    let div = document.getElementById('photos');
    let ul = div.getElementsByTagName('ul') [0];
    div.getElementsByClassName('load') [0].addEventListener('click', function () {
        console.log("Click");
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'Exam2017.php', true);

        xhr.onload = function () {
            if (this.status === 200) {
                console.log(JSON.parse(this.responseText));
                let response = JSON.parse(this.responseText);

                for (let i = 0; i < response.length; i++) {
                    let _li = document.createElement('li');
                    let _img = document.createElement('img');
                    _img.src = response[i];
                    _li.appendChild(_img);
                    ul.appendChild(_li);
                    $(_img).bind('click', selectLarge);
                }
            }
        }

        xhr.send();

    })


})


function selectLarge() {
    let newSrc = "large/" + $(this).attr('src');
    $('#photos > img').attr('src', newSrc);
};

function getRegexExpression() {

    let regex = regexStr.match(new RegExp(document.getElementById("regexVal").value));
    let answer = document.getElementById("answer").value;
    let text;
    answer === regex[0] ? text = "Correct!" : text = "Wrong. Correct Answer: " + regex[0];

    let node = document.getElementById("regex");
    let newNode = document.createElement("p");
    newNode.appendChild(document.createTextNode(text));
    node.appendChild(newNode);
}

function getXpathValue() {

    let answer = document.getElementById("xpathAnswer").value;
    console.log(answer);
    let result = xpathObject.evaluate(answer, xpathObject, null, XPathResult.ANY_TYPE, null);
    console.log(result);
    let node = document.getElementById("XML");
    let singleResult = result.iterateNext();
 
    while(singleResult){
        let newNode = document.createElement("p");
        newNode.appendChild(document.createTextNode(singleResult.textContent));
        node.appendChild(newNode);
        singleResult = result.iterateNext();
    }
    

}