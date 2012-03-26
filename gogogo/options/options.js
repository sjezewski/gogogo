var inputs = {
  'source' : "select[name='Source']",
  'updateRule' : "select[name='UpdateRule']",
  'updateTime' : "select[name='UpdateTime']",
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
      display("Definitions updated!", {temp: true});
    }
  }

}

function checkUpdateRule() {
  var updateRule = document.querySelector("select[name='UpdateRule']");
  var updateTime = document.querySelector("#UpdateTime");

  if (updateRule.value == 'weekly') {
    updateTime.style.display = 'block';
  } else {
    updateTime.style.display = 'none';
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
      display(response.message);
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
	display("Re-fetching definitions");
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