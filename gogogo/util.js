var myTab;

function openTab(url) {
  var args = {'url' : url, 'selected':true};
  chrome.tabs.create(args, function(tab) {myTab = tab;})
}