// Hide search result panel when the page load 
window.onload = resultPanel('none');

function resultPanel(display){
	const	resultPanel=document.getElementById('searchResult');
			resultPanel.style.display=display;
	
}

document.mainForm.chooseType.onchange = function(evt){
	if(evt.target.selectedIndex != 0){ 
		let url='https://code-your-future.github.io/api-demo/' + getSearchParameter(evt) + '/index.json';		
		excute(generateor(url,evt));
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


function*generateor(url,evt){
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
	}else{
		service.forEach(items => {
			console.log(service);
		})	
		resultPanel('block');
	}
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
		excute(generateor(url,evt));
		
		//alert(getSearchOption(evt));		
	}
}




