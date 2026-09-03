<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["email"])) {
    $email = trim($_POST["email"]);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // DB Connection
    $conn = new mysqli("localhost", "root", "", "oasis_db");
    if ($conn->connect_error) {
        echo "DB error";
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO newsletter (email) VALUES (?)");
    $stmt->bind_param("s", $email);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error inserting";
    }

    $stmt->close();
    $conn->close();
}
?>