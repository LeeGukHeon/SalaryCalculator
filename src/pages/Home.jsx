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
              <tr>
                <td>2,500만원</td>
                <td className="highlight">1,856,020원</td>
                <td>2,083,333원</td>
                <td>227,314원</td>
              </tr>
              <tr>
                <td>2,600만원</td>
                <td className="highlight">1,928,405원</td>
                <td>2,166,667원</td>
                <td>238,261원</td>
              </tr>
              <tr>
                <td>2,700만원</td>
                <td className="highlight">2,000,428원</td>
                <td>2,250,000원</td>
                <td>249,572원</td>
              </tr>
              <tr>
                <td>2,800만원</td>
                <td className="highlight">2,072,814원</td>
                <td>2,333,333원</td>
                <td>260,519원</td>
              </tr>
              <tr>
                <td>2,900만원</td>
                <td className="highlight">2,145,200원</td>
                <td>2,416,667원</td>
                <td>271,467원</td>
              </tr>
              <tr>
                <td>3,000만원</td>
                <td className="highlight">2,217,222원</td>
                <td>2,500,000원</td>
                <td>282,778원</td>
              </tr>
              <tr>
                <td>3,100만원</td>
                <td className="highlight">2,289,421원</td>
                <td>2,583,333원</td>
                <td>293,912원</td>
              </tr>
              <tr>
                <td>3,200만원</td>
                <td className="highlight">2,357,506원</td>
                <td>2,666,667원</td>
                <td>309,161원</td>
              </tr>
              <tr>
                <td>3,300만원</td>
                <td className="highlight">2,424,238원</td>
                <td>2,750,000원</td>
                <td>325,762원</td>
              </tr>
              <tr>
                <td>3,400만원</td>
                <td className="highlight">2,491,526원</td>
                <td>2,833,333원</td>
                <td>341,807원</td>
              </tr>
              <tr>
                <td>3,500만원</td>
                <td className="highlight">2,559,604원</td>
                <td>2,916,667원</td>
                <td>357,063원</td>
              </tr>
              <tr>
                <td>3,600만원</td>
                <td className="highlight">2,625,874원</td>
                <td>3,000,000원</td>
                <td>374,126원</td>
              </tr>
              <tr>
                <td>3,700만원</td>
                <td className="highlight">2,693,663원</td>
                <td>3,083,333원</td>
                <td>389,771원</td>
              </tr>
              <tr>
                <td>3,800만원</td>
                <td className="highlight">2,761,240원</td>
                <td>3,166,667원</td>
                <td>405,426원</td>
              </tr>
              <tr>
                <td>3,900만원</td>
                <td className="highlight">2,828,324원</td>
                <td>3,250,000원</td>
                <td>421,676원</td>
              </tr>
              <tr>
                <td>4,000만원</td>
                <td className="highlight">2,892,779원</td>
                <td>3,333,333원</td>
                <td>440,555원</td>
              </tr>
              <tr>
                <td>4,100만원</td>
                <td className="highlight">2,957,234원</td>
                <td>3,416,667원</td>
                <td>459,433원</td>
              </tr>
              <tr>
                <td>4,200만원</td>
                <td className="highlight">3,018,993원</td>
                <td>3,500,000원</td>
                <td>481,007원</td>
              </tr>
              <tr>
                <td>4,300만원</td>
                <td className="highlight">3,083,448원</td>
                <td>3,583,333원</td>
                <td>499,885원</td>
              </tr>
              <tr>
                <td>4,400만원</td>
                <td className="highlight">3,147,903원</td>
                <td>3,666,667원</td>
                <td>518,764원</td>
              </tr>
              <tr>
                <td>4,500만원</td>
                <td className="highlight">3,212,358원</td>
                <td>3,750,000원</td>
                <td>537,642원</td>
              </tr>
              <tr>
                <td>4,600만원</td>
                <td className="highlight">3,270,663원</td>
                <td>3,833,333원</td>
                <td>562,670원</td>
              </tr>
              <tr>
                <td>4,700만원</td>
                <td className="highlight">3,334,128원</td>
                <td>3,916,667원</td>
                <td>582,539원</td>
              </tr>
              <tr>
                <td>4,800만원</td>
                <td className="highlight">3,394,656원</td>
                <td>4,000,000원</td>
                <td>605,344원</td>
              </tr>
              <tr>
                <td>4,900만원</td>
                <td className="highlight">3,458,121원</td>
                <td>4,083,333원</td>
                <td>625,213원</td>
              </tr>
              <tr>
                <td>5,000만원</td>
                <td className="highlight">3,521,585원</td>
                <td>4,166,667원</td>
                <td>645,081원</td>
              </tr>
              <tr>
                <td>5,100만원</td>
                <td className="highlight">3,585,050원</td>
                <td>4,250,000원</td>
                <td>664,950원</td>
              </tr>
              <tr>
                <td>5,200만원</td>
                <td className="highlight">3,648,515원</td>
                <td>4,333,333원</td>
                <td>684,819원</td>
              </tr>
              <tr>
                <td>5,300만원</td>
                <td className="highlight">3,711,980원</td>
                <td>4,416,667원</td>
                <td>704,687원</td>
              </tr>
              <tr>
                <td>5,400만원</td>
                <td className="highlight">3,772,364원</td>
                <td>4,500,000원</td>
                <td>727,636원</td>
              </tr>
              <tr>
                <td>5,500만원</td>
                <td className="highlight">3,832,485원</td>
                <td>4,583,333원</td>
                <td>750,848원</td>
              </tr>
              <tr>
                <td>5,600만원</td>
                <td className="highlight">3,895,356원</td>
                <td>4,666,667원</td>
                <td>771,311원</td>
              </tr>
              <tr>
                <td>5,700만원</td>
                <td className="highlight">3,958,227원</td>
                <td>4,750,000원</td>
                <td>791,773원</td>
              </tr>
              <tr>
                <td>5,800만원</td>
                <td className="highlight">4,021,097원</td>
                <td>4,833,333원</td>
                <td>812,236원</td>
              </tr>
              <tr>
                <td>5,900만원</td>
                <td className="highlight">4,083,968원</td>
                <td>4,916,667원</td>
                <td>832,699원</td>
              </tr>
              <tr>
                <td>6,000만원</td>
                <td className="highlight">4,143,748원</td>
                <td>5,000,000원</td>
                <td>856,252원</td>
              </tr>
              <tr>
                <td>6,100만원</td>
                <td className="highlight">4,206,618원</td>
                <td>5,083,333원</td>
                <td>876,715원</td>
              </tr>
              <tr>
                <td>6,200만원</td>
                <td className="highlight">4,269,489원</td>
                <td>5,166,667원</td>
                <td>897,177원</td>
              </tr>
              <tr>
                <td>6,300만원</td>
                <td className="highlight">4,332,360원</td>
                <td>5,250,000원</td>
                <td>917,640원</td>
              </tr>
              <tr>
                <td>6,400만원</td>
                <td className="highlight">4,395,231원</td>
                <td>5,333,333원</td>
                <td>938,103원</td>
              </tr>
              <tr>
                <td>6,500만원</td>
                <td className="highlight">4,458,101원</td>
                <td>5,416,667원</td>
                <td>958,565원</td>
              </tr>
              <tr>
                <td>6,600만원</td>
                <td className="highlight">4,517,892원</td>
                <td>5,500,000원</td>
                <td>982,108원</td>
              </tr>
              <tr>
                <td>6,700만원</td>
                <td className="highlight">4,580,763원</td>
                <td>5,583,333원</td>
                <td>1,002,570원</td>
              </tr>
              <tr>
                <td>6,800만원</td>
                <td className="highlight">4,643,634원</td>
                <td>5,666,667원</td>
                <td>1,023,033원</td>
              </tr>
              <tr>
                <td>6,900만원</td>
                <td className="highlight">4,706,504원</td>
                <td>5,750,000원</td>
                <td>1,043,496원</td>
              </tr>
              <tr>
                <td>7,000만원</td>
                <td className="highlight">4,769,375원</td>
                <td>5,833,333원</td>
                <td>1,063,958원</td>
              </tr>
              <tr>
                <td>7,100만원</td>
                <td className="highlight">4,808,563원</td>
                <td>5,916,667원</td>
                <td>1,108,104원</td>
              </tr>
              <tr>
                <td>7,200만원</td>
                <td className="highlight">4,858,828원</td>
                <td>6,000,000원</td>
                <td>1,141,172원</td>
              </tr>
              <tr>
                <td>7,300만원</td>
                <td className="highlight">4,914,075원</td>
                <td>6,083,333원</td>
                <td>1,169,258원</td>
              </tr>
              <tr>
                <td>7,400만원</td>
                <td className="highlight">4,969,334원</td>
                <td>6,166,667원</td>
                <td>1,197,332원</td>
              </tr>
              <tr>
                <td>7,500만원</td>
                <td className="highlight">5,024,582원</td>
                <td>6,250,000원</td>
                <td>1,225,418원</td>
              </tr>
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
      </section>

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
