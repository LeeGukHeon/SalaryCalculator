// src/utils/calc/freelancer.js

/**
 * 2026년 프리랜서 실수령액 계산
 * 3.3% 원천징수 (소득세 3% + 지방소득세 0.3%)
 */
export function calcFreelancerIncome({ monthlyIncome }) {
  // ========== 1단계: 원천징수 계산 ==========
  const withholdingRate = 0.033; // 3.3%
  const withholdingTax = monthlyIncome * withholdingRate;

  // 소득세와 지방소득세 분리
  const incomeTax = monthlyIncome * 0.03; // 3%
  const localIncomeTax = monthlyIncome * 0.003; // 0.3%

  // ========== 2단계: 실수령액 ==========
  const netIncome = monthlyIncome - withholdingTax;

  // ========== 3단계: 연간 계산 ==========
  const annualIncome = monthlyIncome * 12;
  const annualWithholdingTax = withholdingTax * 12;
  const annualNetIncome = netIncome * 12;

  return {
    // 월간
    monthlyIncome: Math.round(monthlyIncome),
    withholdingTax: Math.round(withholdingTax),
    incomeTax: Math.round(incomeTax),
    localIncomeTax: Math.round(localIncomeTax),
    netIncome: Math.round(netIncome),

    // 연간
    annualIncome: Math.round(annualIncome),
    annualWithholdingTax: Math.round(annualWithholdingTax),
    annualNetIncome: Math.round(annualNetIncome),

    // 비율
    withholdingRate: withholdingRate,
    netRate: 1 - withholdingRate, // 96.7%
  };
}
