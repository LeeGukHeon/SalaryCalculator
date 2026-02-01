// src/pages/Guide.jsx
import { Link } from "react-router-dom";
import AdSense from "../components/AdSense";
import "../styles/guide.css";

function Guide() {
  return (
    <div className="container">
      <div className="card">
        {/* 헤더 */}
        <div className="guide-header">
          <h1>📖 실수령액 계산기 사용 가이드</h1>
          <p className="guide-subtitle">
            정확한 실수령액 계산을 위한 완벽 가이드
          </p>
          <Link to="/" className="back-button">
            ← 계산기로 돌아가기
          </Link>
        </div>

        {/* 광고 1: 상단 */}
        <AdSense
          slot="3434966366"
          format="auto"
          style={{ marginBottom: "24px" }}
        />

        {/* 목차 */}
        <nav className="guide-toc">
          <h3>📑 목차</h3>
          <ul>
            <li>
              <a href="#employee-guide">1. 직장인 계산 방법</a>
            </li>
            <li>
              <a href="#freelancer-guide">2. 프리랜서 계산 방법</a>
            </li>
            <li>
              <a href="#salary-table">3. 실수령액표 활용법</a>
            </li>
            <li>
              <a href="#tax-free">4. 비과세 항목이란?</a>
            </li>
            <li>
              <a href="#dependents">5. 부양가족 공제</a>
            </li>
            <li>
              <a href="#tips">6. 정확한 계산을 위한 팁</a>
            </li>
          </ul>
        </nav>

        {/* 섹션 1: 직장인 계산 방법 */}
        <section id="employee-guide" className="guide-section">
          <h2>👔 1. 직장인 계산 방법</h2>

          <div className="guide-content">
            <h3>기본 입력 항목</h3>

            <div className="guide-step">
              <div className="step-number">STEP 1</div>
              <div className="step-content">
                <h4>연봉 입력</h4>
                <p>
                  근로계약서에 명시된 <strong>세전 연봉</strong>을 입력하세요.
                </p>
                <div className="example-box">
                  <strong>예시:</strong> 연봉 4,000만원 → 40,000,000 입력
                </div>
                <ul>
                  <li>✅ 포함: 기본급 + 고정 상여금</li>
                  <li>❌ 제외: 성과급, 초과근무수당 (변동 항목)</li>
                </ul>
              </div>
            </div>

            <div className="guide-step">
              <div className="step-number">STEP 2</div>
              <div className="step-content">
                <h4>월 비과세 금액 입력</h4>
                <p>세금이 붙지 않는 월 고정 수당을 입력하세요.</p>
                <div className="example-box">
                  <strong>일반적인 경우:</strong> 식대 20만원 → 200,000 입력
                </div>
                <ul>
                  <li>식대: 월 20만원까지 비과세</li>
                  <li>차량유지비: 월 20만원까지 비과세</li>
                  <li>자녀보육수당: 월 10만원까지 비과세</li>
                </ul>
                <div className="tip-box">
                  💡 <strong>Tip:</strong> 급여명세서에서 "비과세" 항목 확인!
                </div>
              </div>
            </div>

            <div className="guide-step">
              <div className="step-number">STEP 3</div>
              <div className="step-content">
                <h4>공제대상 가족 수 선택</h4>
                <p>본인을 포함하여 부양하는 가족 수를 선택하세요.</p>
                <div className="example-box">
                  <strong>예시:</strong>
                  <ul>
                    <li>본인만 → 1명</li>
                    <li>본인 + 배우자 → 2명</li>
                    <li>본인 + 배우자 + 자녀 1명 → 3명</li>
                    <li>본인 + 배우자 + 자녀 2명 + 부모님 1명 → 5명</li>
                  </ul>
                </div>
                <div className="warning-box">
                  ⚠️ 가족 수가 많을수록 세금이 줄어듭니다!
                </div>
              </div>
            </div>

            <div className="guide-step">
              <div className="step-number">STEP 4</div>
              <div className="step-content">
                <h4>청년 감면 여부 체크</h4>
                <p>
                  중소기업 취업 청년(만 15~34세)은 소득세 90% 감면 혜택이
                  있습니다.
                </p>
                <ul>
                  <li>✅ 해당: 체크박스 선택</li>
                  <li>❌ 비해당: 선택 안 함</li>
                  <li>연 최대 200만원까지 감면</li>
                </ul>
              </div>
            </div>

            <div className="guide-step">
              <div className="step-number">STEP 5</div>
              <div className="step-content">
                <h4>계산하기 버튼 클릭</h4>
                <p>모든 정보 입력 후 "💰 실수령액 계산하기" 버튼을 누르세요!</p>
              </div>
            </div>
          </div>
        </section>

        {/* 광고 2: 중간 */}
        <AdSense
          slot="9808803020"
          format="auto"
          style={{ margin: "30px auto", maxWidth: "336px" }}
        />

        {/* 섹션 2: 프리랜서 계산 방법 */}
        <section id="freelancer-guide" className="guide-section">
          <h2>💼 2. 프리랜서 계산 방법</h2>

          <div className="guide-content">
            <div className="guide-step">
              <div className="step-number">STEP 1</div>
              <div className="step-content">
                <h4>프리랜서 탭 선택</h4>
                <p>계산기 상단의 "💼 프리랜서" 탭을 클릭하세요.</p>
              </div>
            </div>

            <div className="guide-step">
              <div className="step-number">STEP 2</div>
              <div className="step-content">
                <h4>월 수입 입력</h4>
                <p>세금 떼기 전 계약금액을 입력하세요.</p>
                <div className="example-box">
                  <strong>예시:</strong> 월 500만원 계약 → 5,000,000 입력
                </div>
              </div>
            </div>

            <div className="guide-step">
              <div className="step-number">STEP 3</div>
              <div className="step-content">
                <h4>자동 계산 확인</h4>
                <p>3.3% 원천징수가 자동으로 계산됩니다.</p>
                <ul>
                  <li>소득세: 3.0%</li>
                  <li>지방소득세: 0.3%</li>
                  <li>합계: 3.3%</li>
                </ul>
                <div className="warning-box">
                  ⚠️ <strong>중요:</strong> 4대 보험은 별도 납부!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 섹션 3: 실수령액표 활용법 */}
        <section id="salary-table" className="guide-section">
          <h2>📊 3. 실수령액표 활용법</h2>

          <div className="guide-content">
            <h3>빠른 예상 금액 확인하기</h3>

            <ol className="numbered-list">
              <li>
                <strong>내 연봉 구간 찾기</strong>
                <p>
                  메인 페이지 하단 실수령액표에서 내 연봉에 가까운 행을
                  찾으세요.
                </p>
              </li>
              <li>
                <strong>예상 실수령액 확인</strong>
                <p>해당 연봉의 월 실수령액을 확인하세요.</p>
              </li>
              <li>
                <strong>정확한 계산</strong>
                <p>표는 참고용이며, 정확한 금액은 계산기로 확인하세요!</p>
              </li>
            </ol>

            <div className="tip-box">
              💡 <strong>Tip:</strong> 표는 부양가족 1명 기준이므로, 실제 금액과
              차이가 있을 수 있습니다.
            </div>
          </div>
        </section>

        {/* 광고 3: 중간 */}
        <AdSense
          slot="6779315005"
          format="auto"
          style={{ margin: "30px auto" }}
        />

        {/* 섹션 4: 비과세 항목 */}
        <section id="tax-free" className="guide-section">
          <h2>💵 4. 비과세 항목이란?</h2>

          <div className="guide-content">
            <p className="section-intro">
              비과세 항목은 세금이 붙지 않는 수당으로, 실수령액을 높이는 중요한
              요소입니다.
            </p>

            <div className="tax-free-grid">
              <div className="tax-free-card">
                <h4>🍴 식대</h4>
                <div className="tax-free-amount">월 20만원</div>
                <p>가장 흔한 비과세 항목</p>
              </div>

              <div className="tax-free-card">
                <h4>🚗 차량유지비</h4>
                <div className="tax-free-amount">월 20만원</div>
                <p>업무용 차량 사용 시</p>
              </div>

              <div className="tax-free-card">
                <h4>👶 자녀보육수당</h4>
                <div className="tax-free-amount">월 10만원</div>
                <p>6세 이하 자녀 1인당</p>
              </div>

              <div className="tax-free-card">
                <h4>🏥 건강관리비</h4>
                <div className="tax-free-amount">연 240만원</div>
                <p>특정 조건 충족 시</p>
              </div>
            </div>

            <div className="example-box">
              <strong>계산 예시:</strong>
              <ul>
                <li>식대 20만원 + 차량유지비 10만원 = 월 30만원 비과세</li>
                <li>→ 계산기에 300,000 입력</li>
                <li>→ 실수령액 증가! ✅</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 섹션 5: 부양가족 공제 */}
        <section id="dependents" className="guide-section">
          <h2>👨‍👩‍👧‍👦 5. 부양가족 공제</h2>

          <div className="guide-content">
            <p className="section-intro">
              부양가족이 많을수록 소득세가 줄어들어 실수령액이 증가합니다.
            </p>

            <h3>공제 대상 가족</h3>
            <ul className="dependents-list">
              <li>
                ✅ <strong>본인</strong> (필수)
              </li>
              <li>
                ✅ <strong>배우자</strong> (소득 없거나 연 100만원 이하)
              </li>
              <li>
                ✅ <strong>직계존속</strong> (부모님, 조부모님 - 만 60세 이상)
              </li>
              <li>
                ✅ <strong>직계비속</strong> (자녀 - 만 20세 이하)
              </li>
              <li>
                ✅ <strong>형제자매</strong> (만 20세 이하 또는 60세 이상)
              </li>
            </ul>

            <div className="comparison-box">
              <h4>📈 부양가족 수에 따른 실수령액 차이</h4>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>연봉</th>
                    <th>1명 (본인)</th>
                    <th>3명 (본인+배우자+자녀)</th>
                    <th>차이</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>4,000만원</td>
                    <td>2,892,779원</td>
                    <td>약 2,940,000원</td>
                    <td className="highlight">+47,221원/월</td>
                  </tr>
                  <tr>
                    <td>5,000만원</td>
                    <td>3,521,585원</td>
                    <td>약 3,590,000원</td>
                    <td className="highlight">+68,415원/월</td>
                  </tr>
                </tbody>
              </table>
              <p className="table-note">
                * 정확한 금액은 계산기에서 부양가족 수를 조정하여 확인하세요!
              </p>
            </div>
          </div>
        </section>

        {/* 광고 4: 하단 */}
        <AdSense
          slot="5466233337"
          format="auto"
          style={{ margin: "30px auto", maxWidth: "336px" }}
        />

        {/* 섹션 6: 팁 */}
        <section id="tips" className="guide-section">
          <h2>💡 6. 정확한 계산을 위한 팁</h2>

          <div className="guide-content">
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">📄</div>
                <h4>급여명세서 확인</h4>
                <p>
                  정확한 비과세액과 공제 내역은 급여명세서에서 확인할 수
                  있습니다.
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon">🔄</div>
                <h4>여러 조건 비교</h4>
                <p>
                  부양가족 수를 바꿔가며 계산해보면 최적의 조건을 찾을 수
                  있습니다.
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon">📅</div>
                <h4>연말정산 고려</h4>
                <p>
                  계산기는 월별 원천징수 기준이며, 연말정산 시 추가 환급이
                  가능합니다.
                </p>
              </div>

              <div className="tip-card">
                <div className="tip-icon">⚖️</div>
                <h4>2026년 세율 적용</h4>
                <p>
                  본 계산기는 2026년 최신 세율(국민연금 4.75%, 건강보험
                  3.595%)을 반영합니다.
                </p>
              </div>
            </div>

            <div className="warning-box">
              <h4>⚠️ 주의사항</h4>
              <ul>
                <li>
                  계산 결과는 참고용이며, 실제 금액은 회사 정책에 따라 다를 수
                  있습니다.
                </li>
                <li>상여금, 성과급 등 변동 수당은 포함되지 않습니다.</li>
                <li>연말정산 시 추가 환급 또는 추징이 발생할 수 있습니다.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <div className="cta-section">
          <h3>지금 바로 실수령액을 계산해보세요! 💰</h3>
          <Link to="/" className="cta-button">
            계산기로 이동하기 →
          </Link>
        </div>

        {/* 광고 5: 푸터 */}
        <AdSense
          slot="4153151665"
          format="auto"
          style={{ marginTop: "30px" }}
        />
      </div>
    </div>
  );
}

export default Guide;
