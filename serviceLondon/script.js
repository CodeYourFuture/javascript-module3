
var request;
var url="https://code-your-future.github.io/api-demo/area/";
var flag;

window.onload = showHide('none');

function showHide(visibility){
	var elements =document.querySelectorAll('.sideMenu');
	elements = elements.length ? elements : [elements];
  	
  	for (var index = 0; index < elements.length; index++) {
    	elements[index].style.display = visibility;
  	}
}

function postResult(resultData)	{
	var parentContainer=document.getElementById('content');
	var output='';
	var resultContenter='';
	var orgName='';

	if(flag){
		for(var i=0;i<resultData.data.length;i++){
			output='';
			for(key in resultData.data[i]){
				if(key==='organisation')
				orgName=resultData.data[i][key];
				output+= "<p class='pStyle'><span>" + key.charAt(0).toUpperCase() +
						key.substr(1) + "</span> : " +resultData.data[i][key] + "</p>";
			}
			resultContenter+="<div class='resultBox'><header class='resultHeader'><p>" + orgName + "</p></header>" + output + "</div>"
		}
		parentContainer.innerHTML=resultContenter;
	}
	
}

function dataManager(serverData) {
	var output='';
	if(!flag){
		for (key in serverData.data) {
			output +='<a href ="#" data-src="' + url +serverData.data[key]+'/index.json" class="button">' + serverData.data[key] + '</a>';
		}
		var parentElement=document.getElementById('serviceMenu')
		parentElement.innerHTML = output;
		flag=1;
	}else
		postResult(serverData);	
}

function requestData(request,sourceUrl){
	
	if (window.XMLHttpRequest) {
		request=new XMLHttpRequest();
	} 

	request.open('GET', sourceUrl);
	
	loading('block');
	request.onreadystatechange = function() {
		if ((request.status === 200) &&
			(request.readyState === 4)) {

				data = JSON.parse(request.responseText);
				loading('none');
				dataManager(data);		
		} 
	} 
	request.send();
	
}
/**Loading while requesting data from the server*/

function loading(display){
	
	var myOverlay=document.querySelector('.overlay');
	if(display==='block'){
		myOverlay.style.display=display;
		var myh1=document.createElement('h1');
		myh1.innerHTML="Loading...";	
		myOverlay.appendChild(myh1);
	}else{
		var loadH1=document.querySelector('.overlay h1');
		myOverlay.style.display=display;
		loadH1.parentNode.removeChild(loadH1);
	}
	
}

/* populate button when the service button is clicked */

document.getElementById('service').addEventListener('click',function(e){
	flag=0;
	
	var mainUrl=url+"/index.json";
	requestData(request,mainUrl);
	showHide('block');

},false);

document.getElementById('serviceMenu').addEventListener('click',function(e){
	if(e.target.tagName==='A'){
		request=null;
		flag=1;
		requestData(request,e.target.getAttribute('data-src'));
	}

},false);


