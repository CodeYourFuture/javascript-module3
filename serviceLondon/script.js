
var request;
var url="https://code-your-future.github.io/api-demo/area/";
var flag;
/** Hide the list of service section when the page load*/
window.onload = showHide('none');
/** Make hide / show the list of service */
function showHide(visibility){
	var elements =document.querySelectorAll('.sideMenu');
	elements = elements.length ? elements : [elements];
  	
  	for (var index = 0; index < elements.length; index++) {
    	elements[index].style.display = visibility;
  	}
}

/** Receive the data loead to the page result section */
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
/** Receive the data from the data source and load to the page */
function dataManager(sourceUrl) {
	var output='';
	var serverData =requestData(sourceUrl);

	serverData.then(function(returnData){
		//console.log(data);
		var jsonData=JSON.parse(returnData);
		if(!flag){		
		
			jsonData.data.forEach(function(val){
			output +='<a href ="#" data-src="' + url +val+'/index.json" class="button">' + val + '</a>';
			})
			
			var parentElement=document.getElementById('serviceMenu')
			parentElement.innerHTML = output;
			flag=1;
		}else
			postResult(jsonData);	
			

	}).catch(function(err){
		console.log("ops error : " + err);
	})
	
}

/** Request the data from the data source */

function requestData(Url){
	
	return new Promise(function(resolve, reject){
		var request=new XMLHttpRequest();
		request.open('GET',Url,true);

		request.onload=function(){
			if (request.status === 200){
				resolve(request.response);
			}else{
				reject(Error(request.statusText));
			}
		};

		request.onerror=function(){
			reject(Error("Network Error"));
		};

		request.send();

	});
	
}
	
/*	
	//loading('block');
	request.onreadystatechange = function() {
		 &&
			(request.readyState === 4)) {

				data = JSON.parse(request.responseText);
				loading('none');
				dataManager(data);		
		} 
	} 
	request.send();
	
}*/

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
/*
document.getElementById('service').addEventListener('click',function(e){
	flag=0;
	
	var mainUrl=url+"index.json";
	dataManager(mainUrl);
	showHide('block');

},false);
*/
/* Make request and populate the data in each site*/
document.getElementById('serviceMenu').addEventListener('click',function(e){
	if(e.target.tagName==='A'){
		request=null;
		flag=1;
		requestData(request,e.target.getAttribute('data-src'));
	}

},false);


