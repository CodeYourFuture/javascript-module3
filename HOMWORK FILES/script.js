// when loading the page
function load() {
  // creatingthe map
  var map = document.createElement("img");
  map.setAttribute('src', 'images/map.png');
  document.getElementById('pic').appendChild(map);

  // create buttons
}
// Ajax API
function request() {
  var http = new XMLHttpRequest;
  http.open('GET', "https://code-your-future.github.io/api-demo/index.json");

  http.onreadystatechange = function() {

  if(this.readyState === 4 && this.status === 200 ) {
    //parsing json file
    var myData = JSON.parse(http.responseText);

    // set a var for search object
    var searchBar = document.getElementById('search');

    // looping through json file 
    for(var i=0; i<myData.data.length; i++) {
      for(key in myData.data[i]) {

        // check if the value exsiest
        if(myData.data[i][key].toLowerCase().search(searchBar.value.toLowerCase()) !== -1) {
          // how to print all current Objects
          demo(myData.data[i].toSource());
          // check the outputs
          console.log(myData.data[i][key]);
        }

        }
      }
    }
  }
  http.send();
}
// this is for demostration
function demo(data) {
    document.getElementById('pp').innerHTML += data + "<br>";
}
