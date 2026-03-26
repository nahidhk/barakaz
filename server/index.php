<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
require_once 'config.php';



// POST না JSON body support কর
$data = json_decode(file_get_contents("php://input"), true);

$type = $data['type'] ?? $_POST['type'] ?? '';
$table = $data['table'] ?? $_POST['table'] ?? '';
$apiKey = $data['key'] ?? $_POST['key'] ?? '';

if ($apiKey !== 'abc123') {
    echo json_encode(['error' => 'Invalid API key']);
    exit;
}


// $allowedTables = ['users', 'products', 'orders', 'cart'];

// if (!in_array($table, $allowedTables)) {
//     echo json_encode(['error' => 'Invalid table']);
//     exit;
// }

if ($type === 'get') {
    try {
        $stmt = $pdo->prepare("SELECT * FROM `$table`");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => "success",
            "data" => $results
        ]);

    } catch (PDOException $e) {
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
    }
} else {
    echo json_encode(['error' => 'Invalid request']);
}