var myTab;

function openTab(url) {
  var args = {'url' : url, 'selected':true};
  chrome.tabs.create(args, function(tab) {myTab = tab;})
}

function updateDefinitions() {
  // Updates the definitions
  localStorage["loadingPercentage"] = 0;
  config.Loading = true;

  config._Entries = config.Entries;
  config.Entries = [];
  LoadedEntries = [];

  fetchDocList();

  // TODO: Revert to old entries list if there is an error
  config.Loading = false;

  config.lastUpdated = new Date();
  localStorage["lastUpdated"] = String(config.lastUpdated);
}

function checkForUpdate() {
  // TODO ... fill in based on updateRule
}