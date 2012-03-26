
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    var matches = text.split("#");
    console.log("Matches:", matches)
    if ( matches.length == 2 && matches[1].length > 0 ) {
      suggest( findLinkMatches(matches[0], matches[1]) );
    } else {
      suggest( findMatches(matches[0]) );	
    }
    
  }
);

chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
    var root = sourceToURL(sources[config["source"]]);
    openTab(root + text);
  }
);

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    switch(request.type) {
    case 'update':
      updateDefinitions();      
      sendResponse({message:"Updating definitions", updating: true, config: config});
      break;
    case 'getConfig' :
      sendResponse({message: "Got config", config: config});
      break;      
    case 'saveConfig' :
      var newConfig = request.config;
      var requiresUpdate = false;

      if (config.source != newConfig.source) {
	requiresUpdate = true;
      } else {
	newConfig.Entries = config.Entries; // TODO: Keep definitions separate
      }

      initializeConfig(newConfig);

      if (requiresUpdate) {
	config.Loaded = 0; // Kind of silly I have to put it here. But there is a case where I update and don't need to reload
	updateDefinitions();
      }

      sendResponse({message: "Configuration saved.", updating: requiresUpdate, config: config});
      break;
    }
  }
);

initializeConfig();
updateDefinitions();
