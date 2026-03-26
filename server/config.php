<?php
$host = 'eu-host-1.championstack.com';
$dbname = 'ndsqltop_barakaz';
$username = 'ndsqltop';
$password = '(N@hid123$##)';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>