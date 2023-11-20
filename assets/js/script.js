
// Adding the current day to calendar
var currentDate = dayjs().format('dddd, MMMM D, YYYY');
$("#currentDay").text(currentDate);

// Present time-blocks for standard business hours when the user scrolls down.

// Color-code each timeBlock based on past, present, and future when the timeBlock is viewed.
var presentTime =dayjs().hour();  // Current hour
$(".time-block").each(function(){
  var blockedHour = parseInt($(this).text().split("")[0]);
  if (blockedHour < presentTime) {
  $(this).addClass("past");
  } else if (blockedHour === presentTime) {
    $(this).addClass("present");
  } else {
    $(this).addClass("future");
  }
});
// Allow a user to enter an event when they click a timeBlock

// Save the event in local storage when the save button is clicked in that timeBlock.

// Persist events between refreshes of a page