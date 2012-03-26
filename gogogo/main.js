
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
      var newConfig = request.config;
      updateDefinitions();      
      sendResponse({message:"Updating definitions", updating: true});
      break;
    case 'getConfig' :
      sendResponse(config);
      break;      
    case 'saveConfig' :
      var newConfig = request.config;
      var requiresUpdate = false;

      if (config.source != newConfig.source) {
	requiresUpdate = true;
      }

      initializeConfig(newConfig);

      if (requiresUpdate) {
	updateDefinitions();
      }

      sendResponse({message: "Configuration saved.", updating: requiresUpdate});
      break;
    }
  }
);

initializeConfig();
updateDefinitions();