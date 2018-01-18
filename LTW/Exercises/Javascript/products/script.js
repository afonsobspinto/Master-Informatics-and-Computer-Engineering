var products = ['ABCD', 'DEFG'];

window.addEventListener("load", loadDocument, true);

var savedLine;

function loadDocument() {
  var form = document.getElementById("products");
  var line = firstTagChild(form);
  var select = firstNamedChild(line, "SELECT");
  loadProducts(select);
  
  var add = firstNamedChild(form, "INPUT");
  add.addEventListener("click", addLine, true);
}

function loadProducts(select) {
/* 
 * Code for exercise 7
 * 
  for (p in products) {
       var option = document.createElement("option");
       option.value = products[p];
       option.text = products[p];
       select.appendChild(option);
  }
*/

  var request = new XMLHttpRequest();

  request.addEventListener("load", productsLoaded, false);
  request.open("get", "products.php", true);
  request.send();
}

function productsLoaded() {
  var form = document.getElementById("products");
  var line = firstTagChild(form);
  var select = firstNamedChild(line, "SELECT");
  var products = JSON.parse(this.responseText);

  for (p in products) {
       var option = document.createElement("option");
       option.value = products[p];
       option.text = products[p];
       select.appendChild(option);
  }
  
  // Saves the first line for easy cloning
  savedLine = line.cloneNode(true);
}

function firstTagChild(element) {
  var child = element.firstChild;
  while (child.nodeType != 1) 
    child = child.nextSibling;
  return child;
}

function firstNamedChild(element, name) {
  var sibling = element.firstChild;
  while (sibling.tagName != name)
    sibling = sibling.nextSibling;
  return sibling;
}

function addLine(form) {
  var form = document.getElementById("products");
  var add = firstNamedChild(form, "INPUT");
  form.insertBefore(savedLine.cloneNode(true), add);
}
