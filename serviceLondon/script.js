
var request;
var url="https://code-your-future.github.io/api-demo/area/";
var flag=0;

function postResult(resultData)	{
	var parentContainer=document.getElementById('content');
	var output='';
	var resultContenter='';
	var orgName='No name';
	
	for(var i=0;i<resultData.data.length;i++){
		output='';
		for(key in resultData.data[i]){
			
			if(key==='organisation')
				orgName=resultData.data[i][key];

			output+= "<p class='pStyle'><span>" + key.charAt(0).toUpperCase() +
					key.substr(1) + "</span> : " +resultData.data[i][key] + 
					"</p>";
		}
		resultContenter+="<div class='resultBox'><header class='resultHeader'><p>" + orgName + "</p></header>" + output + "</div>"
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
	
	var resultParent=document.getElementsByClassName('resultBox');
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