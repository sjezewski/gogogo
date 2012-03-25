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

config.LastUpdated = "?";
config.UpdateRule = "";

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

updateDefinitions();