var request;
var url="https://code-your-future.github.io/api-demo/area/";
var flag=0;
function dataManager(serverData) {
	var output='';
	if(!flag){
		
			for (key in serverData.data) {
				output +='<a href = "' + url +serverData.data[key]+'/index.json" class="button">' + serverData.data[key] + '</a>';
				     
			}
		}
		var parentElement=document.getElementById('serviceMenu')
		parentElement.innerHTML = output;
}

function requestData(request,sourceUrl){
	
	if (window.XMLHttpRequest) {
		request=new XMLHttpRequest();
	} else {
		//request=new ActiveXObject(uri);
	}

	request.open('GET', sourceUrl);
	request.onreadystatechange = function() {
		if ((request.status === 200) &&
			(request.readyState === 4)) {

				info = JSON.parse(request.responseText);
				dataManager(info);
					
			} //ready
		} //event
		request.send();
}
/* populate button when the service button is clicked */

document.getElementById('service').addEventListener('click',function(e){
	mainUrl=url+"/index.json";
	requestData(request,mainUrl);
},false);
