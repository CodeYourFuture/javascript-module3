var jsonString;
var divContainer = document.getElementById("container");
var first = true;

var http = new XMLHttpRequest();
/*******
// Specify the Method and the URL we want to access
http.open('GET', 'https://code-your-future.github.io/api-demo/area/index.json');

// Function to be called as the request happens
http.onreadystatechange = function() {
	// readyState === 4 means the request has finished (http://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp)
	// status === 200  means the request was OK
	if (this.readyState === 4 && this.status === 200) {
		jsonString = (this.responseText); // The body returned by the server (as a string)
		logThis();
	}
}
http.send(); // Make the request
*******/

function getData(url) {
	http.open('GET', url);
	http.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			jsonString = (this.responseText); // The body returned by the server (as a string)
			if (first) {
				logThis();
				first = false;
			}else {
				logThat();
			};
		};
	};
	http.send();
};
function logThis() {
	var myObject = JSON.parse(jsonString);
	for (var key in myObject) {
		for (var i in myObject[key]) {
			createBtn([myObject[key][i]]);
		};
	};
	addingEvents();
};
function logThat() {
	document.getElementById('info').innerHTML = '';
	var myObject = JSON.parse(jsonString);
	for (var i in myObject['data']) {
		for (var j in myObject['data'][i]) {
			document.getElementById('info').innerHTML += ([j] + ':  ' + myObject['data'][i][j] + '</br>');
		};
		document.getElementById('info').innerHTML += '</br>' + '--------------' + '</br>';
	};
}
function createBtn(textNode) {
	var btn = document.createElement("BUTTON");
	var text = document.createTextNode(textNode);
	btn.appendChild(text);
	divContainer.appendChild(btn);
	// var x = document.getElementById("container");
	// for (var i = 0; i < 1; i++) {
	// 	x.innerHTML += '<button type="button" class="btn" onclick="logThis()">' + textNode + '</button>';
	// }
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
	console.log(t , url);
	getData('https://code-your-future.github.io/api-demo/area/' + t + '/index.json');
	

}
getData('https://code-your-future.github.io/api-demo/area/index.json');