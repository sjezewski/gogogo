function display(message, options) {
  if (options === undefined) {
    options = {};
  }
  
  var messageElem = document.querySelector("#message");
  messageElem.innerText = message;

  if (options.temp) {
    setTimeout(
      1000, 
      function() {
	var messageElem = document.querySelector("#message");
	messageElem.innerText = "";
      }
    );
  }
  
}