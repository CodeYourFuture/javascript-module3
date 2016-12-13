// when loading the page
function load() {
  // creatingthe map
  var map = document.createElement("img");
  map.setAttribute('src', 'images/map.png');
  document.getElementById('pic').appendChild(map);
}
// Ajax API
function request() {

  var http = new XMLHttpRequest;
  http.open('GET', "https://code-your-future.github.io/api-demo/area/index.json");

  http.onreadystatechange = function() {

  if(this.readyState === 4 && this.status === 200 ) {
    //parsing json file
    var myData = JSON.parse(http.responseText);

    // set a var for search object
    var searchBar = document.getElementById('search');

    // looping through the json links
    for(var i=0; i<myData.data.length; i++) {
      // check if the value exsiest
      if(myData.data[i].toLowerCase().search(searchBar.value.toLowerCase()) !== -1) {
        document.getElementById('pp').innerHTML = myData.data[i];
      }
      // check the value of the search bar
      console.log(search.value);
    }
    }
  }
  http.send();
}
