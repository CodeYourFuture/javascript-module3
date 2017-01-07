window.addEventListener("load", function(){
  var load_screen = document.getElementById("load_screen");
  document.body.removeChild(load_screen);
});

var request = new XMLHttpRequest();
var areaInfoContainer = document.getElementById('area-Info');

function clearAreaInfo() {
  areaInfoContainer.innerHTML = "";
};

request.open('GET', 'https://code-your-future.github.io/api-demo/area/index.json', true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Convert the JSON response into an array.
    var data = JSON.parse(request.responseText);
    // Loop through the array.
    for(var i = 0;i < data.data.length; i++) {
      var element = document.createElement('div');
      element.style.margin="3px 0";
      element.style.width ="28%";
      element.innerHTML = '<button id="btnid" onclick="areaData(\''+data.data[i]+'\')">'+data.data[i]+'</button>';
      document.getElementsByTagName('body')[0].appendChild(element);
    }
  } else {
    // We reached our target server, but it returned an error
  }
};


request.send();

request.onerror=function(){
    console.log("Connection error");
}

// Get the data from the page.
   var areaData= function(id) {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://code-your-future.github.io/api-demo/area/' + id + '/index.json', true);
    ourRequest.onload = function() {
      if (ourRequest.status === 200) {
        clearAreaInfo();
        var data = JSON.parse(ourRequest.responseText);
        for (var j = 0; j < data.data.length; j++) {
          appenAreaInfoHTML(data.data[j]);
        } 
    }else {
      // If there was an error, alert the user.
      alert('Something went wrong!');
    }
  };
  ourRequest.send();
};

function appenAreaInfoHTML(areaInfo){
  // this element is where you put the info about the one specific area
  // because this will repeat as many times as many areas are there
  // so you will create new element for each area.
  var element = document.createElement('div');
  element.innerHTML = "<h2>" + areaInfo.organisation + "</h2>"
  element.style.border="2px solid black";
  element.style.margin="3px 0";
  element.style.backgroundColor="#DAF7A6";
  var elementList = document.createElement('ul');
  // infoItems += ... means you are adding new string to already existing one
  console.log (elementList);
  var infoItems = JSON.parse(request.responseText);
  infoItems = "<li><b>Website:</b> " + areaInfo.website + "</li>";
  infoItems += "<li><b>Services:</b> " + areaInfo.services + "</li>";
  infoItems += "<li><b>Email:</b> "+ areaInfo["email\r"] + "</li>";
  infoItems += "<li><b>Telephone:</b> " + areaInfo.tel + "</li>";
  infoItems += "<li><b>Opening Hours:</b> " + areaInfo.day + "</li>";
  infoItems += "<li><b>Type:</b> " + areaInfo.type + "</li>";
  infoItems += "<li><b>Clients:</b> " + areaInfo.clients + "</li>";
  infoItems += "<li><b>Process:</b> " + areaInfo.process + "</li>";
  infoItems += "<li><b>Areas Covered:</b> " + areaInfo.area +"</li>";
  infoItems += "<li><b>Borough:</b> " + areaInfo.borough + "</li>";

  elementList.innerHTML = infoItems;
  
  element.appendChild(elementList);
  areaInfoContainer.appendChild(element);
}