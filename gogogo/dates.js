var weekDays = {
  'Sun' : 'Sunday',
  'Mon' : 'Monday',
  'Tue' : 'Tuesday',
  'Wed' : 'Wednesday',
  'Thu' : 'Thursday',
  'Fri' : 'Friday',
  'Sat' : 'Saturday'
};

function getWeekDay(date) {
  var raw = String(date).split(" ")[0];
  return weekDays[raw];
}