/*
Name - Hemish Patel
Student ID - 23191251
User login - fwf4929
*/


// Function to send a POST request to retrieve data from the server
function getQuery(dataSource, contentClass, absearch) {
    var xhr = new XMLHttpRequest(); // Create a new instance of XMLHttpRequest
    if (xhr) {
        var obj = document.querySelector('.' + contentClass); // Use querySelector for class
        var requestBody = "bsearch=" + encodeURIComponent(absearch);

        // Validate the search input
        if (absearch && !absearch.match(/^BRN\d{5}$/)) {
            alert('Enter a valid reference number!');
            return;
        }

        xhr.open("POST", dataSource, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // Define the callback function to handle the response
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    obj.innerHTML = xhr.responseText;
                } else {
                    console.error('Error: Request failed with status ' + xhr.status);
                }
            }
        };

        // Send the request
        xhr.send(requestBody);
    }
}

// Function to send a POST request to update booking status
function assign_func(dataSource, contentClass, aref, astat, aser) {
    var xhr = new XMLHttpRequest(); // Create a new instance of XMLHttpRequest
    if (xhr) {
        var obj = document.querySelector('.' + contentClass); // Use querySelector for class
        var requestBody = "assign=true&booking_number=" + encodeURIComponent(aref) 
        + "&status=" + encodeURIComponent(astat) + "&inp=" + encodeURIComponent(aser);
        
        xhr.open("POST", dataSource, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // Define the callback function to handle the response
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    obj.innerHTML = xhr.responseText;
                } else {
                    console.error('Error: Request failed with status ' + xhr.status);
                }
            }
        };

        // Send the request
        xhr.send(requestBody);
    }
}
