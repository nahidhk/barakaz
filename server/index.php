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




$data = json_decode(file_get_contents("php://input"), true);

$type = $data['type'] ?? $_POST['type'] ?? '';
$table = $data['table'] ?? $_POST['table'] ?? '';
$apiKey = $data['key'] ?? $_POST['key'] ?? '';

if ($apiKey !== 'abc123') {
    echo json_encode(['error' => 'Invalid API key']);
    exit;
}

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
} 


if ($type === 'post') {
    $data = $data['data'] ?? $_POST['data'] ?? [];
    if (empty($data)) {
        echo json_encode(['error' => 'No data provided']);
        exit;
    }

    try {
        $columns = implode(", ", array_keys($data));
        $placeholders = implode(", ", array_fill(0, count($data), "?"));
        $stmt = $pdo->prepare("INSERT INTO `$table` ($columns) VALUES ($placeholders)");
        $stmt->execute(array_values($data));

        echo json_encode([
            "status" => "success",
            "message" => "Data inserted successfully"
        ]);

    } catch (PDOException $e) {
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
    }
}


if ($type === 'drop') {
    $id = $data['data']['id'] ?? $_POST['id'] ?? null;
    if (!$id) {
        echo json_encode([['error' => $id]]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM `$table` WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode([
            "status" => "success",
            "message" => "Data deleted successfully"
        ]);

    } catch (PDOException $e) {
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
    }
}