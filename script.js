	
	var immigration = document.getElementById("container");
	var btn = document.getElementById("btn");
	var link="https://code-your-future.github.io/api-demo/area/";
	var currentOption=false;

	function requestData(dataSource){

		var ourRequest = new XMLHttpRequest();
		
		ourRequest.open('GET', dataSource, true);
		ourRequest.onload = function () {

			//if (request.status >= 200 && request.status < 400) {
		var ourData = JSON.parse(ourRequest.responseText);
		//if the operation is true run renderhtml()
		if(!currentOption){
			renderHTML(ourData);
		}
		else{ 

			for (var i = 0; i<ourData.data.length; i++) {
				
				//for (var j = 0; j<ourData.data[i].length; j++) {
					for(key in ourData.data[i]){
						//console.log(ourData.data[i][key]);
						//document.write(ourData.data[i][key])
						var keyInfo = (ourData.data[i]);
						//I want to harvest the index item ie website, area, telephone..etc
						//console.log(ourData.data[i]);
						var displayInfo = (ourData.data[i][key]);
						console.log(displayInfo);
				}
		}

		}
			

		};
		ourRequest.send();
		
	}
	
	function renderHTML(data) {
		var htmlString = "";
		for (i = 0; i < data.data.length; i++) {
			//htmlString+= "<a href='" + link + data.data[i] + "/index.json'>" + data.data[i]+"</a><br>"; //Change it to button
			htmlString+= "<a href='#' alt='" + link + data.data[i] + "/index.json'>" + data.data[i]+"</a><br>"; 
			//console.log (htmlString);
		}
		immigration.innerHTML=htmlString;
		//container.insertAdjacentHTML('beforeend', htmlString);
	}

	btn.addEventListener("click", function() {
		requestData(link+"/index.json");
	})

	document.getElementById('container').addEventListener('click',function(q){
			if(q.target.tagName==='A'){
				//console.log(q.target.getAttribute('alt'));
				currentOption=true;
				requestData(q.target.getAttribute('alt'));

			}

	},false)
	


	/* I am not sure how to do the rest. I can't understand how to get the other url 
		to work so I can assign a button to call the JSON data. I am going to continue to 
		try to understand it*/