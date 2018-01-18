function addEventListeners(){
    let plusButtons = document.querySelectorAll('div#products ul li a');
    plusButtons.forEach(element =>{
        element.addEventListener('click', addQty.bind(element));
    });

    let buyButtons = document.querySelectorAll('a.buy');
    buyButtons.forEach(element =>{
        element.addEventListener('click', buyRqst.bind(element));
    })
}

function addQty(){
    this.parentNode.querySelector('span.qty').innerText++;
}

function buyRqst(){
    let products = this.parentNode.querySelectorAll('ul li');
    let productsVec = [];
    products.forEach(element =>{
    	let product = new Object();
        product.name = element.innerText.match(/^(.*?)(?=:)/)[0];
        product.qty = element.querySelector('span.qty').innerText;
        productsVec.push(product);

    })

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'Exam2017.php', true);
    xhr.onload = function () {
    	if (this.status === 200) {
    		let reply = this.responseText;
 			document.querySelector('p.total').innerText =  (reply < 0) ? "not enough stock" : reply;
    	}
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("products=" + JSON.stringify(productsVec));
}

addEventListeners();