	var immigration = document.getElementById("immigrationBlurb");
	var btn = document.getElementById("btn");

	btn.addEventListener("click", function() {
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', 'https://code-your-future.github.io/api-demo/area/index.json', true);
		
		ourRequest.onload = function () {
		var ourData = JSON.parse(ourRequest.responseText);
		//console.log(ourData.data[1]); loads second item in array "Central"
		renderHTML(ourData);
		};
	ourRequest.send();
	});

	function renderHTML(data) {
		var htmlString = "";
		for (i = 0; i < data.data.length; i++) {
			htmlString+= "<p>" + data.data[i] + " is all the service providers in the " + data.data[i] + ".</p>";
			console.log (htmlString);
		}
		immigrationBlurb.insertAdjacentHTML('beforeend', htmlString);
	}
	/* I am not sure how to do the rest. I can't understand how to get the other url 
		to work so I can assign a button to call the JSON data. I am going to continue to 
		try to understand it*/