var config = {};

var defaults = {
  "updateRule" : "manual",
  "updateDay" : "Sunday",
  "source" : "weekly"
};

var sources = {
  "stable" : "golang.org",
  "weekly" : "weekly.golang.org"
};

function sourceToURL(source) {
  return "http://" + source + "/pkg/";
}

function initializeConfig(newConfig) {
  if (newConfig === undefined) {
    newConfig = {};
  }

  newConfig.LastUpdated = "?";
  newConfig.Initialized = true;


  for (var fieldName in defaults) {
    if (!newConfig[fieldName]) {
      newConfig[fieldName] = defaults[fieldName];
    }
  }

  newConfig.sourceURL = sourceToURL(sources[newConfig.source]);

  config = newConfig;
}

