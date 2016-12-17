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
				logAreas(this.responseText);// The body returned by the server (as a string)
				first = false;
			}else {
				logAreaInfo(this.responseText);
			};
		};
		loadingFinished();
	};
	http.send(); // Make the request
};
function logAreas(jsonString) {
	var myObject = JSON.parse(jsonString);
	for (var key in myObject) {
		for (var i in myObject[key]) {
			createBtn([myObject[key][i]]);
		};
	};
	addingEvents();
};
function logAreaInfo(jsonString) {
	var myObject = JSON.parse(jsonString);
	var counter = 0;
	for (var i in myObject['data']) {
		createDiv('info');
		for (var j in myObject['data'][i]) {
			document.getElementsByClassName('info')[counter].innerHTML += ('<p>' + '<strong>' + [j] + ':  ' + '</strong>'  + myObject['data'][i][j] + '</p>' );
		};
		counter++;
	};
};
function createBtn(textNode) {
	var btn = document.createElement("BUTTON");
	var text = document.createTextNode(textNode);
	btn.appendChild(text);
	var attr = document.createAttribute("class")
	attr.value = "btnArea";
	btn.setAttributeNode(attr);
	attr = document.createAttribute("type")
	attr.value = "button";
	btn.setAttributeNode(attr);
	document.getElementById("buttons").appendChild(btn);
	// var x = document.getElementById("container");
	// for (var i = 0; i < 1; i++) {
	// 	x.innerHTML += '<button type="button" class="btn" onclick="logThis()">' + textNode + '</button>';
	// }
};
function createDiv(className) {
	var div = document.createElement("DIV");
	var attr = document.createAttribute("class")
	attr.value = className;
	div.setAttributeNode(attr);
	document.getElementById("content").appendChild(div);
};
function removeDiv(className) {
	var child = document.getElementsByClassName(className);
	var parent = document.getElementById("content");
	/* didn't work
	for (var i = child.length; i >0; i--) {
	 	parent.removeChild(child[i]);
	};
	*/
	while (child.length > 0) {
		parent.removeChild(child[0]);
	};
};
function addingEvents() {
	var btn = document.getElementsByClassName('btnArea');
	for (var i = 0; i < btn.length; i++) {
		btn[i].addEventListener('click',getAreaInfo);
	};
};
function getAreaInfo() {
	startLoading();
	removeDiv('info');
	var t = this.innerHTML;
	var url = 'https://code-your-future.github.io/api-demo/area/' + t + '/index.json';
	getData('https://code-your-future.github.io/api-demo/area/' + t + '/index.json');
};
window.onload = function () {
	startLoading();
	getData('https://code-your-future.github.io/api-demo/area/index.json');
};
function loadingFinished() {
	var elem = document.getElementById('loading');
	elem.style.visibility = 'hidden';
	elem.style.transitionDuration = '0.4s';
};
function startLoading() {
	var elem = document.getElementById('loading');
	elem.style.visibility = 'visible';
	elem.style.transitionDuration = '0s';
};
