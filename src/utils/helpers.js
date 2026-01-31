// src/utils/helpers.js

export function toNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    // 콤마 제거 후 숫자로 변환
    const num = parseFloat(value.replace(/,/g, ""));
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

// 천단위 콤마 추가 함수
export function formatNumberWithComma(value) {
  // 숫자가 아닌 문자 제거
  const numbers = value.toString().replace(/[^\d]/g, "");

  // 빈 문자열이면 그대로 반환
  if (numbers === "") return "";

  // 천단위 콤마 추가
  return Number(numbers).toLocaleString("ko-KR");
}

// 입력값 포맷팅 핸들러
export function handleNumberInput(value) {
  // 숫자와 콤마만 허용
  const cleaned = value.replace(/[^\d]/g, "");
  return formatNumberWithComma(cleaned);
}
