function openTab(url) {
  var args = {'url' : url, 'selected':true};

  if (config.newTab) {
//    chrome.tabs.create(args, function(tab) {myTab = tab;})
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
  // Updates the definitions
  localStorage["loadingPercentage"] = 0;
  config.Loading = true;

  // TODO : Later I'll revert if there's an error
  // config._Entries = config.Entries;

  config.Entries = [];
  LoadedEntries = [];

  fetchDocList();

  // TODO: Revert to old entries list if there is an error
  config.Loading = false;

  config.lastUpdated = new Date();
  localStorage["lastUpdated"] = String(config.lastUpdated);
}
