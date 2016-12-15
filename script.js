var divContainer = document.getElementById("container");
var first = true;
function getData(url) {
	var http = new XMLHttpRequest();
	// Specify the Method and the URL we want to access
	http.open('GET', url);
	// Function to be called as the request happens
	http.onreadystatechange = function() {
		// readyState === 4 means the request has finished (http://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp)
		// status === 200  means the request was OK
		if (this.readyState === 4 && this.status === 200) {
			if (first) {
				logThis(this.responseText);// The body returned by the server (as a string)
				first = false;
			}else {
				logThat(this.responseText);
			};
		};
	};
	http.send(); // Make the request
};
function logThis(jsonString) {
	var myObject = JSON.parse(jsonString);
	console.log(myObject);
	for (var key in myObject) {
		for (var i in myObject[key]) {
			createBtn([myObject[key][i]]);
		};
	};
	addingEvents();
};
function logThat(jsonString) {
	createDiv();
	document.getElementById('info').innerHTML = '';
	var myObject = JSON.parse(jsonString);
	console.log(myObject);
	for (var i in myObject['data']) {
		for (var j in myObject['data'][i]) {
			document.getElementById('info').innerHTML += ([j] + ':  ' + myObject['data'][i][j] + '</br>');
		};
		document.getElementById('info').innerHTML += '</br>' + '--------------' + '</br>';
	};
};
function createBtn(textNode) {
	var btn = document.createElement("BUTTON");
	var text = document.createTextNode(textNode);
	btn.appendChild(text);
	var attr = document.createAttribute("class")
	attr.value = "btnArea";
	btn.setAttributeNode(attr);
	divContainer.appendChild(btn);
	// var x = document.getElementById("container");
	// for (var i = 0; i < 1; i++) {
	// 	x.innerHTML += '<button type="button" class="btn" onclick="logThis()">' + textNode + '</button>';
	// }
};
function createDiv() {
	var div = document.createElement("DIV");
	var attr = document.createAttribute("id")
	attr.value = "info";
	div.setAttributeNode(attr);
	divContainer.appendChild(div);
};
function addingEvents() {
	var btn = document.getElementsByTagName('button');
	for (var i = 0; i < btn.length; i++) {
		btn[i].addEventListener('click',info);
	};
};
function info() {
	var t = this.innerHTML;
	var url = 'https://code-your-future.github.io/api-demo/area/' + t + '/index.json';
	getData('https://code-your-future.github.io/api-demo/area/' + t + '/index.json');
};
getData('https://code-your-future.github.io/api-demo/area/index.json');