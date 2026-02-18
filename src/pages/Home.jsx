// src/pages/Home.jsx
import { useMemo, useState } from "react";
import { calcEmployeeSalary } from "../utils/calc/employee";
import { calcFreelancerIncome } from "../utils/calc/freelancer";
import { toNumber, handleNumberInput } from "../utils/helpers";
import AdSense from "../components/AdSense";
import usePageMeta from "../hooks/usePageMeta";
import { buildSalaryReferenceTable } from "../data/salaryReferenceTable";

function Home() {
  const salaryReferenceRows = useMemo(() => buildSalaryReferenceTable(), []);

  usePageMeta({
    title: "2026년 실수령액 계산기 | 직장인·프리랜서 급여 계산",
    description:
      "직장인 4대보험·간이세액표, 프리랜서 3.3% 원천징수까지 반영한 2026년 실수령액 계산기. 계산 근거와 절세 가이드까지 한 번에 확인하세요.",
    canonicalPath: "/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "실수령액 계산 결과는 실제 급여와 완전히 같나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "본 계산기는 2026년 기준 세율과 보험료율을 바탕으로 한 예상값입니다. 회사의 복리후생, 추가 공제, 연말정산 결과에 따라 실제 금액은 달라질 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "프리랜서 계산은 어떤 방식으로 계산하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "프리랜서 탭은 월 수입을 기준으로 3.3% 원천징수(소득세 3% + 지방소득세 0.3%)를 계산합니다. 지역가입 4대보험은 별도 안내로 제공합니다.",
          },
        },
      ],
    },
  });
  // ========== 공통 State ==========
  const [calcType, setCalcType] = useState("employee"); // "employee" or "freelancer"
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ========== 직장인 State ==========
  const [annualSalary, setAnnualSalary] = useState("");
  const [taxFreeMonthly, setTaxFreeMonthly] = useState("");
  const [dependents, setDependents] = useState("1");
  const [youthTaxReduction, setYouthTaxReduction] = useState(false);

  // ========== 프리랜서 State ==========
  const [monthlyIncome, setMonthlyIncome] = useState("");

  // ========== 입력값 변경 핸들러 ==========
  const handleAnnualSalaryChange = (e) => {
    const formatted = handleNumberInput(e.target.value);
    setAnnualSalary(formatted);
  };

  const handleTaxFreeChange = (e) => {
    const formatted = handleNumberInput(e.target.value);
    setTaxFreeMonthly(formatted);
  };

  const handleMonthlyIncomeChange = (e) => {
    const formatted = handleNumberInput(e.target.value);
    setMonthlyIncome(formatted);
  };

  // ========== 계산 함수 ==========
  const handleCalculate = () => {
    setError("");

    if (calcType === "employee") {
      // 직장인 계산
      const annualSalaryNum = toNumber(annualSalary);
      const taxFreeNum = toNumber(taxFreeMonthly);
      const dependentsNum = toNumber(dependents);

      if (annualSalaryNum <= 0) {
        setError("연봉을 입력해주세요.");
        setResult(null);
        return;
      }

      const calculated = calcEmployeeSalary({
        annualSalary: annualSalaryNum,
        taxFreeAmount: taxFreeNum,
        dependents: dependentsNum,
        youthTaxReduction: youthTaxReduction,
      });

      const annualResult = {
        ...calculated,
        annualGrossSalary: calculated.grossSalary * 12,
        annualNetSalary: calculated.netSalary * 12,
        annualNationalPension: calculated.nationalPension * 12,
        annualHealthInsurance: calculated.healthInsurance * 12,
        annualLongTermCare: calculated.longTermCare * 12,
        annualEmploymentInsurance: calculated.employmentInsurance * 12,
        annualTotalInsurance: calculated.totalInsurance * 12,
        annualIncomeTax: calculated.incomeTax * 12,
        annualLocalIncomeTax: calculated.localIncomeTax * 12,
        annualTotalTax: calculated.totalTax * 12,
      };

      setResult({ type: "employee", data: annualResult });
    } else {
      // 프리랜서 계산
      const monthlyIncomeNum = toNumber(monthlyIncome);

      if (monthlyIncomeNum <= 0) {
        setError("월 수입을 입력해주세요.");
        setResult(null);
        return;
      }

      const calculated = calcFreelancerIncome({
        monthlyIncome: monthlyIncomeNum,
      });

      setResult({ type: "freelancer", data: calculated });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  // ========== 탭 변경 ==========
  const handleTabChange = (type) => {
    setCalcType(type);
    setResult(null);
    setError("");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>💰 2026년 실수령액 계산기</h1>

        <p className="description">
          직장인과 프리랜서의 실수령액을 간편하게 계산해보세요.
        </p>

        {/* ========== 탭 전환 ========== */}
        <div className="tab-container">
          <button
            className={`tab-button ${calcType === "employee" ? "active" : ""}`}
            onClick={() => handleTabChange("employee")}
          >
            👔 직장인
          </button>
          <button
            className={`tab-button ${calcType === "freelancer" ? "active" : ""}`}
            onClick={() => handleTabChange("freelancer")}
          >
            💼 프리랜서
          </button>
        </div>

        {/* ========== 직장인 입력 ========== */}
        {calcType === "employee" && (
          <div className="input-section">
            <div className="form-group">
              <label>연봉 (원) *</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="예: 40,000,000"
                value={annualSalary}
                onChange={handleAnnualSalaryChange}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div className="form-group">
              <label>월 비과세 금액</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="예: 200,000 (식대, 교통비 등)"
                value={taxFreeMonthly}
                onChange={handleTaxFreeChange}
                onKeyPress={handleKeyPress}
              />
              <span className="help-text">
                💡 일반적으로 식대 20만원 (비과세 한도)
              </span>
            </div>

            <div className="form-group">
              <label>공제대상 가족 수 (본인 포함)</label>
              <select
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
              >
                <option value="1">1명 (본인만)</option>
                <option value="2">2명 (본인 + 배우자 등)</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
                <option value="5">5명</option>
                <option value="6">6명</option>
                <option value="7">7명</option>
                <option value="8">8명</option>
                <option value="9">9명</option>
                <option value="10">10명</option>
                <option value="11">11명 이상</option>
              </select>
              <span className="help-text">
                💡 본인 + 배우자 + 부양자녀 + 부모님 등
              </span>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={youthTaxReduction}
                  onChange={(e) => setYouthTaxReduction(e.target.checked)}
                />
                중소기업 취업 청년 소득세 감면 대상
                <span className="info-text"> (90% 감면, 연 최대 200만원)</span>
              </label>
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* ========== 광고 2: 입력 하단 (계산 전) ========== */}

            <button onClick={handleCalculate} className="calculate-btn">
              💰 실수령액 계산하기
            </button>
          </div>
        )}

        {/* ========== 프리랜서 입력 ========== */}
        {calcType === "freelancer" && (
          <div className="input-section">
            <div className="form-group">
              <label>월 수입 (세전) *</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="예: 5,000,000"
                value={monthlyIncome}
                onChange={handleMonthlyIncomeChange}
                onKeyPress={handleKeyPress}
              />
              <span className="help-text">
                💡 프리랜서 월 평균 수입 (세금 떼기 전 금액)
              </span>
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* ========== 광고 2: 입력 하단 (계산 전) ========== */}

            <button onClick={handleCalculate} className="calculate-btn">
              💰 실수령액 계산하기
            </button>

            {/* 안내 메시지 */}
            <div className="freelancer-info">
              <p>
                <strong>📌 프리랜서 소득 계산 방식</strong>
              </p>
              <ul>
                <li>✅ 3.3% 원천징수 (소득세 3% + 지방소득세 0.3%)</li>
                <li>⚠️ 4대 보험은 지역가입 또는 임의가입으로 별도 납부</li>
                <li>📋 종합소득세는 다음해 5월 신고 (연말정산 없음)</li>
              </ul>
            </div>
          </div>
        )}

        {/* ========== 결과 표시 (직장인) ========== */}
        {result && result.type === "employee" && (
          <div className="result-section">
            {/* ========== 광고 3: 결과 상단 ========== */}

            {/* 요약 카드 */}
            <div className="result-summary">
              <div className="summary-item">
                <div className="summary-label">월 실수령액</div>
                <div className="summary-value">
                  {(result.data.netSalary || 0).toLocaleString()} 원
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-label">연 실수령액</div>
                <div className="summary-value">
                  {(result.data.annualNetSalary || 0).toLocaleString()} 원
                </div>
              </div>
            </div>

            {/* 상세 내역 */}
            <div className="detail-section">
              <h3>📋 급여 상세 내역</h3>

              {/* 월간 계산 */}
              <div className="detail-group">
                <h4>월간 급여</h4>
                <div className="detail-row">
                  <span>월 과세 소득 (세전)</span>
                  <span>
                    {(result.data.taxableIncome || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row">
                  <span>월 비과세 소득</span>
                  <span>
                    {(result.data.taxFreeAmount || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row highlight">
                  <span>월 총 급여</span>
                  <span>
                    {(result.data.grossSalary || 0).toLocaleString()} 원
                  </span>
                </div>

                <div className="detail-divider"></div>

                <div className="detail-row minus">
                  <span>4대 보험</span>
                  <span>
                    -{(result.data.totalInsurance || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row-breakdown">
                  <span>└ 국민연금 (4.75%)</span>
                  <span>
                    {(result.data.nationalPension || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row-breakdown">
                  <span>└ 건강보험 (3.595%)</span>
                  <span>
                    {(result.data.healthInsurance || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row-breakdown">
                  <span>└ 장기요양보험 (건강보험의 13.14%)</span>
                  <span>
                    {(result.data.longTermCare || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row-breakdown">
                  <span>└ 고용보험 (0.9%)</span>
                  <span>
                    {(result.data.employmentInsurance || 0).toLocaleString()} 원
                  </span>
                </div>

                <div className="detail-row minus">
                  <span>세금 (간이세액)</span>
                  <span>
                    -{(result.data.totalTax || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row-breakdown">
                  <span>└ 소득세</span>
                  <span>
                    {(result.data.incomeTax || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row-breakdown">
                  <span>└ 지방소득세 (소득세의 10%)</span>
                  <span>
                    {(result.data.localIncomeTax || 0).toLocaleString()} 원
                  </span>
                </div>

                <div className="detail-divider"></div>

                <div className="detail-row total">
                  <span>월 실수령액</span>
                  <span>
                    {(result.data.netSalary || 0).toLocaleString()} 원
                  </span>
                </div>
              </div>

              {/* ========== 광고 4: 상세 중간 ========== */}

              {/* 연간 정보 */}
              <div className="annual-info">
                <h4>📊 연간 예상 금액</h4>

                <div className="annual-highlight">
                  <span>연 실수령액</span>
                  <strong>
                    {(result.data.annualNetSalary || 0).toLocaleString()} 원
                  </strong>
                </div>

                <div className="annual-detail-grid">
                  <div className="annual-detail-item">
                    <span>연 총 급여</span>
                    <strong>
                      {(result.data.annualGrossSalary || 0).toLocaleString()} 원
                    </strong>
                  </div>
                  <div className="annual-detail-item">
                    <span>연 4대 보험</span>
                    <strong>
                      {(result.data.annualTotalInsurance || 0).toLocaleString()}{" "}
                      원
                    </strong>
                  </div>
                  <div className="annual-detail-item">
                    <span>연 세금</span>
                    <strong>
                      {(result.data.annualTotalTax || 0).toLocaleString()} 원
                    </strong>
                  </div>
                  <div className="annual-detail-item">
                    <span>실수령률</span>
                    <strong>
                      {(
                        ((result.data.netSalary || 0) /
                          (result.data.grossSalary || 1)) *
                        100
                      ).toFixed(1)}
                      %
                    </strong>
                  </div>
                </div>
              </div>

              {/* 주의사항 */}
              <div className="result-note">
                <p>
                  <strong>📌 참고사항:</strong>
                </p>
                <ul>
                  <li>간이세액표를 기준으로 한 예상 금액입니다</li>
                  <li>
                    실제 실수령액은 회사 정책 및 추가 공제 항목에 따라 다를 수
                    있습니다
                  </li>
                  <li>연말정산 시 추가 환급 또는 추징이 발생할 수 있습니다</li>
                  {youthTaxReduction && (
                    <li className="highlight-text">
                      💡 청년 소득세 감면은 연 최대 200만원까지 적용됩니다
                    </li>
                  )}
                </ul>
              </div>

              {/* ========== 광고 5: 결과 하단 ========== */}
            </div>
          </div>
        )}

        {/* ========== 결과 표시 (프리랜서) ========== */}
        {result && result.type === "freelancer" && (
          <div className="result-section">
            {/* ========== 광고 3: 결과 상단 ========== */}

            {/* 요약 카드 */}
            <div className="result-summary">
              <div className="summary-item">
                <div className="summary-label">월 실수령액 (4대보험 제외)</div>
                <div className="summary-value">
                  {(result.data.netIncome || 0).toLocaleString()} 원
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-label">연 실수령액 (4대보험 제외)</div>
                <div className="summary-value">
                  {(result.data.annualNetIncome || 0).toLocaleString()} 원
                </div>
              </div>
            </div>

            {/* 4대보험 안내 박스 */}
            <div className="insurance-warning">
              <span className="warning-icon">⚠️</span>
              <div className="warning-content">
                <strong>4대 보험료는 별도입니다</strong>
                <p>
                  지역가입자로 건강보험, 국민연금 등을 별도 납부해야 합니다 (월
                  10~30만원 예상)
                </p>
              </div>
            </div>

            {/* 상세 내역 */}
            <div className="detail-section">
              <h3>📋 프리랜서 수입 상세</h3>

              {/* 월간 계산 */}
              <div className="detail-group">
                <h4>월간 수입</h4>
                <div className="detail-row">
                  <span>월 수입 (세전)</span>
                  <span>
                    {(result.data.monthlyIncome || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row minus">
                  <span>원천징수 (3.3%)</span>
                  <span>
                    -{(result.data.withholdingTax || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row-breakdown">
                  <span>└ 소득세 (3.0%)</span>
                  <span>
                    {(result.data.incomeTax || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row-breakdown">
                  <span>└ 지방소득세 (0.3%)</span>
                  <span>
                    {(result.data.localIncomeTax || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row total">
                  <span>월 실수령액 (4대보험 제외)</span>
                  <span>
                    {(result.data.netIncome || 0).toLocaleString()} 원
                  </span>
                </div>
              </div>

              {/* ========== 광고 4: 상세 중간 ========== */}

              {/* 연간 정보 */}
              <div className="annual-info">
                <h4>📊 연간 예상 금액</h4>

                <div className="annual-highlight">
                  <span>연 실수령액 (4대보험 제외)</span>
                  <strong>
                    {(result.data.annualNetIncome || 0).toLocaleString()} 원
                  </strong>
                </div>

                <div className="annual-detail-grid">
                  <div className="annual-detail-item">
                    <span>연 총수입</span>
                    <strong>
                      {(result.data.annualIncome || 0).toLocaleString()} 원
                    </strong>
                  </div>
                  <div className="annual-detail-item">
                    <span>연 원천징수</span>
                    <strong>
                      {(result.data.annualWithholdingTax || 0).toLocaleString()}{" "}
                      원
                    </strong>
                  </div>
                  <div className="annual-detail-item">
                    <span>실수령률</span>
                    <strong>
                      {((result.data.netRate || 0) * 100).toFixed(1)}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* 주의사항 */}
              <div className="result-note">
                <p>
                  <strong>📌 프리랜서 세금 안내:</strong>
                </p>
                <ul>
                  <li>✅ 3.3% 원천징수는 사업소득 간이과세 방식입니다</li>
                  <li>
                    ⚠️ <strong>4대 보험은 지역가입자로 별도 납부</strong> (월
                    10~30만원 예상, 소득에 따라 다름)
                  </li>
                  <li>
                    📋 다음해 5월 종합소득세 신고 시 추가 납부 또는 환급 발생
                    가능
                  </li>
                  <li>💡 필요경비 인정 시 실제 세금이 더 낮아질 수 있습니다</li>
                </ul>
              </div>

              {/* ========== 광고 5: 결과 하단 ========== */}
            </div>
          </div>
        )}
      </div>

      {/* 하단 정보 */}
      <div className="footer-info">
        <p>
          <strong>🔍 2026년 실수령액 계산기</strong>
        </p>
        <ul>
          <li>✅ 직장인: 간이세액표 + 4대 보험 정확 계산</li>
          <li>✅ 프리랜서: 3.3% 원천징수 자동 계산</li>
          <li>✅ 2026년 최신 세율 반영</li>
        </ul>
      </div>

      {/* 연봉별 실수령액 참고표 - 전체 구간 */}
      <section className="salary-table-section">
        <h2>💰 2026년 연봉별 실수령액 상세표</h2>
        <p className="table-description">
          직장인 기준, 2026년 세율 및 4대 보험료 적용 (부양가족 1명 기준)
          <br />
          정확한 계산은 위 계산기를 이용해주세요!
        </p>

        <div className="table-wrapper">
          <table className="salary-table">
            <thead>
              <tr>
                <th>연봉</th>
                <th>실수령액</th>
                <th>세전 월급</th>
                <th>공제액</th>
              </tr>
            </thead>
            <tbody>
              {salaryReferenceRows.map((row) => (
                <tr key={row.salaryLabel}>
                  <td>{row.salaryLabel}</td>
                  <td className="highlight">{row.netSalary.toLocaleString()}원</td>
                  <td>{row.grossSalary.toLocaleString()}원</td>
                  <td>{row.deduction.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="table-note">
          ⚠️ 위 금액은 2026년 기준 참고용이며, 비과세 항목, 부양가족 수,
          자녀세액공제 등에 따라 실제 실수령액은 달라질 수 있습니다.
        </p>
      </section>

      {/* 프리랜서 참고표 */}
      <section className="salary-table-section freelancer">
        <h2>💼 프리랜서 실수령액 참고표</h2>
        <p className="table-description">
          계약금액 기준 3.3% 원천징수 (소득세 3% + 지방소득세 0.3%)
        </p>

        <div className="table-wrapper">
          <table className="salary-table">
            <thead>
              <tr>
                <th>계약금액</th>
                <th>원천징수 (3.3%)</th>
                <th>실수령액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2,500,000원</td>
                <td>82,500원</td>
                <td className="highlight">2,417,500원</td>
              </tr>
              <tr>
                <td>3,000,000원</td>
                <td>99,000원</td>
                <td className="highlight">2,901,000원</td>
              </tr>
              <tr>
                <td>3,500,000원</td>
                <td>115,500원</td>
                <td className="highlight">3,384,500원</td>
              </tr>
              <tr>
                <td>4,000,000원</td>
                <td>132,000원</td>
                <td className="highlight">3,868,000원</td>
              </tr>
              <tr>
                <td>4,500,000원</td>
                <td>148,500원</td>
                <td className="highlight">4,351,500원</td>
              </tr>
              <tr>
                <td>5,000,000원</td>
                <td>165,000원</td>
                <td className="highlight">4,835,000원</td>
              </tr>
              <tr>
                <td>5,500,000원</td>
                <td>181,500원</td>
                <td className="highlight">5,318,500원</td>
              </tr>
              <tr>
                <td>6,000,000원</td>
                <td>198,000원</td>
                <td className="highlight">5,802,000원</td>
              </tr>
              <tr>
                <td>6,500,000원</td>
                <td>214,500원</td>
                <td className="highlight">6,285,500원</td>
              </tr>
              <tr>
                <td>7,000,000원</td>
                <td>231,000원</td>
                <td className="highlight">6,769,000원</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="table-note">
          ⚠️ 프리랜서는 4대 보험이 포함되지 않으며, 종합소득세 신고 시 추가
          세금이 발생할 수 있습니다.
        </p>
      </section>

      {/* 계산 예시 섹션 */}
      <section className="examples-section" style={{ marginTop: "50px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          💡 실제 계산 예시
        </h2>

        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>🎓 신입사원 김철수님 (27세)</h3>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
              <li>📌 연봉: 3,200만원</li>
              <li>💵 월급: 2,666,667원</li>
              <li>🍱 비과세: 식대 20만원</li>
              <li>👤 부양가족: 본인만 (1명)</li>
            </ul>
            <div
              style={{
                marginTop: "15px",
                padding: "15px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.9rem", marginBottom: "5px" }}>
                실수령액
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                2,352,480원
              </div>
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>👨‍💼 5년차 박영희님 (33세, 기혼)</h3>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
              <li>📌 연봉: 4,500만원</li>
              <li>💵 월급: 3,750,000원</li>
              <li>🍱 비과세: 식대 20만원 + 차량 10만원</li>
              <li>👨‍👩‍👧 부양가족: 배우자 + 자녀 1명 (3명)</li>
            </ul>
            <div
              style={{
                marginTop: "15px",
                padding: "15px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.9rem", marginBottom: "5px" }}>
                실수령액
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                3,262,358원
              </div>
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>💻 프리랜서 최개발님</h3>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
              <li>📌 월 계약금액: 500만원</li>
              <li>💵 원천징수: 3.3%</li>
              <li>⚠️ 4대 보험: 별도 납부</li>
            </ul>
            <div
              style={{
                marginTop: "15px",
                padding: "15px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.9rem", marginBottom: "5px" }}>
                실수령액 (4대보험 제외)
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                4,835,000원
              </div>
            </div>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#7f8c8d",
            fontSize: "0.95rem",
          }}
        >
          💡 위 계산기를 이용하면 내 조건에 맞는 정확한 실수령액을 확인할 수
          있습니다!
        </p>
      </section>

      {/* FAQ 섹션 */}
      <section className="faq-section">
        <h2>❓ 자주 묻는 질문</h2>
        <div className="faq-item">
          <h3>Q. 4대 보험은 정확히 무엇인가요?</h3>
          <p>
            A. 국민연금(4.75%), 건강보험(3.595%), 장기요양보험(건강보험료의
            13.14%), 고용보험(0.9%)을 합쳐 4대 보험이라고 하며, 직장인은
            월급에서 자동 공제됩니다.
          </p>
        </div>
        <div className="faq-item">
          <h3>Q. 부양가족이 많으면 실수령액이 늘어나나요?</h3>
          <p>
            A. 네. 부양가족 수가 많을수록 소득세 공제가 커져서 세금이 줄어들고
            실수령액이 증가합니다. 계산기에서 부양가족 수를 조정해보세요.
          </p>
        </div>
        <div className="faq-item">
          <h3>Q. 프리랜서도 4대 보험을 내나요?</h3>
          <p>
            A. 프리랜서는 계약금액에서 3.3% 원천징수만 제외되며, 4대 보험은
            지역가입자로 별도 가입해야 합니다.
          </p>
        </div>
        <div className="faq-item">
          <h3>Q. 비과세 항목은 무엇인가요?</h3>
          <p>
            A. 식대(월 20만원), 차량유지비(월 20만원), 자녀보육수당 등이 비과세
            항목입니다. 비과세액이 많을수록 실수령액이 증가합니다.
          </p>
        </div>

        <div className="faq-item">
          <h3>Q. 연말정산은 어떻게 반영되나요?</h3>
          <p>
            A. 계산기는 월별 원천징수 기준입니다. 연말정산 시 추가 공제(보험료,
            의료비, 교육비 등)가 적용되면 13월의 보너스(환급)를 받을 수
            있습니다. 반대로 공제가 적으면 추가 납부할 수도 있습니다.
          </p>
        </div>
        <div className="faq-item">
          <h3>Q. 상여금도 4대 보험이 붙나요?</h3>
          <p>
            A. 네. 상여금, 성과급, 명절 보너스 등 모든 급여성 수입은 4대 보험과
            소득세가 공제됩니다. 상여금 받을 때 생각보다 적게 받는 이유가 여기에
            있습니다.
          </p>
        </div>
        <div className="faq-item">
          <h3>Q. 왜 매달 실수령액이 조금씩 다른가요?</h3>
          <p>
            A. 소득세는 연간 누적 소득을 기준으로 계산하는 누진세이기 때문에,
            연초와 연말의 원천징수 세액이 다를 수 있습니다. 또한 월별 비과세액
            변동, 근무일수 차이도 영향을 줍니다.
          </p>
        </div>
        <div className="faq-item">
          <h3>Q. 2026년 최저임금 실수령액은?</h3>
          <p>
            A. 2026년 최저임금은 시간당 10,320원입니다. 주 40시간(월 209시간)
            근무 시 월 약 215만원이며, 4대 보험 및 세금 공제 후 실수령액은{" "}
            <strong>약 189만원 ~ 195만원 내외</strong>입니다.
          </p>
        </div>
        <div className="faq-item">
          <h3>Q. 계산 결과가 실제 급여명세서와 다른데요?</h3>
          <p>
            A. 회사마다 비과세 항목(식대, 차량유지비 등), 복리후생비, 기타
            수당이 다를 수 있습니다. 계산기에서{" "}
            <strong>비과세액과 부양가족 수를 정확히 입력</strong>하면 실제와
            가까운 금액을 확인할 수 있습니다.
          </p>
        </div>
        <div className="faq-item">
          <h3>Q. 프리랜서도 건강보험, 국민연금을 내야 하나요?</h3>
          <p>
            A. 네. 프리랜서는 지역가입자로 건강보험과 국민연금을 별도 납부해야
            합니다. 월 소득에 따라 다르지만 보통 <strong>월 10~30만원</strong>{" "}
            정도 추가 부담이 발생합니다.
          </p>
        </div>
      </section>

      {/* 블로그 섹션 */}
      <section className="blog-section" style={{ marginTop: "50px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          💡 연봉 정보
        </h2>

        <article
          className="blog-article"
          style={{
            background: "#f8f9fa",
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#2c3e50", marginBottom: "15px" }}>
            📊 2026년 달라진 4대보험 요율 완벽 정리
          </h3>

          <p style={{ lineHeight: "1.8", color: "#555", marginBottom: "15px" }}>
            2026년부터 국민연금과 건강보험 요율이 인상되었습니다. 실수령액에
            어떤 영향을 미치는지 자세히 알아보세요.
          </p>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ color: "#3498db", marginBottom: "15px" }}>
              주요 변경사항
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#e74c3c" }}>
                🔴 국민연금 (25년만에 인상!)
              </strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>2025년: 9.0% (근로자 부담 4.5%)</li>
                <li>
                  2026년: <strong>9.5% (근로자 부담 4.75%)</strong>
                </li>
                <li>월급 300만원 기준: 약 7,500원 증가</li>
              </ul>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#e67e22" }}>🟠 건강보험</strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>2025년: 7.09% (근로자 3.545%)</li>
                <li>
                  2026년: <strong>7.19% (근로자 3.595%)</strong>
                </li>
                <li>월급 300만원 기준: 약 1,500원 증가</li>
              </ul>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#f39c12" }}>🟡 장기요양보험</strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>2025년: 건강보험료의 12.95%</li>
                <li>
                  2026년: <strong>건강보험료의 13.14%</strong>
                </li>
                <li>월급 300만원 기준: 약 200원 증가</li>
              </ul>
            </div>

            <div>
              <strong style={{ color: "#27ae60" }}>🟢 고용보험</strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>변동 없음: 0.9%</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              background: "#fff3cd",
              padding: "15px",
              borderRadius: "8px",
              borderLeft: "4px solid #ffc107",
            }}
          >
            <strong>📌 실수령액 영향</strong>
            <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
              연봉 4,000만원 기준, 2025년 대비 월 약 <strong>9,200원</strong>{" "}
              감소
              <br />
              연봉 5,000만원 기준, 2025년 대비 월 약 <strong>
                11,500원
              </strong>{" "}
              감소
              <br />위 계산기를 이용하면 내 연봉 기준 정확한 금액을 확인할 수
              있습니다!
            </p>
          </div>
        </article>

        {/* 블로그 글 2: 연말정산 가이드 */}
        <article
          className="blog-article"
          style={{
            background: "#f8f9fa",
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#2c3e50", marginBottom: "15px" }}>
            📋 2026년 연말정산 완벽 가이드 (2025년 귀속)
          </h3>

          <p style={{ lineHeight: "1.8", color: "#555", marginBottom: "15px" }}>
            2026년 1~2월에 진행되는 연말정산은 2025년 한 해 동안의 소득을
            정산하는 절차입니다. 13월의 보너스를 받기 위한 핵심 정보를
            알아보세요.
          </p>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ color: "#3498db", marginBottom: "15px" }}>
              📅 2026년 연말정산 일정
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#2c3e50" }}>
                2025년 11월 중순: 미리보기 서비스
              </strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>1~9월 지출 기준으로 예상 환급액 확인</li>
                <li>홈택스에서 미리 확인 가능</li>
                <li>부족한 공제 항목 12월까지 추가 준비</li>
              </ul>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#2c3e50" }}>
                2026년 1월 15일: 간소화 자료 오픈
              </strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>국세청 홈택스에서 공제 자료 일괄 조회</li>
                <li>의료비, 교육비, 카드 사용액 등 자동 집계</li>
                <li>누락된 항목은 별도 증빙서류 준비</li>
              </ul>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#2c3e50" }}>
                2026년 2월: 회사 제출 및 환급
              </strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>회사 일정에 맞춰 자료 제출</li>
                <li>2월 급여와 함께 환급 또는 추가 납부</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ color: "#3498db", marginBottom: "15px" }}>
              ✨ 2026년 달라진 주요 공제 항목
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#e74c3c" }}>
                🔴 자녀 세액공제 확대
              </strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>기존: 1인당 15만원 → 변경: 25만원</li>
                <li>2자녀: 50만원, 3자녀: 105만원</li>
                <li>
                  <strong>자녀가 많을수록 환급액 대폭 증가!</strong>
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#f39c12" }}>
                🟠 헬스장·수영장 공제 신설
              </strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>
                  <strong>2026년 처음 도입!</strong>
                </li>
                <li>체육시설 이용료 30% 소득공제</li>
                <li>헬스장, 수영장 등록비 및 이용료 해당</li>
                <li>연간 300만원 한도 (강습비 별도 구분 시 절반만 인정)</li>
              </ul>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#27ae60" }}>
                🟢 청약저축 공제 확대
              </strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>기존: 세대주만 가능</li>
                <li>변경: 배우자도 공제 가능</li>
                <li>무주택 세대 해당, 연 240만원 한도</li>
              </ul>
            </div>

            <div>
              <strong style={{ color: "#3498db" }}>
                🔵 고향사랑기부금 확대
              </strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>10만원까지 100% 세액공제</li>
                <li>10만원 초과분은 16.5% 공제</li>
                <li>특별재난지역은 33% 공제</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ color: "#3498db", marginBottom: "15px" }}>
              💰 환급액 늘리는 연말 전략
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <strong>1. 신용카드 vs 체크카드 전략적 사용</strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>총급여의 25%까지는 신용카드 사용</li>
                <li>25% 이후부터는 체크카드/현금영수증 사용</li>
                <li>체크카드가 공제율 더 높음 (30% vs 15%)</li>
              </ul>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong>2. 연금저축·IRP 12월까지 추가 납입</strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>연 900만원까지 세액공제 (최대 148.5만원)</li>
                <li>연말에 몰아서 납입해도 공제 인정</li>
                <li>장기 절세 효과 + 노후 준비 동시 해결</li>
              </ul>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong>3. 의료비는 가족 몰아주기</strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>소득이 가장 높은 사람 카드로 결제</li>
                <li>총급여 3% 초과분부터 공제</li>
                <li>병원비, 약국, 안경, 보청기 모두 해당</li>
              </ul>
            </div>

            <div>
              <strong>4. 12월 31일까지 지출한 내역만 인정</strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>교육비, 기부금 등 미리 내면 올해 공제</li>
                <li>헬스장 등록도 연내 결제 시 공제 가능</li>
                <li>
                  <strong>딱 1주일 남았다면 지금 바로 실행!</strong>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              background: "#fff3cd",
              padding: "15px",
              borderRadius: "8px",
              borderLeft: "4px solid #ffc107",
            }}
          >
            <strong>📌 핵심 요약</strong>
            <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
              2026년 연말정산은 <strong>자녀·헬스장·청약 공제 확대</strong>가
              핵심입니다.
              <br />
              11월 미리보기로 현황 파악 → 12월 부족 항목 추가 → 1월 자료 제출
              <br />위 계산기로 내 연봉 기준 실수령액을 먼저 확인하고,
              연말정산으로 더 많이 돌려받으세요!
            </p>
          </div>
        </article>

        {/* 블로그 글 3: 실수령액 늘리는 방법 */}
        <article
          className="blog-article"
          style={{
            background: "#f8f9fa",
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#2c3e50", marginBottom: "15px" }}>
            💸 실수령액 늘리는 5가지 확실한 방법
          </h3>

          <p style={{ lineHeight: "1.8", color: "#555", marginBottom: "15px" }}>
            같은 연봉이라도 실수령액은 사람마다 다릅니다. 4대 보험과 세금 공제를
            전략적으로 활용하면 월 수십만원까지 차이가 납니다. 지금 바로 실천할
            수 있는 5가지 방법을 알아보세요!
          </p>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ color: "#e74c3c", marginBottom: "15px" }}>
              1️⃣ 비과세 항목 최대한 활용하기
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#2c3e50" }}>💡 비과세란?</strong>
              <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
                세금과 4대 보험이 부과되지 않는 급여 항목입니다. 비과세가
                많을수록 실수령액이 늘어납니다!
              </p>
            </div>

            <div
              style={{
                background: "#f0f9ff",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
            >
              <strong style={{ color: "#0c4a6e" }}>주요 비과세 항목</strong>
              <ul
                style={{
                  marginTop: "8px",
                  paddingLeft: "20px",
                  lineHeight: "1.8",
                }}
              >
                <li>
                  <strong>식대: 월 20만원</strong> (가장 보편적)
                </li>
                <li>
                  <strong>차량유지비: 월 20만원</strong> (업무용 차량)
                </li>
                <li>
                  <strong>자녀보육수당: 월 10만원</strong> (6세 이하 자녀 1인당)
                </li>
                <li>
                  <strong>연구활동비: 월 20만원</strong> (연구직)
                </li>
              </ul>
            </div>

            <div
              style={{
                background: "#fff8e1",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
            >
              <strong>🎯 실전 예시</strong>
              <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
                연봉 4,000만원 직장인이{" "}
                <strong>식대 20만원 + 차량 20만원</strong>을 비과세로 받으면?
                <br />→ 월 40만원 × 12개월 = 연 480만원 비과세
                <br />→ <strong>실수령액 연간 약 40~50만원 증가!</strong>
              </p>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ color: "#f39c12", marginBottom: "15px" }}>
              2️⃣ 부양가족 등록으로 세금 줄이기
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#2c3e50" }}>
                부양가족이 많을수록 소득세 감소
              </strong>
              <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
                배우자, 자녀, 부모님 등 부양가족을 등록하면 간이세액이 낮아져
                매달 원천징수되는 세금이 줄어듭니다.
              </p>
            </div>

            <div
              style={{
                background: "#f0f9ff",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
            >
              <strong style={{ color: "#0c4a6e" }}>
                부양가족 기준 (2026년)
              </strong>
              <ul
                style={{
                  marginTop: "8px",
                  paddingLeft: "20px",
                  lineHeight: "1.8",
                }}
              >
                <li>배우자: 연소득 100만원 이하</li>
                <li>직계존속 (부모님): 만 60세 이상, 연소득 100만원 이하</li>
                <li>자녀: 만 20세 이하, 연소득 100만원 이하</li>
                <li>형제자매: 만 20세 이하 또는 60세 이상</li>
              </ul>
            </div>

            <div
              style={{
                background: "#fff8e1",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
            >
              <strong>🎯 실수령액 차이 (연봉 4천만원 기준)</strong>
              <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
                부양가족 1명 (본인만): 월 실수령액 약 2,892,779원
                <br />
                부양가족 3명 (배우자+자녀): 월 실수령액 약 2,970,000원
                <br />→ <strong>월 약 8만원, 연간 약 96만원 차이!</strong>
              </p>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ color: "#27ae60", marginBottom: "15px" }}>
              3️⃣ 연금저축·IRP로 세액공제 받기
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#2c3e50" }}>
                노후 준비 + 세금 절약 동시에
              </strong>
              <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
                연금저축과 IRP(개인형퇴직연금)에 납입하면 최대 16.5% 세액공제를
                받을 수 있습니다. 장기 투자로 노후도 대비하고 당장 세금도 줄이는
                일석이조!
              </p>
            </div>

            <div
              style={{
                background: "#f0f9ff",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
            >
              <strong style={{ color: "#0c4a6e" }}>
                세액공제 한도 (2026년)
              </strong>
              <ul
                style={{
                  marginTop: "8px",
                  paddingLeft: "20px",
                  lineHeight: "1.8",
                }}
              >
                <li>
                  총급여 5,500만원 이하:{" "}
                  <strong>연 900만원까지 16.5% 공제</strong>
                </li>
                <li>총급여 5,500만원 초과: 연 900만원까지 13.2% 공제</li>
                <li>연금저축 600만원 + IRP 300만원 조합 가능</li>
              </ul>
            </div>

            <div
              style={{
                background: "#fff8e1",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
            >
              <strong>🎯 실전 계산</strong>
              <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
                연 900만원 납입 시 (5,500만원 이하):
                <br />→ 세액공제: 900만원 × 16.5% ={" "}
                <strong>148.5만원 환급</strong>
                <br />→ 실질 부담금: 750만원으로 900만원 투자 효과
                <br />→ <strong>매년 150만원 가까이 절세!</strong>
              </p>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ color: "#3498db", marginBottom: "15px" }}>
              4️⃣ 중소기업 취업 청년 감면 활용
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#2c3e50" }}>
                만 15~34세 청년이라면 반드시 확인!
              </strong>
              <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
                중소기업에 취업한 청년은 소득세를 최대 90%까지 감면받을 수
                있습니다. 5년간 최대 연 200만원까지 세금을 줄일 수 있어요.
              </p>
            </div>

            <div
              style={{
                background: "#f0f9ff",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
            >
              <strong style={{ color: "#0c4a6e" }}>감면 대상</strong>
              <ul
                style={{
                  marginTop: "8px",
                  paddingLeft: "20px",
                  lineHeight: "1.8",
                }}
              >
                <li>만 15~34세 청년 (군 복무 기간 최대 6년 추가 인정)</li>
                <li>중소기업 취업자</li>
                <li>취업일로부터 5년간 적용 (1~3년차 90%, 4~5년차 50% 감면)</li>
                <li>연간 최대 200만원 한도</li>
              </ul>
            </div>

            <div
              style={{
                background: "#fff8e1",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
            >
              <strong>🎯 실수령액 증가</strong>
              <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
                연봉 3,500만원 청년이 감면 받으면:
                <br />→ 연간 약 150~200만원 세금 감면
                <br />→ <strong>월 실수령액 약 12~17만원 증가!</strong>
              </p>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ color: "#9b59b6", marginBottom: "15px" }}>
              5️⃣ 연말정산 꼼꼼히 챙기기
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#2c3e50" }}>
                13월의 월급은 연말정산으로
              </strong>
              <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
                매달 원천징수된 세금은 어림짐작 금액입니다. 연말정산 때 정확히
                계산해서 더 낸 세금을 돌려받거나, 덜 낸 세금을 추가 납부하게
                됩니다.
              </p>
            </div>

            <div
              style={{
                background: "#f0f9ff",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
            >
              <strong style={{ color: "#0c4a6e" }}>
                놓치지 말아야 할 공제 항목
              </strong>
              <ul
                style={{
                  marginTop: "8px",
                  paddingLeft: "20px",
                  lineHeight: "1.8",
                }}
              >
                <li>신용카드·체크카드 사용액 (총급여 25% 초과분)</li>
                <li>의료비 (총급여 3% 초과분, 한도 없음)</li>
                <li>교육비 (본인, 자녀 학원비 등)</li>
                <li>월세 세액공제 (무주택 세대주, 연 750만원 한도)</li>
                <li>
                  <strong>헬스장·수영장 이용료 (2026년 신설!)</strong>
                </li>
                <li>기부금 (15~30% 공제)</li>
              </ul>
            </div>

            <div
              style={{
                background: "#fff8e1",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
            >
              <strong>🎯 연말정산 환급 사례</strong>
              <p style={{ marginTop: "8px", lineHeight: "1.7" }}>
                연봉 5,000만원, 맞벌이 부부, 자녀 2명:
                <br />→ 의료비 200만원 + 교육비 300만원 + 카드 사용 충분
                <br />→ <strong>환급액: 약 150~200만원 이상 가능!</strong>
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#e8f5e9",
              padding: "20px",
              borderRadius: "8px",
              borderLeft: "4px solid #27ae60",
            }}
          >
            <strong style={{ fontSize: "1.1rem", color: "#1e8449" }}>
              💰 종합 정리: 이것만 기억하세요!
            </strong>
            <ul
              style={{
                marginTop: "12px",
                lineHeight: "1.9",
                paddingLeft: "20px",
              }}
            >
              <li>
                <strong>비과세 항목</strong> 최대한 활용 (식대 20만원은 기본)
              </li>
              <li>
                <strong>부양가족 등록</strong>으로 매달 세금 줄이기
              </li>
              <li>
                <strong>연금저축·IRP</strong>로 노후 준비 + 세금 절약
              </li>
              <li>
                <strong>청년 감면</strong> 대상이면 반드시 신청
              </li>
              <li>
                <strong>연말정산</strong> 공제 항목 하나하나 꼼꼼히 챙기기
              </li>
            </ul>
            <p
              style={{
                marginTop: "15px",
                lineHeight: "1.7",
                fontSize: "0.95rem",
                color: "#27ae60",
              }}
            >
              위 계산기로 내 연봉의 실수령액을 먼저 확인하고, 5가지 방법으로
              실수령액을 늘려보세요! 같은 연봉이라도 전략에 따라 월 수십만원
              차이가 날 수 있습니다.
            </p>
          </div>
        </article>
      </section>

      <section className="content-proof-section">
        <h2>📚 계산 근거 및 데이터 출처</h2>
        <p className="description" style={{ marginBottom: "14px" }}>
          본 계산기는 2026년 기준 4대보험 요율, 간이세액표 기준, 프리랜서 원천징수 규정을
          반영한 참고용 시뮬레이션 도구입니다. 실제 급여는 회사별 공제 항목 및 연말정산 결과에
          따라 달라질 수 있습니다.
        </p>
        <ul>
          <li>국민연금, 건강보험, 장기요양보험, 고용보험 요율 반영</li>
          <li>직장인: 간이세액표 기반 월 예상 세액 계산</li>
          <li>프리랜서: 3.3% 원천징수(소득세 3% + 지방소득세 0.3%) 계산</li>
          <li>비과세/부양가족/청년감면 항목을 분리 반영</li>
        </ul>
        <div className="source-links">
          <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer">국민연금공단</a>
          <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer">국민건강보험</a>
          <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer">고용노동부</a>
          <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer">국세청</a>
        </div>
      </section>

      <section className="update-log-section">
        <h2>🛠️ 콘텐츠 업데이트 내역</h2>
        <div className="update-log-item">
          <strong>2026-02-10</strong>
          <p>광고 밀도를 축소하고 계산/정보 콘텐츠 영역을 확대했습니다.</p>
        </div>
        <div className="update-log-item">
          <strong>2026-02-08</strong>
          <p>FAQ 구조화 데이터 및 페이지별 메타데이터를 개선했습니다.</p>
        </div>
        <div className="update-log-item">
          <strong>2026-02-01</strong>
          <p>2026년 보험요율/세율 기준으로 계산 로직과 안내 문구를 갱신했습니다.</p>
        </div>
        <p className="help-text">최종 검토일: 2026-02-10 · 다음 정기 점검: 매월 1주차</p>
      </section>

      {/* ========== 광고: 하단 배치 (첫 화면 가림 최소화) ========== */}
      <AdSense slot="4153151665" format="auto" style={{ marginTop: "24px" }} />
    </div>
  );
}

export default Home;
