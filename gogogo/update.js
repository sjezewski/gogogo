
var dayIndex = {
  "Sun" : 0,
  "Mon" : 1,
  "Tue" : 2,
  "Wed" : 3,
  "Thu" : 4,
  "Fri" : 5,
  "Sat" : 6
}

var nextCheck = 0;

function checkForScheduledUpdate() {
  var now = new Date();
  
  console.log("Checking for scheduled update");

  if (now.getTime() > config.nextUpdate) {
    console.log("Time to update!");
    updateDefinitions();
    setScheduledUpdate(now);
  } else if (config.updateRule != "manual") {
    var increment = millisecondsToNextHour(now);
    nextCheck = now.getTime() + increment;
    setTimeout(checkForScheduledUpdate, increment);
  }

}

function setScheduledUpdate(now) {

  switch(config.updateRule) {
  case "weekly":
    config.nextUpdate = scheduledDayAndHour(now, config.updateDay, config.updateHour);
    break;
  case "daily":
    config.nextUpdate = scheduledHour(now, config.updateHour);
    break;
  }

  checkForScheduledUpdate(); // Make sure I only have a single 'thread' of timeouts checking

  return config.nextUpdate;
}

function millisecondsToNextHour(date) {
  var now = date.getTime();
  date.setHours(date.getHours()+1);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  var future = date.getTime();
  return future - now;
}

function scheduledHour(now, hour) {
  var offset = 0;
  if (now.getHours() >= hour) {
    offset = 1;
  }
  return startOfHour(now, offset, hour);
}

function scheduledDayAndHour(now, day, hour) {
  var startDay = now.getDay();
  var endDay = dayIndex[day];
  var offset = endDay - startDay;

  if (offset <= 0) {
    offset += 7;
  }

  return startOfHour(now, offset, hour);
}

function startOfHour(now, offset, hours) {
  var nextDay = new Date();
  nextDay.setDate(now.getDate() + offset);

  if (hours === undefined) {
    hours = 0;
  }

  nextDay.setHours(hours);
  nextDay.setMinutes(0);
  nextDay.setSeconds(0);
  nextDay.setMilliseconds(0); 

  return nextDay.getTime();
}