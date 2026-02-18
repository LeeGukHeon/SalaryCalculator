import { Link } from "react-router-dom";
import usePageMeta from "../../hooks/usePageMeta";

function YearEndTaxGuideArticle() {
  usePageMeta({
    title: "2026년 연말정산 완벽 가이드 | 실수령액 계산기",
    description:
      "2026년 연말정산 일정, 공제 확대 항목, 환급액을 늘리는 체크리스트를 한눈에 정리했습니다.",
    canonicalPath: "/articles/2026-year-end-tax-guide",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: "2026년 연말정산 완벽 가이드",
          datePublished: "2026-02-18",
          dateModified: "2026-02-18",
          author: { "@type": "Organization", name: "실수령액 계산기" },
          publisher: { "@type": "Organization", name: "실수령액 계산기" },
          mainEntityOfPage: "https://mysalarycalc.com/articles/2026-year-end-tax-guide",
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "홈", item: "https://mysalarycalc.com/" },
            { "@type": "ListItem", position: 2, name: "연말정산 가이드", item: "https://mysalarycalc.com/articles/2026-year-end-tax-guide" },
          ],
        },
      ],
    },
  });

  return (
    <div className="container">
      <article className="card" style={{ maxWidth: "860px", margin: "0 auto" }}>
        <p className="help-text">
          <Link to="/">홈</Link> &gt; 연말정산 가이드
        </p>
        <h1>📋 2026년 연말정산 완벽 가이드</h1>
        <p className="description">최종 업데이트: 2026-02-18</p>

        <h2>기본 일정</h2>
        <ul>
          <li>11월: 예상세액 미리보기</li>
          <li>1~2월: 자료 제출 및 회사 반영</li>
          <li>3~4월: 정산 결과 확인</li>
        </ul>

        <h2>2026년 체크포인트</h2>
        <ul>
          <li>자녀·교육 관련 공제 항목 최신 기준 확인</li>
          <li>연금저축/IRP 추가 납입분 반영 여부 확인</li>
          <li>의료비·기부금 영수증 누락 점검</li>
        </ul>

        <h2>실전 팁</h2>
        <p>
          연봉 구간별 세율 차이가 크기 때문에, 연말 이전에 예상 실수령액을 먼저 계산하고 공제 항목을 보완하면 환급액을 안정적으로 늘릴 수 있습니다.
        </p>

        <h2 style={{ marginTop: "24px" }}>관련 문서</h2>
        <ul>
          <li>
            <Link to="/articles/2026-insurance-rate-changes">2026년 달라진 4대보험 요율 완벽 정리</Link>
          </li>
          <li>
            <Link to="/articles/5-ways-to-increase-take-home-pay">실수령액 늘리는 5가지 방법</Link>
          </li>
        </ul>
      </article>
    </div>
  );
}

export default YearEndTaxGuideArticle;
