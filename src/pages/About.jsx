import usePageMeta from "../hooks/usePageMeta";

function About() {
  usePageMeta({
    title: "콘텐츠 운영 원칙 | 2026년 실수령액 계산기",
    description:
      "실수령액 계산기 데이터 수집 방식, 업데이트 주기, 검수 절차, 문의 대응 정책을 공개합니다.",
    canonicalPath: "/about",
  });

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "900px", margin: "40px auto" }}>
        <h1>콘텐츠 운영 원칙</h1>
        <p className="description">
          본 페이지는 실수령액 계산기 콘텐츠의 작성 기준과 검수 절차를 투명하게
          공개하기 위해 마련했습니다. 광고보다 정보 품질을 우선하며, 근거가
          명확한 내용만 반영합니다.
        </p>

        <h2>1. 데이터 출처</h2>
        <ul>
          <li>국민연금공단, 국민건강보험공단, 고용노동부, 국세청 공개 자료</li>
          <li>근로소득 간이세액표 및 보험료율 공시값 기반 계산 로직</li>
          <li>프리랜서 3.3% 원천징수 일반 규정 기준</li>
        </ul>

        <h2>2. 업데이트 정책</h2>
        <ul>
          <li>정기 점검: 매월 1회(1주차)</li>
          <li>비정기 점검: 세율/보험료율 개편 공지 시 즉시 재검토</li>
          <li>모든 주요 수정사항은 메인 페이지 업데이트 내역에 공개</li>
        </ul>

        <h2>3. 품질 검수 체크리스트</h2>
        <ul>
          <li>계산 결과가 최신 요율과 일치하는지 샘플 케이스 검증</li>
          <li>페이지별 메타데이터/구조화 데이터 누락 여부 확인</li>
          <li>광고 배치보다 계산·해설 콘텐츠 가독성을 우선 배치</li>
          <li>중복 문구, 과장 표현, 출처 불명 수치 제거</li>
        </ul>

        <h2>4. 면책 및 사용자 안내</h2>
        <p>
          계산 결과는 참고용 추정치이며, 실제 급여는 회사 규정·복리후생·연말정산
          항목에 따라 달라질 수 있습니다. 중요한 의사결정 전에는 세무 전문가
          상담을 권장합니다.
        </p>

        <h2>5. 문의 및 정정 요청</h2>
        <p>
          사실 오류, 오탈자, 업데이트 요청은 문의 페이지 또는 아래 이메일로
          접수해 주세요.
        </p>
        <p>
          <strong>contact:</strong> qkqhqk14@gmail.com
        </p>

        <p className="help-text" style={{ marginTop: "30px" }}>
          최종 업데이트: 2026-02-18
        </p>
      </div>
    </div>
  );
}

export default About;
