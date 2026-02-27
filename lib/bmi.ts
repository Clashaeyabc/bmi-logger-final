import type { BmiCategory } from "./types";

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function validateHeightWeight(heightCm: number, weightKg: number): string | null {
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) return "กรุณากรอกตัวเลขให้ถูกต้อง";
  if (heightCm <= 0 || weightKg <= 0) return "ส่วนสูงและน้ำหนักต้องมากกว่า 0";
  if (heightCm < 50 || heightCm > 250) return "ส่วนสูงควรอยู่ในช่วง 50–250 ซม.";
  if (weightKg < 10 || weightKg > 300) return "น้ำหนักควรอยู่ในช่วง 10–300 กก.";
  return null;
}

export function calcBmi(heightCm: number, weightKg: number): number {
  const h = heightCm / 100;
  return weightKg / (h * h);
}

// เกณฑ์นี้เป็นเกณฑ์ทั่วไปแบบสากล (คุณปรับใน SRS ได้ถ้าอาจารย์ต้องการ)
export function bmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function categoryLabel(cat: BmiCategory): string {
  switch (cat) {
    case "Underweight": return "ผอม";
    case "Normal": return "ปกติ";
    case "Overweight": return "ท้วม";
    case "Obese": return "อ้วน";
  }
}