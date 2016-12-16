
var request;
var url="https://code-your-future.github.io/api-demo/area/";
var flag=0;

function postResult(resultData)	{
	var parentContainer=document.getElementById('content');
	var output;
	var resultContenter;
	
	for(var i=0;i<resultData.data.length;i++){
		
		for(key in resultData.data[i]){
			output+= "<h5>" + key + " : " +resultData.data[i][key] + 
					"</h5>";
		}
		resultContenter+="<div class='resultBox'>" + output + "</div>"
		output=null;

	}

	parentContainer.innerHTML=resultContenter;
}

function dataManager(serverData) {
	var output='';
	if(!flag){
		
		for (key in serverData.data) {
			output +='<a href ="#" data-src="' + url +serverData.data[key]+'/index.json" class="button">' + serverData.data[key] + '</a>';
		}
		var parentElement=document.getElementById('serviceMenu')
		parentElement.innerHTML = output;
	}else
		postResult(serverData);	
		
}

function requestData(request,sourceUrl){
	
	if (window.XMLHttpRequest) {
		request=new XMLHttpRequest();
	} 

	request.open('GET', sourceUrl);
	request.onreadystatechange = function() {
		if ((request.status === 200) &&
			(request.readyState === 4)) {

				data = JSON.parse(request.responseText);
				dataManager(data);
					
			} 
		} 
		request.send();
}
/* populate button when the service button is clicked */

document.getElementById('service').addEventListener('click',function(e){
	var mainUrl=url+"/index.json";
	requestData(request,mainUrl);
},false);

document.getElementById('serviceMenu').addEventListener('click',function(e){
	if(e.target.tagName==='A'){
		flag=1;
		request=null;
		requestData(request,e.target.getAttribute('data-src'));
	}

},false);