var inputs = {
  'source' : "select[name='Source']",
  'updateRule' : "select[name='UpdateRule']",
  'updateDay' : "select[name='UpdateDay']",
  'updateHour' : "select[name='UpdateHour']",
  'newTab' : "input[name='newTab']"
};

function updateLoadingPercentage(sourceInfo) {

  var loadingPercentage = document.querySelector("#loadingPercentage");
  var percentage = localStorage["loadingPercentage"];

  loadingPercentage.innerText = percentage + "%";

  if (percentage < 100) {
    document.querySelector('#definitions').className = "";
    setTimeout(function(){updateLoadingPercentage(sourceInfo)}, 50);
  } else {
    document.querySelector('#definitions').className = "loaded";
    var timestamp = document.querySelector("#timestamp");
    timestamp.innerText = localStorage["lastUpdated"];
    var sourceElem = document.querySelector("#source");
    sourceElem.innerText = sourceInfo.source + " (" + sourceInfo.sourceURL + ")";
    if (!sourceInfo.firstLoad) {
      display("Definitions updated!", {timing: 'temp'});
    }
  }

}

function checkUpdateRule() {
  var updateRule = document.querySelector("select[name='UpdateRule']");
  var updateTimes = document.querySelector("#UpdateTimes");
  var updateDay = document.querySelector("#UpdateDay");

  switch(updateRule.value) {
  case 'manual' :
    updateTimes.style.display = 'none';
    break;
  case 'daily' :
    updateTimes.style.display = 'block';
    updateDay.style.display = 'none';
    break;
  case 'weekly' :
    updateTimes.style.display = 'block';
    updateDay.style.display = 'block';
    break;
  }

}

function update(evt) {
  evt.preventDefault();
  chrome.extension.sendRequest(
    {type: 'update'}, 
    function(response) {
      console.log("Got response:");
      console.log(response);
      if (response.updating) {
	updateLoadingPercentage(response.config);
      }
      display(response.message, {timing: 'persistent'});
    }
  );
}

function saveOptions(evt) {
  evt.preventDefault();
  // TODO: Pass message to background page to update if source has changed
  
  display("Saving options ...");

  chrome.extension.sendRequest(
    {type: 'saveConfig', config: collectConfig()}, 
    function(response) {
      console.log("Got response:");
      console.log(response);
      if (response.updating) {
	display("Re-fetching definitions", {timing: 'persistent'});
	updateLoadingPercentage(response.config);
      } else {
	display("Saved!");
      }

    }
  );
}


function collectConfig() {
  var config = {};

  for(var inputName in inputs) {
    var input = document.querySelector(inputs[inputName]);
    config[inputName] = input.value;
  }

  return config;
}

function init() {
  chrome.extension.sendRequest(
    {type: 'getConfig'}, 
    function(response) {
      console.log("Got config response:");
      console.log(response);

      for(var inputName in inputs) {
	var input = document.querySelector(inputs[inputName]);
	if (input.type == 'checkbox') {
	  input.checked = response.config[inputName];
	} else {
	  input.value = response.config[inputName];
	}
      } 
      var config = response.config;
      config.firstLoad = true;
      updateLoadingPercentage(config);
      checkUpdateRule();
    }
  );

}