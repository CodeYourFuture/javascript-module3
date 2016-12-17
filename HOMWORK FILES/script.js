function load() {
  createMap();
  createButtons();
}

function createMap() {
  var map = document.createElement('img');
  map.setAttribute('src', 'images/map.png');
  map.setAttribute('width', '100%');
  document.getElementById('pic').appendChild(map);
}
function createButtons() {

  var http = new XMLHttpRequest;
  http.open('GET', "https://code-your-future.github.io/api-demo/area/index.json");
  http.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      var myData = JSON.parse(http.responseText);

      var buttons = '';
      var searchBar = document.getElementById('search');

      for(var i=0; i<myData.data.length; i++) {
          buttons = '<button id="btn-' + myData.data[i] + '" type=\"button\" onClick=createSubButtons("' + myData.data[i] + '")>' + myData.data[i] + '</button>';
        document.getElementById('pop-ups').innerHTML += buttons;
      }
      // live search
      for(var i=0; i<myData.data.length; i++) {
        if(myData.data[i].toLowerCase().search(searchBar.value.toLowerCase()) !== -1) {
          console.log(searchBar.value);
        } // if ends
      }// for ends
    }
  }
  http.send();
}


function createSubButtons(areaName) {
  var http = new XMLHttpRequest;
  http.open('GET', "https://code-your-future.github.io/api-demo/area/" + areaName + "/index.json");
  http.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      document.getElementById('sub-pop-ups').innerHTML = "" ;
      var myData = JSON.parse(http.responseText);
      var buttons = '';
      for(var i=0; i<myData.data.length; i++) {
          buttons = '<button id="btn-' + myData.data[i].organisation + '" type=\"button\" onClick=createBox("' + myData.data[i].borough + '")>' + myData.data[i].organisation + '</button>';
          document.getElementById('sub-pop-ups').innerHTML += buttons;
          console.log(' : ' + myData.data[i].organisation);

        console.log("----------------------------------------");

      }
    }
  }
  http.send();
}
// I have a problem here
function createBox(boroughName) {
  var newBoroughName = boroughName.replace(' ' , '-');
  var http = new XMLHttpRequest;
  http.open('GET', "https://code-your-future.github.io/api-demo/borough/" + newBoroughName + "/index.json");
  http.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      var myData = JSON.parse(http.responseText);

      document.getElementById('pp').innerHTML = "";
      // OMG OMG OMG this is the most stuoied thing I've ever been through
      for(var i=0; i<myData.data.length; i++) {
        document.getElementById('pp').innerHTML += "<p><strong>organisation : </strong>" + myData.data[i].organisation + "<br>"
                                                  + "<p><strong>Website:  </strong>" + myData.data[i].website; + '<br>'
                                                  + "<p><strong>Email : </strong>" + myData.data[i].email + '<br>'
                                                  + "<p><strong>days : </strong>" + myData.data[i].days;
      }
    }
  }
  http.send();

}

function reqSearch() {

  var http = new XMLHttpRequest;
  http.open('GET', "https://code-your-future.github.io/api-demo/area/index.json");
  http.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      var myData = JSON.parse(http.responseText);


      var searchBar = document.getElementById('search');
      // live search
      for(var i=0; i<myData.data.length; i++) {
        if(myData.data[i].toLowerCase().search(searchBar.value.toLowerCase()) !== -1) {
          console.log(searchBar.value);
          createSubButtons(myData.data[i]);
        } // if ends
      }// for ends
    }
  }
  http.send();
}
