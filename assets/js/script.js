// Adding the current day to calendar
var currentDate = dayjs ().format ('dddd, MMMM D, YYYY');
$ ('#currentDay').text (currentDate);

// Present time-blocks for standard business hours when the user scrolls down.
function generateTimeBlocks () {
  var container = $ ('#blockTime'); //blocking hours
  var businessHours = [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];
  businessHours.forEach (function (hour) {
    var hourFormatted = dayjs (hour, 'H:m').format ('h a'); // Formatting hours
    var timeBlock = `
    <div class="row">
    </div><div class="col-1 hour time-block">${HourFormatted}</div>
    <textarea class="col-8 input"></textarea>
    <button class="col-1 saveBtn fw-bold text-black"><i class="bi bi-check-all"></i></button>
    </div>
  `;
  });
}
$ (document).ready (function () {
  generateTimeBlocks ();
});

// Color-code each timeBlock based on past, present, and future when the timeBlock is viewed.
var presentTime = dayjs ().hour (); // Current hour
$ ('.time-block').each (function () {
  var blockedHour = parseInt ($ (this).text ().split ('')[0]);
  if (blockedHour < presentTime) {
    $ (this).addClass ('past');
  } else if (blockedHour === presentTime) {
    $ (this).addClass ('present');
  } else {
    $ (this).addClass ('future');
  }
});

// Allow a user to enter an event when they click a timeBlock
$ ('.input').on ('.click', function () {
  $ (this).css ('pointer-events', 'auto');
});

// Save the event in local storage when the save button is clicked in that timeBlock.
$ ('.saveBtn').on ('click', function () {
  var eventText = $ (this).siblings ('textarea').val (); // Get text from textarea
  var hour = $ (this).siblings ('.hour').text ().split (' ')[0]; // Extract hour from the time block

  localStorage.setItem (hour, eventText); // Saving to local storage
});

// Persist events between refreshes of a page
$ (document).ready (function () {
  $ ('.hour').each (function () {
    var hour = $ (this).text ().split (' ')[0]; // Load saved events from local storage
    var savedEvent = localStorage.getItem (hour);
    if (savedEvent) {
      $ (this).siblings ('textarea').val (savedEvent);
    }
  });

  $ ('.saveBtn').on ('click', function () {
    // Event listener for saving events
    var eventText = $ (this).siblings ('textarea').val (); // Get text from textarea
    var hour = $ (this).siblings ('.hour').text ().split (' ')[0]; // Extract hour from the time block

    // Save eventText in local storage using hour as the key
    localStorage.setItem (hour, eventText);
  });
});
