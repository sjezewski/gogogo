var config = {};

var defaults = {
  "updateRule" : "weekly",
  "updateDay" : "Mon",
  "updateHour" : 3,
  "source" : "stable"
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

  ["lastUpdated", "nextUpdate"].forEach(
    function(field) {
      newConfig[field] = config[field];
    }
  )

  newConfig.sourceURL = sourceToURL(sources[newConfig.source]);

  config = newConfig;
}

