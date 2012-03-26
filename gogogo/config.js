var config = {};

var defaults = {
  "updateRule" : "manual",
  "updateDay" : "Sunday",
  "updateHour" : "",
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

  newConfig.Initialized = true;

  for (var fieldName in defaults) {
    if (!newConfig[fieldName]) {
      newConfig[fieldName] = defaults[fieldName];
    }
  }

  newConfig.nextUpdate = config.nextUpdate; // If I need to string along more than one field, I'll make this a loop

  newConfig.sourceURL = sourceToURL(sources[newConfig.source]);

  config = newConfig;
}

