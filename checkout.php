<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $address = $_POST['address'];
    $items = json_encode($_POST['items']); // expects array
    $total = $_POST['total'];

    $stmt = $conn->prepare("INSERT INTO orders (customer_name, customer_address, order_items, total_price) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssd", $name, $address, $items, $total);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
?>