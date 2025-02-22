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

// Create database connection
$conn = mysqli_connect($host, $user, $pswd, $dbnm);

// Retrieve form data
$name = $_POST['cname'];
$phone = $_POST['phone'];
$unumber = $_POST['unumber'];
$snumber = $_POST['snumber'];
$stname = $_POST['stname'];
$sbname = $_POST['sbname'];
$dsbname = $_POST['dsbname'];
$date = $_POST['date'];
$newdate = date('d/m/Y', strtotime($_POST['date'])); // Format the date properly
$time = $_POST['time'];
$datetime = $date . ' ' . $time;

// Check if stats table exists
$query = "SELECT * FROM stats";
$tableExist = mysqli_query($conn, $query);
$row_val = array();

// Fetch all reference numbers from the stats table and store them in an array
while ($row = $tableExist->fetch_assoc()) {
    $row_val[] = $row["booking_number"];
}
$las_arr = end($row_val);
$last_char = substr($las_arr, -5);
$num = intval($last_char);
$new_char = str_pad($num + 1, 5, '0', STR_PAD_LEFT);
$ref_num = "BRN" . $new_char;

// Insert data into the stats table
$sql = "INSERT INTO stats (booking_number, customer_input, phone, unit_number, st_num, st_name, pickup_sub, destination_sub, date, time, status) 
        VALUES ('$ref_num', '$name', '$phone', '$unumber', '$snumber', '$stname', '$sbname', '$dsbname', '$date', '$time', 'Unassigned')";

// Execute the SQL query
if (mysqli_query($conn, $sql)) {
        echo "<h2>Thank you for your booking!</h2>";
        echo " <p>Booking reference number: $ref_num</p>";
        echo "<p>Pickup time: $time</p>";
        echo "<p>Pickup date: $newdate</p>";
}

// Close the database connection
mysqli_close($conn);
?>
