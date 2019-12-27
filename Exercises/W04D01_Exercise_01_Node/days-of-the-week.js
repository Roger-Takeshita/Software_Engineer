// console.log(module);
module.exports.weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

module.exports.getWeekDays = function (dayNumber) {
   if (dayNumber < 0 || dayNumber > 6) {
      dayNumber = 0;
   }
   return module.exports.weekdays[dayNumber];
}