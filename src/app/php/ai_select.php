<?php
session_start();

// 데이터베이스 연결 정보
$servername = "localhost"; // 서버 주소
$username = "soojin"; // 데이터베이스 사용자 이름
$password = "1234"; // 데이터베이스 비밀번호
$dbname = "ionic"; // 데이터베이스 이름

// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "데이터베이스 연결 실패")));
}

// 어떤 출처에서든 허용
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // 1일 동안 캐시
}

// OPTIONS 요청 중에 Access-Control 헤더를 받습니다.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// SQL 쿼리 작성 및 실행
$sql = "SELECT * FROM ai_answer";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $answers = array();
    while ($row = $result->fetch_assoc()) {
        $answers[] = $row;
    }
    echo json_encode(array("success" => true, "data" => $answers));
} else {
    echo json_encode(array("success" => false, "message" => "데이터가 없습니다."));
}

// 데이터베이스 연결 종료
$conn->close();
?>
