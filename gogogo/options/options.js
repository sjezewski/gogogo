

function saveOptions() {
  // TODO: Pass message to background page to update if source has changed
}

function populateOptions() {
  
}

function updateLoadingPercentage() {
  var loadingPercentage = document.querySelector("#loadingPercentage");
  var percentage = localStorage["loadingPercentage"];
  loadingPercentage.innerText = percentage + "%";
  if (percentage < 1) {
    setTimeout(updateLoadingPercentage,50);
  } else {
    loadingPercentage.className = "loaded";
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