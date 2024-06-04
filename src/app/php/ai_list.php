<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

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

// 데이터 가져오기
$sql = "SELECT * FROM ai_answer";
$result = $conn->query($sql);

// 결과를 배열로 변환
$rows = array();
$count = 0;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
        $count++;
        if ($count >= 10) {
            break;
        }
    }
}

// 데이터베이스 연결 종료
$conn->close();

// JSON 형식으로 결과 출력
echo json_encode($rows);
?>
