<?php
$host = "localhost";
$user = "root";
$pass = ""; // your MySQL password, if any
$db = "oasis_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$sql = "INSERT INTO contact_queries (name, email,subject, message) VALUES (?, ?, ?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email,$subject, $message);

if ($stmt->execute()) {
  echo "success";
} else {
  echo "error";
}

$stmt->close();
$conn->close();
?>