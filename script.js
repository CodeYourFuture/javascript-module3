//load the overlay
window.addEventListener("load",()=>{
	const overlay = document.getElementById('overlay');
	overlay.style.display = 'none';
});

const request = new XMLHttpRequest();
const serviceByAreas = document.getElementById('displayAreas');

request.open('GET', 'https://code-your-future.github.io/api-demo/area/index.json', true);
request.onload = element=>{
	if (request.status>=200 && request.status<400){
		let data = JSON.parse(request.responseText);
		for (let i = 0; i < data.data.length; i++) {
			//console.log(data.data);
			const element = document.createElement('div');
			element.style.margin = "2px 1px";
			element.style.width = "170px";
			element.innerHTML = '<button id = "btnArea" onclick = "areaData(\''+data.data[i]+'\')">'+data.data[i]+'</button>';
			serviceByAreas.appendChild(element);
		}
	}	else{ 
		console.log('Oh Oh! There seems to be a problem');
		//request.onerror();
		}
};
request.send();

//Display Error Message
request.onerror = ()=> {
	document.write("&#x21bb Something's Went Wrong! Please try Again! :(");
}

const areaData = id=> {
	const newRequest = new XMLHttpRequest();
	newRequest.open('GET','https://code-your-future.github.io/api-demo/area/'+ id +'/index.json', true);
	newRequest.onload = ()=> {
		serviceDetails.innerHTML = "";
		if (newRequest.status === 200) {
			let data = JSON.parse(newRequest.responseText);
			for (let j = 0; j < data.data.length; j++) {
				serviceProviders(data.data[j]);
			}
		}
		else{
			//request.onerror();
			console.log('Oh Oh! There seems to be a problem');
		}
	};
newRequest.send();
};
const serviceDetails = document.getElementById('displayServices');
const serviceProviders = service=> {
	let element = document.createElement('box');
	serviceDetails.innerHTML+= "<h2>" + service.organisation +"</h2>";
	let listing = document.createElement('div');
	listing.style.wordWrap = "break-word";
	let listingData = "<p><strong>Telephone: </strong>" + service.tel + "</p>";
	listingData += "<p><strong>Website: </strong>" + service.website + "</p>";
	listingData += "<p><strong>Email: </strong>" + service["email\r"] + "</p>";
	listingData += "<p><strong>Opening Hours: </strong>" + service.day + "</p>";
	listingData += "<p><strong>Help With: </strong>" + service.type + "</p>";
	listingData += "<p><strong>Services Provided: </strong>" + service.services + "</p>";
	listingData += "<p><strong>Clients: </strong>" + service.clients+ "</p>";
	listingData += "<p><strong>Areas Covered: </strong>"+ service.area+"</p>";
	listingData += "<p><strong>Borough: </strong>"+service.borough+"</p>";
	listingData += "<p><strong>How We Operate: </strong>"+service.process+"</p>";

	listing.innerHTML += listingData;
	element.appendChild(listing);
	serviceDetails.appendChild(element); 
}