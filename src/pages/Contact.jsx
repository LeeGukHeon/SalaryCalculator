// src/pages/Contact.jsx
function Contact() {
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "700px", margin: "40px auto" }}>
        <h1>문의하기</h1>

        <p className="description">
          2026년 실수령액 계산기에 대한 문의사항이 있으시면 아래 이메일로
          연락주세요.
        </p>

        <div
          style={{
            padding: "30px",
            background: "#f9fafb",
            borderRadius: "8px",
            marginTop: "30px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>📧 이메일</h2>
          <p style={{ fontSize: "18px", margin: "10px 0" }}>
            <strong>qkqhqk14@gmail.com</strong>
          </p>

          <h2 style={{ marginTop: "30px" }}>⏰ 답변 시간</h2>
          <p>평일 오전 9시 ~ 오후 6시 (영업일 기준 1~2일 내 답변)</p>

          <h2 style={{ marginTop: "30px" }}>💬 문의 내용</h2>
          <ul>
            <li>서비스 이용 관련 문의</li>
            <li>계산 오류 신고</li>
            <li>개선 제안</li>
            <li>제휴 문의</li>
          </ul>
        </div>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#fff8e1",
            borderRadius: "8px",
            borderLeft: "4px solid #ff9800",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>💡 참고:</strong> 개인의 세무 상담은 해드릴 수 없습니다.
            정확한 세금 계산은 세무사와 상담하시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
