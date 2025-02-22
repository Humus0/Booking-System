/*
Name - Hemish Patel
Student ID - 23191251
User login - fwf4929
*/

// Create a new instance of XMLHttpRequest
var xhr = new XMLHttpRequest();

// Function to send a POST request to submit form data
function getData(dataSource, reference, aName, aPhone, aUnumber, aSnumber, aStname, aSbname, aDsbname, aDate, aTime) {
    if (xhr) {
        var obj = document.getElementById(reference);
        var requestBody = "cname=" + encodeURIComponent(aName) +
                          "&phone=" + encodeURIComponent(aPhone) +
                          "&unumber=" + encodeURIComponent(aUnumber) +
                          "&snumber=" + encodeURIComponent(aSnumber) +
                          "&stname=" + encodeURIComponent(aStname) +
                          "&sbname=" + encodeURIComponent(aSbname) +
                          "&dsbname=" + encodeURIComponent(aDsbname) +
                          "&date=" + encodeURIComponent(aDate) +
                          "&time=" + encodeURIComponent(aTime);

        // Validate input fields
        if (!aName) {
            alert('Customer Name is required.');
            return;
        }
        if (!aPhone) {
            alert('Phone Number is required.');
            return;
        }
        if (!aPhone.match(/^\d{10,12}$/)) {
            alert('Phone Number must be all numbers with a length between 10-12.');
            return;
        }
        if (!aSnumber) {
            alert('Street Number is required.');
            return;
        }
        if (!aStname) {
            alert('Street Name is required.');
            return;
        }
        if (!aDate) {
            alert('Date is required.');
            return;
        }
        if (!aTime) {
            alert('Time is required.');
            return;
        }

        // Get current date and time in UTC
        var now = new Date();
        var currentDate = now.toISOString().split('T')[0];
        var hours = String(now.getUTCHours()).padStart(2, '0');
        var minutes = String(now.getUTCMinutes()).padStart(2, '0');
        var currentTime = hours + ':' + minutes;
        var enteredDateTime = new Date(aDate + 'T' + aTime);

        // Check if the selected date and time are valid
        if (aDate < currentDate || (aDate === currentDate && aTime < currentTime) || enteredDateTime < now) {
            alert('Pick-up date and time must not be earlier than the current date and time.');
            return; // Stop the function execution if date/time is invalid
        }

        // Send the request to the server
        xhr.open("POST", dataSource, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // Define the callback function to handle the response
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                obj.innerHTML = xhr.responseText;
            }
        };

        // Send the request with form data
        xhr.send(requestBody);
    }
}

// Set default date and time values to current date and time on page load
window.onload = function() {
    var dateInput = document.getElementById('date');
    var timeInput = document.getElementById('time');

    var now = new Date();
    var today = now.getFullYear() + '-' + ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1) + '-' + (now.getDate() < 10 ? '0' : '') + now.getDate();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var time = hours + ':' + minutes;

    // Set the default values for date and time inputs
    dateInput.value = today;
    timeInput.value = time;
}
