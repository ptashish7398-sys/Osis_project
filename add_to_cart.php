<?php
session_start();
require 'db.php';

if (isset($_POST['id'])) {
    $id = intval($_POST['id']);
    $query = "SELECT * FROM drinks WHERE id = $id";
    $result = $conn->query($query);

    if ($result->num_rows === 1) {
        $drink = $result->fetch_assoc();

        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }

        $already_added = false;
        foreach ($_SESSION['cart'] as &$item) {
            if ($item['id'] == $id) {
                $item['quantity']++;
                $already_added = true;
                break;
            }
        }

        if (!$already_added) {
            $drink['quantity'] = 1;
            $_SESSION['cart'][] = $drink;
        }

        echo json_encode(['status' => 'success', 'cart' => $_SESSION['cart']]);
    } else {
        echo json_encode(['status' => 'not_found']);
    }
} else {
    echo json_encode(['status' => 'error']);
}
?>