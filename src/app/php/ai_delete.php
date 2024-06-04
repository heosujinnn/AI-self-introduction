<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

$servername = "localhost";
$username = "soojin";
$password = "1234";
$dbname = "ionic";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "데이터베이스 연결 실패")));
}

$data = json_decode(file_get_contents("php://input"), true);

if(isset($data['id'])) {
    $id = $data['id'];
    echo $id;

    $sql = "DELETE FROM ai_answer WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => true, "message" => "성공..!!."));
    } else {
        echo json_encode(array("success" => false, "message" => "Error: " . $conn->error));
    }
}

$conn->close();
?>
