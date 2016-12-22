window.onload = function() {
  // create dropdown div
  var menue = document.createElement('div');
  menue.id = "dropDownMenue";
  var panel = document.createElement('div');
  panel.id = "show"
  document.body.appendChild(menue);
  document.body.appendChild(panel);
  areaRequest();
}// load


// create buttons
function createButtons(areaName) {
  return  "<button id='" + areaName + "' onClick=createList('" + areaName + "');>" + areaName + "</button>";
}

// area request
function areaRequest() {
  fetch('https://code-your-future.github.io/api-demo/area/index.json')
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    console.log(json.data);
    for(var i=0; i<json.data.length; i++){
      document.getElementById('dropDownMenue').innerHTML += createButtons(json.data[i]);

    }
  })
  .catch(function(error){
    console.log(error);
  })
}


// createLiist
function createList(areaName) {
  fetch('https://code-your-future.github.io/api-demo/area/' + areaName  + '/index.json')
  .then(function(response){
    document.getElementById('show').innerHTML = "";
    return response.json();
  })
  .then(function(json){
    for(key in json.data){
    document.getElementById('show').innerHTML += createTemplate(json.data[key]);
    console.log(json.data[key]);
  }
  })
  .catch(function(error){
    console.log(error);
  })
}
function createTemplate(myData) {
  return "<div id ='each-org'><div id='org-name'><strong>organaisation : </strong>" + myData.organisation + "</div>" +
                             "<div id='web-name'><strong>website : </strong><a href='"+myData.website +"'>" + myData.website + "</a></div>" +
                             "<div id='email-name'><strong>Email : </strong>" + myData.email + "</div>" +
                             "<div id='area-name'><strong>Area : </strong>" + myData.area + "</div>" +
                             "<div id='process-name'><strong>Process : </strong>" + myData.process + "</div>" +
                             "<div id='web-name'><strong>Clients : </strong>" + myData.clients + "</div>" +
                             "<div id='web-name'><strong>Days : </strong>" + myData.days + "</div>" +
                             "<div id='web-name'><strong>Telephone : </strong>" + myData.telephone + "</div>" +
                             "<div id='web-name'><strong>Services : </strong>" + myData.services + "</div>" +
                             "<div id='web-name'><strong>Borough : </strong>" + myData.borough + "</div>"
                             "<div id='web-name'><strong>Type : </strong>" + myData.type + "</div></div>";

}
