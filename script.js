$(document).ready(function () {
    // Display the current day
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));

    // Function to create timeblocks
    function createTimeblocks() {
        const businessHoursStart = 9; // Starting at 9 AM
        const businessHoursEnd = 17; // Ending at 5 PM

        for (let hour = businessHoursStart; hour <= businessHoursEnd; hour++) {
            // A row for each time block
            let timeBlock = $('<div>').addClass('row time-block');
            let hourLabel = $('<div>').addClass('hour col-md-1');
            let eventText = $('<textarea>').addClass('description col-md-10');
            let saveButton = $('<button>').addClass('saveBtn col-md-1').html('<i class="fas fa-save"></i>');

            // Format the hour for the label and for the id
            let formattedHour = dayjs().set('hour', hour).format('hA');
            hourLabel.text(formattedHour);

            // Assign an id to the time block for local storage retrieval
            timeBlock.attr('id', `
            hour-${formattedHour}`);
                    // Color code our time blocks based on past, present, or future
        const currentHour = dayjs().hour();
        if (hour < currentHour) {
            eventText.addClass('past');
        } else if (hour === currentHour) {
            eventText.addClass('present');
        } else {
            eventText.addClass('future');
        }

        // Append the hour label, textarea, and save button to the time block
        timeBlock.append(hourLabel, eventText, saveButton);

        // Append the time block to the container
        $('.container').append(timeBlock);

        // Load saved events from local storage
        let savedEvent = localStorage.getItem(`hour-${formattedHour}`);
        if (savedEvent) {
            eventText.val(savedEvent);
        }
    }
}

// Create the timeblocks when the document is ready
createTimeblocks();

// Save button event listener
$('.saveBtn').on('click', function () {
    let eventHour = $(this).parent().attr('id');
    let eventText = $(this).siblings('.description').val();
    localStorage.setItem(eventHour, eventText);
});
});