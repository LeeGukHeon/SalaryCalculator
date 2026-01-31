// src/utils/calc/employee.js
import { TAX_2026 } from "../tax/tax2026";
import { getSimpleTax } from "../tax/simpleTaxTable2026";

/**
 * 국민연금 표준월액 계산
 * 실제 급여의 86.4%를 만원 단위로 반올림
 */
function getPensionStandard(income) {
  return Math.round((income * 0.864) / 10000) * 10000;
}

/**
 * 건강보험 표준월액 계산
 * 실제 급여의 81.8%를 만원 단위로 반올림
 */
function getHealthStandard(income) {
  return Math.round((income * 0.818) / 10000) * 10000;
}

/**
 * 2026년 직장인 실수령액 계산
 */
export function calcEmployeeSalary({
  annualSalary,
  taxFreeAmount = 0,
  dependents = 1,
  youthTaxReduction = false,
}) {
  // ========== 1단계: 월급여 계산 ==========
  const monthlySalary = annualSalary / 12;
  const taxableSalary = Math.max(monthlySalary - taxFreeAmount, 0);

  // ========== 2단계: 4대 보험료 ==========

  // 국민연금 (표준월액 86.4%)
  let pensionBase = getPensionStandard(taxableSalary);
  if (pensionBase > TAX_2026.NATIONAL_PENSION_MAX) {
    pensionBase = TAX_2026.NATIONAL_PENSION_MAX;
  } else if (pensionBase < TAX_2026.NATIONAL_PENSION_MIN) {
    pensionBase = TAX_2026.NATIONAL_PENSION_MIN;
  }
  const nationalPension = pensionBase * TAX_2026.NATIONAL_PENSION_RATE;

  // 건강보험 (표준월액 81.8%)
  let healthBase = getHealthStandard(taxableSalary);
  if (healthBase > TAX_2026.HEALTH_INSURANCE_MAX) {
    healthBase = TAX_2026.HEALTH_INSURANCE_MAX;
  }
  const healthInsurance = healthBase * TAX_2026.HEALTH_INSURANCE_RATE;

  // 장기요양보험
  const longTermCare = healthInsurance * TAX_2026.LONG_TERM_CARE_RATE;

  // 고용보험
  const employmentInsurance =
    taxableSalary * TAX_2026.EMPLOYMENT_INSURANCE_RATE;

  const totalInsurance =
    nationalPension + healthInsurance + longTermCare + employmentInsurance;

  // ========== 3단계: 간이세액표 조회 ==========
  let incomeTax = getSimpleTax(taxableSalary, dependents);

  // ========== 4단계: 청년 감면 ==========
  if (youthTaxReduction) {
    const reductionAmount =
      incomeTax * TAX_2026.YOUTH_INCOME_TAX_REDUCTION_RATE;
    const monthlyLimit = TAX_2026.YOUTH_INCOME_TAX_REDUCTION_LIMIT / 12;
    const actualReduction = Math.min(reductionAmount, monthlyLimit);
    incomeTax = Math.max(incomeTax - actualReduction, 0);
  }

  // ========== 5단계: 지방소득세 ==========
  const localIncomeTax = incomeTax * TAX_2026.LOCAL_INCOME_TAX_RATE;

  // ========== 6단계: 실수령액 ==========
  const netSalary = monthlySalary - totalInsurance - incomeTax - localIncomeTax;

  return {
    grossSalary: Math.round(monthlySalary),
    taxableIncome: Math.round(taxableSalary),
    taxFreeAmount: Math.round(taxFreeAmount),
    dependents,

    // 디버깅용
    pensionStandard: pensionBase,
    healthStandard: healthBase,

    // 4대 보험
    nationalPension: Math.round(nationalPension),
    healthInsurance: Math.round(healthInsurance),
    longTermCare: Math.round(longTermCare),
    employmentInsurance: Math.round(employmentInsurance),
    totalInsurance: Math.round(totalInsurance),

    // 세금
    incomeTax: Math.round(incomeTax),
    localIncomeTax: Math.round(localIncomeTax),
    totalTax: Math.round(incomeTax + localIncomeTax),

    // 최종
    netSalary: Math.round(netSalary),
    youthTaxReductionApplied: youthTaxReduction,
  };
}
