var inputs = {
  'source' : "select[name='Source']",
  'updateRule' : "select[name='UpdateRule']",
  'updateTime' : "select[name='UpdateTime']",
  'newTab' : "input[name='newTab']"
};

function init() {
  populateConfig();
  updateLoadingPercentage();
}

function updateLoadingPercentage() {
  var loadingPercentage = document.querySelector("#loadingPercentage");
  var percentage = localStorage["loadingPercentage"];

  loadingPercentage.innerText = percentage + "%";

  if (percentage < 100) {
    document.querySelector('#definitions').className = "";
    setTimeout(updateLoadingPercentage, 50);
  } else {
    document.querySelector('#definitions').className = "loaded";
    var timestamp = document.querySelector("#timestamp");
    timestamp.innerText = localStorage["lastUpdated"];
    display("Definitions updated!", {temp:true});
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
    {type: 'update', config: collectConfig()}, 
    function(response) {
      console.log("Got response:");
      console.log(response);
      if (response.updating) {
	updateLoadingPercentage();
      }
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
	updateLoadingPercentage();
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

function populateConfig() {
  chrome.extension.sendRequest(
    {type: 'getConfig'}, 
    function(response) {
      console.log("Got response:");
      console.log(response);
      for(var inputName in inputs) {
	var input = document.querySelector(inputs[inputName]);
	input.value = response[inputName];
      } 

      checkUpdateRule();
    }
  );

}