// Adding the current day to calendar
var currentDate = dayjs ().format ('dddd, MMMM D, YYYY');
$ ('#currentDay').text (currentDate);
var now = dayjs()

// Present time-blocks for standard business hours when the user scrolls down.
function generateTimeBlocks () {
  var container = $ ('#blockTime'); //blocking hours
  var businessHours = [
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
  ];
  businessHours.forEach (function (hour) {
    let color;
    var presentTime = dayjs().hour();
    if (hour < presentTime) {
      color = "past"
    } else if  (hour === presentTime) {
      color= "present"
    } else {
      color= "future"
    }
    var timeBlock = `
   <div class="row ${color}">
   <div class="col-1 hour time-block fw-bold text-black">${hour}:00</div>
   <textarea class="col-10 input" placeholder="Add your note!"></textarea>
   <button class="col-1 saveBtn fw-bold text-black"><i class="bi bi-check-all"></i></button>
   </div>
  `;
    container.append(timeBlock)  // adding to browser
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
