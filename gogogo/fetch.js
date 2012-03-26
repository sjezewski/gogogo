function fetchDocList() {
  var url = sourceToURL(sources[config["source"]]);
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function(evt) {
    if (xhr.readyState == 4 && xhr.responseText) {
      parseDocList(xhr.responseText);
    }
  });
  xhr.open('GET', url, true);
  xhr.send();	
}

function fetchLinks(entryIndex, path) {
  var url = sourceToURL(sources[config["source"]]) + path;
  

  console.log("Fetching links for : " + url);
  var xhr = new XMLHttpRequest();
  xhr.addEventListener(
    'readystatechange', 
    function(index, sourceURL) {
      return function(evt) {
      	if (xhr.readyState == 4 && xhr.responseText) {
	  parseLinks(index, sourceURL, xhr.responseText);
	}
      }
    }(entryIndex, path)
  );
  xhr.open('GET', url, true);
  xhr.send();			
}