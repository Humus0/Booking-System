<!--
Name - Hemish Patel
Student ID - 23191251
User login - fwf4929
-->


<?php
// Database connection
$host = "localhost";
$user = "root";
$pswd = "";
$dbnm = "stats";
$conn = mysqli_connect($host, $user, $pswd, $dbnm);

// Retrieve search and status values from POST request, if they exist assign variable
$search = $_POST['bsearch'] ?? "";
$status = $_POST['status'] ?? "";
$inp = $_POST['inp'] ?? "";


// Check if an assign button was pressed and a booking number is provided
if (isset($_POST['assign'])) {
    // Update the booking status to Assigned if its Unassigned
    if ($status === 'Unassigned') {
        $booking_num = $_POST['booking_number'];
        $update_query = "UPDATE stats SET status = 'Assigned' WHERE booking_number = '$booking_num'";
        $query = mysqli_query($conn, $update_query);
        echo "<h2>Congratulations! Booking request $booking_num has been assigned!</h2>";
    }
    $search = $inp; 
}

// Construct the query based on whether search is empty or not
if ($search === "") {
    // Query to get bookings within 2 hours
    $query = "SELECT * FROM stats 
    WHERE CONCAT(date, ' ', time) BETWEEN NOW() -
    INTERVAL 2 HOUR AND NOW() + INTERVAL 2 HOUR";
} else {
    // Query to search for a specific booking number
    $query = "SELECT * FROM stats WHERE booking_number LIKE '%$search%'";
}
$result = mysqli_query($conn, $query);

// Loop through each record and display its details in a table
if ($result && mysqli_num_rows($result) > 0) {
    echo "<table width='100%' border='1'>";
    echo "<tr><th>Booking Reference Number</th><th>Customer Name</th><th>Phone</th>
        <th>Pickup Suburb</th><th>Destination Suburb</th><th>Pickup Date and Time</th>
        <th>Status</th><th>Assign</th></tr>";
    while ($row = mysqli_fetch_assoc($result)) {
        $date_time = date('d/m/Y H:i', strtotime($row['date'] . " " . $row['time']));
        echo "<tr><td>{$row['booking_number']}</td>";
        echo "<td>{$row['customer_input']}</td>";
        echo "<td>{$row['phone']}</td>";
        echo "<td>{$row['pickup_sub']}</td>";
        echo "<td>{$row['destination_sub']}</td>";
        echo "<td>{$date_time}</td>";
        echo "<td>{$row['status']}</td>";
        // Add an Assign button with an onClick event
        echo "<td><button type='button' name='sbutton' onClick='assign_func(\"admin.php\",
        \"content\", \"{$row['booking_number']}\", \"{$row['status']}\", 
        \"$search\")'>Assign</button></td></tr>";

    }
    echo "</table>";
    // If no records are found, display a message
} else {
    echo "<p>No bookings found.</p>";
}

// Close the database connection
mysqli_close($conn);
?>
