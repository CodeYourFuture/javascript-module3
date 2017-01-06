
// Hide search result panel when the page load 
window.onload = resultPanel('none');

function resultPanel(display){
	const	resultPanel=document.getElementById('searchResult');
			resultPanel.style.display=display;	
}

document.mainForm.chooseType.onchange = function(evt){
	if(evt.target.selectedIndex != 0){ 
		let url='https://code-your-future.github.io/api-demo/' + getSearchParameter(evt) + '/index.json';		
		excute(generator(url,evt));
	}
}

function getSearchParameter(evt){
	let indexSelected=document.mainForm.chooseType.selectedIndex,
		selectedValue=document.mainForm.chooseType[indexSelected].value;
	if(evt.target.tagName != 'INPUT'){
		return selectedValue;
	}else{		
		return selectedValue + '/' + evt.target.value;
	}			
}

function*generator(url,evt){
	const txtSearch=document.getElementById('search');
	const response=yield fetch(url);
	const post=yield response.json();// it return promise and yield it 
	const searchOptions=post.data;
		
	populateData(searchOptions,evt);
}

function excute(generator){
	const iterator = generator;
	const iteratorNext=iterator.next();// start the excution of the generator and 
										//it return a promise
	const promise=iteratorNext.value;
	promise.then(response => {
		const anotherIterator=iterator.next(response)
		const anotherPromise=anotherIterator.value
		anotherPromise.then(post =>iterator.next(post))
	})
}

function populateData(service,evt){	

	if(evt.target.tagName != 'INPUT'){
		const dataList=document.getElementById('typeService');	
		removeChildElement(dataList);
		service.forEach(items =>{
			let option=document.createElement('option');
			option.value= items.charAt(0).toUpperCase()+items.slice(1);
			dataList.appendChild(option);		
		})
		document.getElementById('search').value='';
	}else{
		displaySearchResult(service);
		resultPanel('block');
	}
}

function displaySearchResult(service){
	var parentContainer=document.getElementById('searchResult');
	let output='',
		resultContenter='',
		orgName='',
		totalResult = 0;
	
	service.forEach(items => {
		totalResult++;
		for(key in items){
			if(key==='organisation' || key==='Organisation' )
				orgName=items[key];
			output+= "<p> <span>" + key.charAt(0).toUpperCase() +
					key.substr(1) + "</span> : " + getItemsValue(items, key) + "</p>";
		}
		resultContenter+="<fieldset> <legend>"+ orgName+"</legend>"+output +"</fieldset>";
		output='';
	})	
	parentContainer.innerHTML="<legend>Search Result [ " + totalResult +"]</legend>" + resultContenter;
}		

function getItemsValue(items,key){
	if(key==='Website' || key==='website')
		return "<a target='blank' href='"+items[key]+ "'>" + items[key] + "</a>"
	else
		return items[key];
}

function removeChildElement(datalist){
	let childElements = datalist.children;
	  	numberChildElement = childElements.length;
    while(numberChildElement > 0) {
    	numberChildElement--;
    	datalist.removeChild(childElements[numberChildElement]);
    }
}

document.mainForm.searchField.onkeypress= function(evt){
	if(evt.keyCode===13){
		evt.preventDefault();
		let url='https://code-your-future.github.io/api-demo/' + getSearchParameter(evt) + '/index.json';		
		excute(generator(url,evt));
	}
}




