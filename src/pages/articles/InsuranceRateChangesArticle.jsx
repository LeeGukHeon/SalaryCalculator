import { Link } from "react-router-dom";
import usePageMeta from "../../hooks/usePageMeta";

function InsuranceRateChangesArticle() {
  usePageMeta({
    title: "2026년 달라진 4대보험 요율 완벽 정리 | 실수령액 계산기",
    description:
      "2026년 국민연금·건강보험·장기요양보험 변경률과 연봉 구간별 실수령액 영향을 한 번에 확인하세요.",
    canonicalPath: "/articles/2026-insurance-rate-changes",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: "2026년 달라진 4대보험 요율 완벽 정리",
          datePublished: "2026-02-18",
          dateModified: "2026-02-18",
          author: { "@type": "Organization", name: "실수령액 계산기" },
          publisher: { "@type": "Organization", name: "실수령액 계산기" },
          mainEntityOfPage: "https://mysalarycalc.com/articles/2026-insurance-rate-changes",
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "홈", item: "https://mysalarycalc.com/" },
            { "@type": "ListItem", position: 2, name: "연봉 정보", item: "https://mysalarycalc.com/articles/2026-insurance-rate-changes" },
          ],
        },
      ],
    },
  });

  return (
    <div className="container">
      <article className="card" style={{ maxWidth: "860px", margin: "0 auto" }}>
        <p className="help-text">
          <Link to="/">홈</Link> &gt; 연봉 정보
        </p>
        <h1>📊 2026년 달라진 4대보험 요율 완벽 정리</h1>
        <p className="description">최종 업데이트: 2026-02-18</p>

        <h2>핵심 변경사항</h2>
        <ul>
          <li>국민연금: 근로자 부담 4.5% → 4.75%</li>
          <li>건강보험: 근로자 부담 3.545% → 3.595%</li>
          <li>장기요양보험: 건강보험료의 12.95% → 13.14%</li>
          <li>고용보험: 0.9% 유지</li>
        </ul>

        <h2>실수령액 영향 예시</h2>
        <p>
          연봉 4,000만원 기준 월 실수령액은 2025년 대비 약 9천원 내외 감소할 수 있습니다.
          연봉이 높을수록 보험료 증가폭도 함께 커지므로, 비과세 항목·세액공제 전략을 함께 확인하는 것이 좋습니다.
        </p>

        <h2>참고 출처</h2>
        <div className="source-links">
          <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer">국민연금공단</a>
          <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer">국민건강보험</a>
          <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer">고용노동부</a>
        </div>

        <h2 style={{ marginTop: "24px" }}>관련 문서</h2>
        <ul>
          <li>
            <Link to="/articles/2026-year-end-tax-guide">2026년 연말정산 완벽 가이드</Link>
          </li>
          <li>
            <Link to="/articles/5-ways-to-increase-take-home-pay">실수령액 늘리는 5가지 방법</Link>
          </li>
        </ul>
      </article>
    </div>
  );
}

export default InsuranceRateChangesArticle;
