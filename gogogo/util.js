function openTab(url) {
  var args = {'url' : url, 'selected':true};

  if (config.newTab) {
    chrome.tabs.create(args)
  } else {

    chrome.tabs.getSelected(
      null, 
      function(tab) {
	chrome.tabs.update(
	  tab.id, 
	  {"url" : url}
	);
	
      }
    );

  }
}

function updateDefinitions() {

  if (reloadData()) {
    console.log("Data already loaded!")
    return
  }

  Entries = [];
  LoadedEntries = [];

  // Updates the definitions
  localStorage["loadingPercentage"] = 0;
  config.Loading = true;

  fetchDocList();

  // TODO: Revert to old entries list if there is an error
  config.Loading = false;
  config.lastUpdated = (new Date()).getTime();
  
  saveEntries();
  saveConfig();
}

function saveEntries() {
  localStorage.Entries = JSON.stringify(Entries);
}

function loadEntries() {
  Entries = JSON.parse(localStorage.Entries);
}