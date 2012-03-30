var LoadedEntries = [];

function parseDocList(raw) {
  
  var rawHTML = raw.match(/<table.*?>([\s\S]*?)<\/table>/)[1];
  var docTable = document.createElement("table");
  docTable.innerHTML = rawHTML;
  
  var entries = docTable.querySelectorAll("td > a");

  if (entries[0].getAttribute('href') == "..") {
    entries = Array.prototype.slice.call(entries, 1, entries.length);
  }
  
  for(var i = 0; i < entries.length; i++ ) {
    var entry = entries[i];
    description = getDescription(entry);
    var href = entry.getAttribute('href');

    config.Entries.push({'path': href, 'name': entry.innerText, 'desc' : description});
    fetchLinks(i, href);
  }	
  
}

var linkSelectors = {
  "stable" : "#manual-nav > h2[id], #manual-nav > h3[id]",
  "weekly" : "#manual-nav > h2[id], #manual-nav > h3[id]"
};

/* 
 * Links are functions / constants / variables
 */

function parseLinks(entryIndex, sourceURL, rawDoc){
  
  var doc = document.createElement("root");
  doc.innerHTML = rawDoc;
  
  var links = doc.querySelectorAll(linkSelectors[config.source]);
  var entry = config.Entries[entryIndex];
  var foundLink = false;
  
  for(var i=0; i < links.length; i++){
    var link = links[i];
    
    var name = link.getAttribute('id');
    var href = sourceURL + "#" + name;

    if (name != "Subdirectories") {
      var matches = link.innerText.match(/(\w*?)\s/);
      var type;

      if (matches === null){
	matches = name; // e.g. 'Constants' / 'Variables'
      } else {
	type = matches[1];			
      }
      
      if (!foundLink) {
	entry['links'] = [];
	foundLink = true;				
      }

      var thisLink = {
	'name' : name,
	'type' : type,
	'href' : href
      };
      
      // If its a function grab its signature
      if (type == "func") {
	var code = link.nextElementSibling;
	thisLink['signature'] = code.innerText;
      }						
      
      entry['links'].push(thisLink);						
    }
  }
  LoadedEntries.push(entryIndex);
  config.Loaded = LoadedEntries.length / config.Entries.length;
  var percentage = (100*config.Loaded).toFixed(0);
  console.log("Loaded " + percentage + "%");
  localStorage["loadingPercentage"] = percentage;
}

function getDescription(entry) {
  var descElem = null;
  var desc = "";
  var candidates = entry.parentElement.parentElement.querySelectorAll("td");

  for(var i=0; i < candidates.length; i++) {
    var candidate = candidates[i];
    if (candidate != entry) {
      descElem = candidate;
    }
  }
  
  if (descElem !== null) {
    desc = descElem.innerText;
  }
  
  return desc.replace("\n", " ");
}
