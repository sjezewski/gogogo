
var messageOK = document.querySelector(".button.close");
var messageContainer = document.querySelector("#messageContainer");
var messageElem = document.querySelector("#message");

messageOK.addEventListener('click',hide, false);

function hide() {
  messageContainer.className = "hidden";
}

function display(message, options) {
  if (options === undefined) {
    options = {};
  }
  
  console.log("DISPLAYING RESULT")

  messageElem.innerText = message;
  messageContainer.className = "";

  console.log("msg Container", messageContainer);
  if (options.timing) {
    messageContainer.className = options.timing; // In case I decide I want to hide the ok button
  } else {
    messageContainer.className = "";
  }

  if (options.timing == 'temp') {

    setTimeout( 
      function() {
	messageElem.innerText = "";
	hide();
      },
      3000
    );
  }
  
}