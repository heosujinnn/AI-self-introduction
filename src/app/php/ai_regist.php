<?php
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

$data = json_decode(file_get_contents("php://input"), true);

// JSON으로 전송된 데이터 받기
$username = $data['username'];
$passWord = $data['passWord'];

// 비밀번호 해싱 (추가 보안을 위해 사용자 비밀번호를 해싱하여 저장하는 것이 좋습니다.)
$hashed_pw = password_hash($passWord, PASSWORD_DEFAULT);

// SQL 쿼리 작성 및 실행
$sql = "INSERT INTO ai_users (username, passWord) VALUES ('$username', '$hashed_pw')";

if ($conn->query($sql) === TRUE) {
    // 회원가입이 성공했을 때 JSON 응답 전송
    echo json_encode(array("success" => true, "message" => "회원가입이 완료되었습니다."));
} else {
    // 오류 발생 시 JSON 응답 전송
    echo json_encode(array("success" => false, "message" => "Error"));
}

// 데이터베이스 연결 종료
$conn->close();
?>
