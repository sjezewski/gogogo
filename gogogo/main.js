var config = {};

var defaults = {
  "updateRule" : "weekly",
  "updateDay" : "Sunday",
  "source" : "stable"
};

// For now, config === defaults
config = defaults;

var sources = {
  "stable" : "golang.org",
  "weekly" : "weekly.golang.org"
};

function sourceToURL(source) {
  return "http://" + source + "/pkg/";
}

function initializeConfig() {
  config.LastUpdated = "?";
  config.Loaded = 0;
}

// TODO : Compare the localstorage config against the local config for any changes.
//        If the source has changed, force a re-load. Its lame that I have to wait till
//        the user requests something w the new source before updating. The alternatives
//        are polling or message passing.

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

initializeConfig();
updateDefinitions();