import usePageMeta from "../hooks/usePageMeta";

function Privacy() {
  usePageMeta({
    title: "개인정보처리방침 | 2026년 실수령액 계산기",
    description:
      "2026년 실수령액 계산기 서비스의 개인정보 수집 항목, 이용 목적, 쿠키 정책, 제3자 서비스 이용 내역을 안내합니다.",
    canonicalPath: "/privacy",
  });

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "900px", margin: "40px auto" }}>
        <h1>개인정보처리방침</h1>

        <p className="description">
          2026년 실수령액 계산기(이하 "본 서비스")는 사용자의 개인정보를
          중요시하며, 개인정보보호법을 준수하고 있습니다.
        </p>

        <h2>1. 수집하는 개인정보</h2>
        <p>
          본 서비스는 <strong>어떠한 개인정보도 수집하지 않습니다</strong>.
        </p>
        <ul>
          <li>회원가입 없음</li>
          <li>로그인 없음</li>
          <li>
            입력한 연봉/수입 정보는 서버에 저장되지 않으며, 브라우저에서만
            계산됩니다
          </li>
          <li>
            쿠키는 Google Analytics 및 Google AdSense 운영을 위해서만 사용됩니다
          </li>
        </ul>

        <h2>2. 개인정보의 이용 목적</h2>
        <p>본 서비스는 개인정보를 수집하지 않으므로 이용 목적이 없습니다.</p>

        <h2>3. 제3자 서비스 이용</h2>
        <p>본 서비스는 다음의 외부 서비스를 사용합니다:</p>
        <ul>
          <li>
            <strong>Google Analytics</strong>: 방문 통계 분석
          </li>
          <li>
            <strong>Google AdSense</strong>: 광고 표시
          </li>
        </ul>
        <p>
          위 서비스들은 쿠키를 사용하여 익명의 방문 정보를 수집할 수 있습니다.
          자세한 내용은{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 개인정보처리방침
          </a>
          을 참고하세요.
        </p>

        <h2>4. 쿠키(Cookie) 사용</h2>
        <p>
          본 서비스는 Google Analytics 및 Google AdSense를 위해 쿠키를
          사용합니다.
        </p>
        <p>
          쿠키 사용을 원하지 않으시면 브라우저 설정에서 쿠키를 차단할 수
          있습니다.
        </p>

        <h2>5. 개인정보 보호책임자</h2>
        <ul>
          <li>이메일: qkqhqk14@gmail.com</li>
          <li>문의사항이 있으시면 위 이메일로 연락주세요.</li>
        </ul>

        <h2>6. 개인정보처리방침 변경</h2>
        <p>본 개인정보처리방침은 2026년 2월 1일부터 적용됩니다.</p>
        <p>변경 사항이 있을 경우 웹사이트를 통해 공지합니다.</p>

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

export default Privacy;
