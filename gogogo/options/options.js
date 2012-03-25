

function saveOptions() {
  // TODO: Pass message to background page to update if source has changed
}

function init() {
  populateOptions();
  updateLoadingPercentage();
}

function populateOptions() {
  
}

function updateLoadingPercentage() {
  var loadingPercentage = document.querySelector("#loadingPercentage");
  var percentage = localStorage["loadingPercentage"];

  loadingPercentage.innerText = percentage + "%";

  if (percentage < 100) {
    setTimeout(updateLoadingPercentage, 50);
  } else {
    document.querySelector('#definitions').className = "loaded";
    var timestamp = document.querySelector("#timestamp");
    timestamp.innerText = localStorage["lastUpdated"];
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