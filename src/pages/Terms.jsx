// src/pages/Terms.jsx
function Terms() {
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "900px", margin: "40px auto" }}>
        <h1>이용약관</h1>

        <p className="description">
          본 약관은 2026년 실수령액 계산기(이하 "본 서비스") 이용에 관한 조건을
          규정합니다.
        </p>

        <h2>제1조 (목적)</h2>
        <p>
          본 약관은 2026년 실수령액 계산기가 제공하는 서비스의 이용과 관련하여
          서비스 제공자와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로
          합니다.
        </p>

        <h2>제2조 (서비스의 내용)</h2>
        <p>본 서비스는 다음과 같은 기능을 제공합니다:</p>
        <ul>
          <li>직장인 실수령액 계산 (4대 보험, 소득세 등)</li>
          <li>프리랜서 실수령액 계산 (3.3% 원천징수)</li>
        </ul>

        <h2>제3조 (서비스의 이용)</h2>
        <ul>
          <li>본 서비스는 무료로 제공됩니다</li>
          <li>회원가입 없이 누구나 이용 가능합니다</li>
          <li>입력한 정보는 서버에 저장되지 않습니다</li>
        </ul>

        <h2>제4조 (면책조항)</h2>
        <ul>
          <li>
            본 서비스의 계산 결과는 <strong>참고용</strong>입니다
          </li>
          <li>
            실제 급여는 회사 정책, 추가 공제 항목 등에 따라 다를 수 있습니다
          </li>
          <li>본 서비스의 계산 결과로 인한 손해에 대해 책임지지 않습니다</li>
          <li>정확한 세금 계산은 세무 전문가와 상담하시기 바랍니다</li>
        </ul>

        <h2>제5조 (저작권)</h2>
        <p>
          본 서비스의 모든 콘텐츠(디자인, 계산 로직 등)는 저작권법의 보호를
          받습니다.
        </p>

        <h2>제6조 (광고)</h2>
        <p>
          본 서비스는 Google AdSense를 통해 광고를 게재합니다. 광고 수익은
          서비스 운영 및 개선에 사용됩니다.
        </p>

        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <p className="help-text">
            <strong>공고 일자:</strong> 2026년 2월 1일
            <br />
            <strong>시행 일자:</strong> 2026년 2월 1일
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
