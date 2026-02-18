import { calcEmployeeSalary } from "../utils/calc/employee";

const MIN_ANNUAL_SALARY = 25_000_000;
const MAX_ANNUAL_SALARY = 75_000_000;
const STEP = 1_000_000;

const formatSalaryLabel = (annualSalary) => `${(annualSalary / 10_000).toLocaleString()}만원`;

export function buildSalaryReferenceTable() {
  const rows = [];

  for (let annualSalary = MIN_ANNUAL_SALARY; annualSalary <= MAX_ANNUAL_SALARY; annualSalary += STEP) {
    const result = calcEmployeeSalary({
      annualSalary,
      taxFreeAmount: 0,
      dependents: 1,
      youthTaxReduction: false,
    });

    rows.push({
      salaryLabel: formatSalaryLabel(annualSalary),
      netSalary: result.netSalary,
      grossSalary: result.grossSalary,
      deduction: result.totalInsurance + result.totalTax,
    });
  }

  return rows;
}
