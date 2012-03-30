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

function Config(options) {
  if (options === undefined) {
    options = {};
  }

  this.init(options);
}

Config.prototype = {
  save: function() {
    
  },

  load: function() {
    
  },

  sourceURL: function() {
    return "http://" + sources[this.options[source]] + "/pkg/";
  },

  init: function(newOptions) {
    if (newOptions === undefined) {
      newOptions = {};
    }

    newOptions.Initialized = true;

    for (var fieldName in defaults) {
      if (!newOptions[fieldName]) {
        newOptions[fieldName] = defaults[fieldName];
      }
    }

    ["lastUpdated", "nextUpdate"].forEach(
      function(field) {
        newOptions[field] = config[field];
      }
    )

    newOptions.sourceURL = sourceToURL(sources[newOptions.source]);

    config = newOptions;
    
  }

}



function saveConfig() {
  localStorage.config = JSON.stringify(config);
}

function loadConfig() {
  config = JSON.parse(localStorage.config);
}