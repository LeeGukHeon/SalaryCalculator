// src/pages/SalaryInfo.jsx
import { Link } from "react-router-dom";
import AdSense from "../components/AdSense";
import "../styles/salaryInfo.css";
import usePageMeta from "../hooks/usePageMeta";

function SalaryInfo() {
  usePageMeta({
    title: "2026년 연봉·세율·4대보험 최신 정보 총정리",
    description: "2026년 국민연금, 건강보험, 장기요양보험, 고용보험 요율과 최저임금·세율 변경사항을 표와 예시로 상세 정리했습니다.",
    canonicalPath: "/info",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: "https://mysalarycalc.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "2026년 정보",
          item: "https://mysalarycalc.com/info",
        },
      ],
    },
  });
  return (
    <div className="container">
      <div className="card">
        {/* 헤더 */}
        <div className="info-header">
          <h1>📊 2026년 연봉 및 세율 정보</h1>
          <p className="info-subtitle">
            2026년 최신 4대보험 요율, 최저임금, 세율 구간 완벽 정리
          </p>
          <Link to="/" className="back-button">
            ← 계산기로 돌아가기
          </Link>
        </div>

        {/* 광고 1 */}
        <AdSense slot="3434966366" format="auto" style={{ marginBottom: "20px" }} />

        {/* 2026년 주요 변경사항 */}
        <section className="info-section highlight-section">
          <h2>🔴 2026년 주요 변경사항</h2>

          <div className="changes-grid">
            <div className="change-card important">
              <div className="change-icon">🏛️</div>
              <h3>국민연금 인상 (25년만에!)</h3>
              <div className="change-detail">
                <div className="old-value">2025년: 4.5%</div>
                <div className="arrow">→</div>
                <div className="new-value">2026년: 4.75%</div>
              </div>
              <p className="change-impact">
                월급 300만원 기준: 월 7,500원 증가
              </p>
            </div>

            <div className="change-card">
              <div className="change-icon">🏥</div>
              <h3>건강보험료 인상</h3>
              <div className="change-detail">
                <div className="old-value">2025년: 3.545%</div>
                <div className="arrow">→</div>
                <div className="new-value">2026년: 3.595%</div>
              </div>
              <p className="change-impact">
                월급 300만원 기준: 월 1,500원 증가
              </p>
            </div>

            <div className="change-card">
              <div className="change-icon">🏠</div>
              <h3>장기요양보험료 인상</h3>
              <div className="change-detail">
                <div className="old-value">2025년: 12.95%</div>
                <div className="arrow">→</div>
                <div className="new-value">2026년: 13.14%</div>
              </div>
              <p className="change-impact">건강보험료의 13.14%</p>
            </div>

            <div className="change-card maintain">
              <div className="change-icon">💼</div>
              <h3>고용보험 유지</h3>
              <div className="change-detail">
                <div className="new-value">0.9% 동결</div>
              </div>
              <p className="change-impact">변동 없음</p>
            </div>
          </div>

          <div className="total-impact">
            <h4>📉 총 실수령액 영향</h4>
            <ul>
              <li>
                연봉 3,000만원: 월 약{" "}
                <strong className="decrease">-6,800원</strong>
              </li>
              <li>
                연봉 4,000만원: 월 약{" "}
                <strong className="decrease">-9,200원</strong>
              </li>
              <li>
                연봉 5,000만원: 월 약{" "}
                <strong className="decrease">-11,500원</strong>
              </li>
              <li>
                연봉 6,000만원: 월 약{" "}
                <strong className="decrease">-13,800원</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* 광고 2 */}

        {/* 2026년 4대보험 요율 */}
        <section className="info-section">
          <h2>💳 2026년 4대보험 요율 (근로자 부담)</h2>

          <div className="insurance-table-wrapper">
            <table className="insurance-table">
              <thead>
                <tr>
                  <th>보험 종류</th>
                  <th>전체 요율</th>
                  <th>근로자 부담</th>
                  <th>사업주 부담</th>
                  <th>계산 기준</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>국민연금</strong>
                  </td>
                  <td>9.5%</td>
                  <td className="highlight">4.75%</td>
                  <td>4.75%</td>
                  <td>과세소득</td>
                </tr>
                <tr>
                  <td>
                    <strong>건강보험</strong>
                  </td>
                  <td>7.19%</td>
                  <td className="highlight">3.595%</td>
                  <td>3.595%</td>
                  <td>과세소득</td>
                </tr>
                <tr>
                  <td>
                    <strong>장기요양보험</strong>
                  </td>
                  <td>-</td>
                  <td className="highlight">건강보험료의 13.14%</td>
                  <td>건강보험료의 13.14%</td>
                  <td>건강보험료</td>
                </tr>
                <tr>
                  <td>
                    <strong>고용보험</strong>
                  </td>
                  <td>1.8%</td>
                  <td className="highlight">0.9%</td>
                  <td>0.9%</td>
                  <td>과세소득</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="calculation-example">
            <h4>💡 계산 예시 (월급 300만원)</h4>
            <div className="calc-grid">
              <div className="calc-item">
                <span>국민연금</span>
                <strong>142,500원</strong>
                <small>(3,000,000 × 4.75%)</small>
              </div>
              <div className="calc-item">
                <span>건강보험</span>
                <strong>107,850원</strong>
                <small>(3,000,000 × 3.595%)</small>
              </div>
              <div className="calc-item">
                <span>장기요양</span>
                <strong>14,171원</strong>
                <small>(107,850 × 13.14%)</small>
              </div>
              <div className="calc-item">
                <span>고용보험</span>
                <strong>27,000원</strong>
                <small>(3,000,000 × 0.9%)</small>
              </div>
              <div className="calc-item total">
                <span>합계</span>
                <strong>291,521원</strong>
                <small>(약 9.7%)</small>
              </div>
            </div>
          </div>
        </section>

        {/* 2026년 최저임금 */}
        <section className="info-section">
          <h2>💰 2026년 최저임금</h2>

          <div className="minimum-wage-card">
            <div className="wage-main">
              <div className="wage-amount">시간당 10,320원</div>
              <div className="wage-increase">
                2025년 대비 <span className="up">+2.9% 인상</span> (10,030원 →
                10,320원)
              </div>
            </div>

            <div className="wage-details">
              <div className="wage-detail-item">
                <h4>📅 주 40시간 근무 시</h4>
                <table className="simple-table">
                  <tbody>
                    <tr>
                      <td>월 근무시간</td>
                      <td>
                        <strong>209시간</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>월 급여 (세전)</td>
                      <td>
                        <strong>2,156,880원</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>연봉 (세전)</td>
                      <td>
                        <strong>약 25,882,560원</strong>
                      </td>
                    </tr>
                    <tr className="highlight-row">
                      <td>월 실수령액 (예상)</td>
                      <td>
                        <strong className="emphasis">약 1,930,000원</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="wage-detail-item">
                <h4>📊 공제 내역 (예상)</h4>
                <ul className="deduction-list">
                  <li>국민연금: 약 102,452원</li>
                  <li>건강보험: 약 77,540원</li>
                  <li>장기요양: 약 10,189원</li>
                  <li>고용보험: 약 19,412원</li>
                  <li>소득세: 약 15,000원</li>
                  <li>지방소득세: 약 1,500원</li>
                  <li className="total">합계 공제액: 약 226,093원</li>
                </ul>
              </div>
            </div>

            <div className="note-box">
              <strong>📌 참고:</strong> 비과세 항목(식대 등)이 있으면 실수령액이
              더 높아질 수 있습니다. 정확한 계산은 상단 계산기를 이용해주세요.
            </div>
          </div>
        </section>

        {/* 광고 3 */}

        {/* 소득세율 구간 */}
        <section className="info-section">
          <h2>📈 2026년 소득세율 (누진세)</h2>

          <div className="tax-bracket-wrapper">
            <table className="tax-bracket-table">
              <thead>
                <tr>
                  <th>과세표준 (연소득)</th>
                  <th>세율</th>
                  <th>누진공제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1,400만원 이하</td>
                  <td className="rate">6%</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>1,400만원 초과 ~ 5,000만원</td>
                  <td className="rate">15%</td>
                  <td>126만원</td>
                </tr>
                <tr>
                  <td>5,000만원 초과 ~ 8,800만원</td>
                  <td className="rate">24%</td>
                  <td>576만원</td>
                </tr>
                <tr>
                  <td>8,800만원 초과 ~ 1.5억원</td>
                  <td className="rate">35%</td>
                  <td>1,544만원</td>
                </tr>
                <tr>
                  <td>1.5억원 초과 ~ 3억원</td>
                  <td className="rate">38%</td>
                  <td>1,994만원</td>
                </tr>
                <tr>
                  <td>3억원 초과 ~ 5억원</td>
                  <td className="rate">40%</td>
                  <td>2,594만원</td>
                </tr>
                <tr>
                  <td>5억원 초과 ~ 10억원</td>
                  <td className="rate">42%</td>
                  <td>3,594만원</td>
                </tr>
                <tr>
                  <td>10억원 초과</td>
                  <td className="rate">45%</td>
                  <td>6,594만원</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tax-note">
            <h4>💡 누진세란?</h4>
            <p>
              소득이 높을수록 더 높은 세율을 적용하는 제도입니다. 단, 전체
              소득에 최고 세율이 적용되는 것이 아니라,
              <strong>구간별로 해당 세율만 적용</strong>됩니다.
            </p>

            <div className="tax-example">
              <strong>예시: 연봉 6,000만원</strong>
              <ul>
                <li>1,400만원까지: 6% 적용</li>
                <li>1,400만원 초과 ~ 5,000만원: 15% 적용</li>
                <li>5,000만원 초과 ~ 6,000만원: 24% 적용</li>
              </ul>
              <p className="emphasis">→ 전체에 24%가 적용되는 것이 아닙니다!</p>
            </div>
          </div>
        </section>

        {/* 연봉 구간별 분석 */}
        <section className="info-section">
          <h2>💼 연봉 구간별 실수령률</h2>

          <div className="salary-analysis">
            <table className="analysis-table">
              <thead>
                <tr>
                  <th>연봉 구간</th>
                  <th>월 세전</th>
                  <th>월 실수령액</th>
                  <th>실수령률</th>
                  <th>연봉 대비</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>3,000만원</strong>
                  </td>
                  <td>2,500,000원</td>
                  <td>2,217,222원</td>
                  <td className="rate-high">88.7%</td>
                  <td>약 2,661만원</td>
                </tr>
                <tr>
                  <td>
                    <strong>4,000만원</strong>
                  </td>
                  <td>3,333,333원</td>
                  <td>2,892,779원</td>
                  <td className="rate-high">86.8%</td>
                  <td>약 3,471만원</td>
                </tr>
                <tr>
                  <td>
                    <strong>5,000만원</strong>
                  </td>
                  <td>4,166,667원</td>
                  <td>3,521,585원</td>
                  <td className="rate-mid">84.5%</td>
                  <td>약 4,226만원</td>
                </tr>
                <tr>
                  <td>
                    <strong>6,000만원</strong>
                  </td>
                  <td>5,000,000원</td>
                  <td>4,143,748원</td>
                  <td className="rate-mid">82.9%</td>
                  <td>약 4,972만원</td>
                </tr>
                <tr>
                  <td>
                    <strong>7,000만원</strong>
                  </td>
                  <td>5,833,333원</td>
                  <td>4,769,375원</td>
                  <td className="rate-mid">81.8%</td>
                  <td>약 5,723만원</td>
                </tr>
                <tr>
                  <td>
                    <strong>8,000만원</strong>
                  </td>
                  <td>6,666,667원</td>
                  <td>약 5,350,000원</td>
                  <td className="rate-low">80.3%</td>
                  <td>약 6,420만원</td>
                </tr>
                <tr>
                  <td>
                    <strong>1억원</strong>
                  </td>
                  <td>8,333,333원</td>
                  <td>약 6,550,000원</td>
                  <td className="rate-low">78.6%</td>
                  <td>약 7,860만원</td>
                </tr>
              </tbody>
            </table>

            <div className="analysis-insight">
              <h4>📊 인사이트</h4>
              <ul>
                <li>✅ 연봉이 높을수록 실수령률은 낮아집니다 (누진세 때문)</li>
                <li>✅ 3,000만원대: 약 88-89% 수령</li>
                <li>✅ 5,000만원대: 약 84-85% 수령</li>
                <li>✅ 1억원대: 약 78-79% 수령</li>
                <li>⚠️ 부양가족이 많으면 실수령률이 더 높아집니다</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 광고 4 */}

        {/* 비과세 항목 */}
        <section className="info-section">
          <h2>💵 주요 비과세 항목 (2026년)</h2>

          <div className="tax-free-items">
            <div className="tax-free-item">
              <div className="item-icon">🍱</div>
              <h4>식대</h4>
              <div className="item-amount">월 20만원</div>
              <p>가장 보편적인 비과세 항목</p>
            </div>

            <div className="tax-free-item">
              <div className="item-icon">🚗</div>
              <h4>차량유지비</h4>
              <div className="item-amount">월 20만원</div>
              <p>업무용 차량 사용 시</p>
            </div>

            <div className="tax-free-item">
              <div className="item-icon">👶</div>
              <h4>자녀보육수당</h4>
              <div className="item-amount">월 10만원</div>
              <p>6세 이하 자녀 1인당</p>
            </div>

            <div className="tax-free-item">
              <div className="item-icon">🏡</div>
              <h4>주택자금</h4>
              <div className="item-amount">조건부</div>
              <p>전세자금, 주택마련 저축</p>
            </div>

            <div className="tax-free-item">
              <div className="item-icon">💼</div>
              <h4>연구활동비</h4>
              <div className="item-amount">월 20만원</div>
              <p>연구직 종사자</p>
            </div>

            <div className="tax-free-item">
              <div className="item-icon">🎓</div>
              <h4>학자금</h4>
              <div className="item-amount">전액</div>
              <p>본인 및 직계비속 학자금</p>
            </div>
          </div>

          <div className="tax-free-tip">
            <strong>💡 Tip:</strong> 비과세 항목을 최대한 활용하면 실수령액을
            크게 늘릴 수 있습니다!
            <br />
            예: 식대 20만원 + 차량유지비 20만원 = 월 40만원 비과세 → 연간 약
            480만원 절세!
          </div>
        </section>

        <section className="info-section">
          <h2>📌 데이터 출처 및 검수 방식</h2>
          <p>
            아래 정보는 2026년 공표된 요율/세율 기준을 바탕으로 구성했으며,
            실제 적용시기는 정부 고시 일정에 따라 달라질 수 있습니다.
          </p>
          <ul>
            <li>국민연금·건강보험·고용보험 고시 요율 기준</li>
            <li>근로소득 간이세액표 기준(월별 원천징수 추정)</li>
            <li>프리랜서 3.3% 원천징수 일반 기준</li>
          </ul>
          <div className="source-links">
            <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer">국민연금공단</a>
            <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer">국민건강보험</a>
            <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer">고용노동부</a>
            <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer">국세청</a>
          </div>
          <div className="update-log-item">
            <strong>최종 검토일: 2026-02-18</strong>
            <p>보험료율/최저임금/세율 요약표 재검수 및 설명 문구 보완 완료</p>
          </div>
        </section>

        {/* CTA */}
        <div className="cta-section">
          <h3>💰 내 연봉 실수령액을 정확히 계산해보세요!</h3>
          <p>2026년 최신 세율이 적용된 정확한 계산기</p>
          <Link to="/" className="cta-button">
            지금 바로 계산하기 →
          </Link>
        </div>

        <AdSense slot="4153151665" format="auto" style={{ marginTop: "24px" }} />
      </div>
    </div>
  );
}

export default SalaryInfo;