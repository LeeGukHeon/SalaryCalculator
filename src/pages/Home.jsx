// src/pages/Home.jsx
import { useState } from "react";
import { calcEmployeeSalary } from "../utils/calc/employee";
import { calcFreelancerIncome } from "../utils/calc/freelancer";
import { toNumber, handleNumberInput } from "../utils/helpers";
import AdSense from "../components/AdSense";

function Home() {
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

        {/* ========== 광고 1: 상단 배너 ========== */}
        <AdSense
          slot="3434966366" // 👈 본인 광고 슬롯 ID
          format="auto"
          style={{ marginBottom: "24px" }}
        />

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
            <AdSense
              slot="9808803020" // 👈 본인 광고 슬롯 ID
              format="auto"
              style={{ margin: "20px auto", maxWidth: "336px" }}
            />

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
            <AdSense
              slot="9808803020" // 👈 본인 광고 슬롯 ID
              format="auto"
              style={{ margin: "20px auto", maxWidth: "336px" }}
            />

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
            <AdSense
              slot="6779315005" // 👈 본인 광고 슬롯 ID
              format="auto"
              style={{ marginBottom: "24px" }}
            />

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
                  <span>└ 국민연금 (4.5%)</span>
                  <span>
                    {(result.data.nationalPension || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row-breakdown">
                  <span>└ 건강보험 (3.545%)</span>
                  <span>
                    {(result.data.healthInsurance || 0).toLocaleString()} 원
                  </span>
                </div>
                <div className="detail-row-breakdown">
                  <span>└ 장기요양보험 (0.9182%)</span>
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
              <AdSense
                slot="5466233337" // 👈 본인 광고 슬롯 ID
                format="auto"
                style={{ margin: "24px auto", maxWidth: "336px" }}
              />

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
              <AdSense
                slot="9021900195" // 👈 본인 광고 슬롯 ID
                format="auto"
                style={{ marginTop: "24px" }}
              />
            </div>
          </div>
        )}

        {/* ========== 결과 표시 (프리랜서) ========== */}
        {result && result.type === "freelancer" && (
          <div className="result-section">
            {/* ========== 광고 3: 결과 상단 ========== */}
            <AdSense
              slot="6779315005" // 👈 본인 광고 슬롯 ID
              format="auto"
              style={{ marginBottom: "24px" }}
            />

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
              <AdSense
                slot="5466233337" // 👈 본인 광고 슬롯 ID
                format="auto"
                style={{ margin: "24px auto", maxWidth: "336px" }}
              />

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
              <AdSense
                slot="9021900195" // 👈 본인 광고 슬롯 ID
                format="auto"
                style={{ marginTop: "24px" }}
              />
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

      {/* ========== 광고 6: 푸터 광고 ========== */}
      <AdSense
        slot="4153151665" // 👈 본인 광고 슬롯 ID
        format="auto"
        style={{ marginTop: "30px" }}
      />
    </div>
  );
}

export default Home;
